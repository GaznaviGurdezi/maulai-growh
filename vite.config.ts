import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

function spaFallbackPlugin(): Plugin {
  const rewriteSpaRequest = (
    req: {method?: string; url?: string; headers?: {accept?: string}},
    _res: unknown,
    next: () => void,
  ) => {
    const method = req.method || 'GET';
    const rawUrl = req.url || '/';
    const pathname = rawUrl.split('?')[0];
    const accept = req.headers?.accept || '';

    const isNavigationMethod = method === 'GET' || method === 'HEAD';
    const isApiOrViteInternal =
      pathname.startsWith('/api/') ||
      pathname === '/api' ||
      pathname.startsWith('/@') ||
      pathname.startsWith('/__') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/node_modules/');
    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
    const acceptsHtml = !accept || accept.includes('text/html') || accept.includes('*/*');

    if (
      isNavigationMethod &&
      !isApiOrViteInternal &&
      !hasFileExtension &&
      acceptsHtml &&
      pathname !== '/' &&
      pathname !== '/index.html'
    ) {
      req.url = '/index.html';
    }

    next();
  };

  return {
    name: 'spa-fallback-routing',
    configureServer(server) {
      server.middlewares.use(rewriteSpaRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteSpaRequest);
    },
    generateBundle() {
      // Emit Netlify Function API routes first, then SPA fallback into dist/_redirects
      this.emitFile({
        type: 'asset',
        fileName: '_redirects',
        source: [
          '/api/donations/config /.netlify/functions/donations-config 200',
          '/api/razorpay/create-order /.netlify/functions/razorpay-create-order 200',
          '/api/razorpay/verify /.netlify/functions/razorpay-verify 200',
          '/* /index.html 200',
          '',
        ].join('\n'),
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const publicRazorpayKeyId = (
    env.VITE_RAZORPAY_KEY_ID ||
    env.RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    ''
  ).trim();

  return {
    appType: 'spa' as const,
    plugins: [react(), tailwindcss(), spaFallbackPlugin()],
    define: {
      __RAZORPAY_KEY_ID__: JSON.stringify(publicRazorpayKeyId),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
