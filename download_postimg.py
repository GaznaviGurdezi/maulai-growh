import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "1000002198.jpg": "https://i.postimg.cc/CnzZn1W4/1000002198-jpg.jpg",
    "1000002207.jpg": "https://i.postimg.cc/MfvcfThD/1000002207-jpg.jpg",
    "1000002208.jpg": "https://i.postimg.cc/4HmKHdrP/1000002208-jpg.jpg",
    "1000002213.jpg": "https://i.postimg.cc/K3RK3zdD/1000002213-jpg.jpg",
    "1000002225.jpg": "https://i.postimg.cc/bdJSBCdW/1000002225-jpg.jpg"
}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response, open('public/' + name, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print(f"Downloaded {name}, size: {len(data)}")
    except Exception as e:
        print(f"Failed {name}: {e}")
