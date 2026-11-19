export type FieldErrorCode =
  | 'required'
  | 'invalid_name'
  | 'invalid_email'
  | 'disposable_email'
  | 'typo_domain'
  | 'non_digits'
  | 'invalid_indian_mobile'
  | 'invalid_mobile_length'
  | 'fake_mobile_pattern'
  | 'invalid_location'
  | 'invalid_pan'
  | 'pan_required_80g';

const DISPOSABLE_OR_FAKE_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'test.in',
  'testing.com',
  'invalid.com',
  'fake.com',
  'fakemail.com',
  'mailinator.com',
  'yopmail.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  '10minutemail.com',
  'trashmail.com',
  'fakeinbox.com',
  'sharklasers.com',
  'getnada.com',
  'dispostable.com',
  'maildrop.cc'
]);

const DOMAIN_TYPO_SUGGESTIONS: Record<string, string> = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yhoo.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'icloud.con': 'icloud.com'
};

export function validateFullName(name: string): FieldErrorCode | null {
  const trimmed = String(name || '').trim();
  if (!trimmed) return 'required';
  const letters = trimmed.match(/\p{L}/gu) || [];
  if (trimmed.length < 2 || trimmed.length > 100 || letters.length < 2) {
    return 'invalid_name';
  }
  return null;
}

export function validateEmailAddress(email: string): {
  errorCode: FieldErrorCode | null;
  suggestion?: string;
} {
  const trimmed = String(email || '').trim().toLowerCase();
  if (!trimmed) return { errorCode: 'required' };
  if (trimmed.length > 254 || /\s/.test(trimmed)) {
    return { errorCode: 'invalid_email' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) return { errorCode: 'invalid_email' };
  const [local, domain] = parts;

  if (!local || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) {
    return { errorCode: 'invalid_email' };
  }

  const strictRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;
  if (!strictRegex.test(trimmed) || domain.includes('..')) {
    return { errorCode: 'invalid_email' };
  }

  if (DOMAIN_TYPO_SUGGESTIONS[domain]) {
    return {
      errorCode: 'typo_domain',
      suggestion: `${local}@${DOMAIN_TYPO_SUGGESTIONS[domain]}`
    };
  }

  if (DISPOSABLE_OR_FAKE_DOMAINS.has(domain)) {
    return { errorCode: 'disposable_email' };
  }

  return { errorCode: null };
}

function isSequentialDigits(digits: string): boolean {
  if (digits.length < 7) return false;
  let asc = true;
  let desc = true;
  for (let i = 1; i < digits.length; i++) {
    const prev = digits.charCodeAt(i - 1);
    const curr = digits.charCodeAt(i);
    if (curr !== prev + 1) asc = false;
    if (curr !== prev - 1) desc = false;
  }
  if (asc || desc) return true;

  const knownFakePatterns = [
    '0123456789',
    '1234567890',
    '9876543210',
    '1234512345',
    '9999999999',
    '8888888888',
    '7777777777',
    '6666666666',
    '9876598765'
  ];
  return knownFakePatterns.includes(digits);
}

export function validateMobileNumber(
  countryCode: string,
  rawMobile: string
): { errorCode: FieldErrorCode | null; digits: string } {
  const raw = String(rawMobile || '').trim();
  if (!raw) return { errorCode: 'required', digits: '' };

  if (!/^[\d\s-]+$/.test(raw)) {
    return { errorCode: 'non_digits', digits: raw.replace(/\D/g, '') };
  }

  const digits = raw.replace(/\D/g, '');
  if (!digits) return { errorCode: 'required', digits: '' };

  // All identical digits (e.g., 9999999999, 0000000000) or straight sequential run
  if (/^(\d)\1+$/.test(digits) || isSequentialDigits(digits)) {
    return { errorCode: 'fake_mobile_pattern', digits };
  }

  switch (countryCode) {
    case '+91':
      if (!/^[6-9]\d{9}$/.test(digits)) {
        return { errorCode: 'invalid_indian_mobile', digits };
      }
      return { errorCode: null, digits };
    case '+1':
      if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+44':
      if (!/^[127]\d{9,10}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+971':
    case '+966':
      if (!/^5\d{8}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+974':
      if (!/^[3567]\d{7}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+965':
      if (!/^[569]\d{7}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+968':
      if (!/^[79]\d{7}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+973':
      if (!/^[36]\d{7}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+92':
      if (!/^3\d{9}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+880':
      if (!/^1[3-9]\d{8}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+61':
      if (!/^4\d{8}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    case '+65':
      if (!/^[89]\d{7}$/.test(digits)) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
    default:
      if (digits.length < 7 || digits.length > 15) {
        return { errorCode: 'invalid_mobile_length', digits };
      }
      return { errorCode: null, digits };
  }
}

export function getMobileMaxLength(countryCode: string): number {
  switch (countryCode) {
    case '+91':
    case '+1':
    case '+92':
    case '+880':
      return 10;
    case '+971':
    case '+966':
    case '+61':
      return 9;
    case '+974':
    case '+965':
    case '+968':
    case '+973':
    case '+65':
      return 8;
    default:
      return 15;
  }
}

export function validateLocationText(val: string): FieldErrorCode | null {
  const trimmed = String(val || '').trim();
  if (!trimmed) return 'required';
  const letters = trimmed.match(/\p{L}/gu) || [];
  if (trimmed.length < 2 || letters.length < 2) {
    return 'invalid_location';
  }
  return null;
}

export function validatePanNumber(pan: string, required: boolean): FieldErrorCode | null {
  const clean = String(pan || '').trim().toUpperCase();
  if (!clean) {
    return required ? 'pan_required_80g' : null;
  }
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(clean)) {
    return 'invalid_pan';
  }
  return null;
}

export function parseCombinedMobile(combinedMobile: string): { countryCode: string; digits: string } {
  const clean = String(combinedMobile || '').trim();
  const knownCodes = [
    '+998', '+994', '+977', '+974', '+973', '+971', '+968', '+966', '+965', '+964',
    '+962', '+961', '+960', '+880', '+852', '+353', '+351', '+256', '+255', '+254',
    '+234', '+230', '+212', '+98', '+94', '+93', '+92', '+91', '+90', '+86', '+82',
    '+81', '+66', '+65', '+64', '+63', '+62', '+61', '+60', '+55', '+52', '+49',
    '+48', '+47', '+46', '+45', '+44', '+43', '+41', '+39', '+34', '+33', '+32',
    '+31', '+27', '+20', '+7', '+1'
  ];
  for (const code of knownCodes) {
    if (clean.startsWith(code)) {
      return { countryCode: code, digits: clean.slice(code.length) };
    }
  }
  const match = clean.match(/^(\+\d{1,4})\s*(.*)$/);
  if (match) {
    return { countryCode: match[1], digits: match[2] };
  }
  return { countryCode: '+91', digits: clean };
}
