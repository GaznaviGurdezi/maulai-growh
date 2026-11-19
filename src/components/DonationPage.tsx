import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, ArrowRight, ShieldCheck, CheckCircle2,
  AlertCircle, ChevronLeft, ChevronDown, CreditCard, Smartphone,
  Landmark, Wallet, Download, Share2, X, Copy, Check,
  ExternalLink, Search, MessageCircle, Clock, MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { donationTranslations } from './DonationTranslations';
import {
  FieldErrorCode,
  getMobileMaxLength,
  validateEmailAddress,
  validateFullName,
  validateLocationText,
  validateMobileNumber,
  validatePanNumber,
} from '../utils/donationValidation';
import {
  CountryLocation,
  WORLD_LOCATIONS,
  findCountryByDialCode,
  findCountryByName,
  getCitiesForCountry,
} from '../data/locationsData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

interface DonationConfig {
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  upi: {
    id: string;
    payeeName: string;
  };
  bank: {
    accountHolder: string;
    bankName: string;
    accountType: string;
    accountNumber: string;
    ifsc: string;
  };
  whatsapp: string;
}

interface DonationReceipt {
  receiptNumber: string;
  orderId: string;
  paymentId: string;
  utrNumber?: string;
  amount: number;
  currency: string;
  cause: string;
  donorType?: string;
  frequency: string;
  donorName: string;
  donorEmail?: string;
  donorMobile?: string;
  country?: string;
  city?: string;
  pan?: string;
  require80G?: boolean;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const DEFAULT_CONFIG: DonationConfig = {
  razorpayEnabled: false,
  razorpayKeyId: '',
  upi: {
    id: 'syedgggurdezi@okicici',
    payeeName: 'Shah Sufi Syed Gous Gaznavi Gurdezi'
  },
  bank: {
    accountHolder: 'SYED GHOUS GHAZNAVI GURDEZI',
    bankName: 'ICICI BANK',
    accountType: 'Savings Account',
    accountNumber: '768401500538',
    ifsc: 'ICIC0007684'
  },
  whatsapp: '919680872049'
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const escapeHtml = (value: string) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function DonationPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const dt = donationTranslations[language as keyof typeof donationTranslations] || donationTranslations['en'];
  const isUrdu = language === 'ur';
  const isHindi = language === 'hi';

  const [step, setStep] = useState(1);
  const [donorType, setDonorType] = useState('indian');
  const [frequency, setFrequency] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('Where Needed Most');

  const [details, setDetails] = useState({
    fullName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    country: 'India',
    city: '',
    pan: '',
    require80G: false,
    prayerRequest: ''
  });

  const [config, setConfig] = useState<DonationConfig>(DEFAULT_CONFIG);
  const [showNote, setShowNote] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isModalScrolled, setIsModalScrolled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePayTab, setActivePayTab] = useState<'upi' | 'bank' | 'gateway'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [step1Error, setStep1Error] = useState('');
  const [step2Error, setStep2Error] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [isValidatingDetails, setIsValidatingDetails] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');

  const [receiptData, setReceiptData] = useState<DonationReceipt | null>(null);

  // Receipt verification lookup state
  const [lookupRef, setLookupRef] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupResult, setLookupResult] = useState<DonationReceipt | null>(null);

  // Searchable dropdown states for Country Code, Country, and City
  const [codeDropdownOpen, setCodeDropdownOpen] = useState(false);
  const [codeSearch, setCodeSearch] = useState('');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearchTouched, setCountrySearchTouched] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearchTouched, setCitySearchTouched] = useState(false);

  const codeDropdownRef = useRef<HTMLDivElement>(null);
  const codeSearchInputRef = useRef<HTMLInputElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (codeDropdownRef.current && !codeDropdownRef.current.contains(target)) {
        setCodeDropdownOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(target)) {
        setCountryDropdownOpen(false);
        setCountrySearchTouched(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
        setCityDropdownOpen(false);
        setCitySearchTouched(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCodeDropdownOpen(false);
        setCountryDropdownOpen(false);
        setCityDropdownOpen(false);
        setCountrySearchTouched(false);
        setCitySearchTouched(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (codeDropdownOpen) {
      setTimeout(() => codeSearchInputRef.current?.focus(), 20);
    } else {
      setCodeSearch('');
    }
  }, [codeDropdownOpen]);

  const activeDialCountry = useMemo(
    () => findCountryByDialCode(details.countryCode, details.country),
    [details.countryCode, details.country]
  );

  const filteredDialCountries = useMemo(() => {
    const q = codeSearch.trim().toLowerCase();
    if (!q) return WORLD_LOCATIONS;
    return WORLD_LOCATIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.dialCode.replace('+', '').includes(q.replace('+', '')) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [codeSearch]);

  const filteredCountries = useMemo(() => {
    const q = countrySearchTouched ? details.country.trim().toLowerCase() : '';
    if (!q) return WORLD_LOCATIONS;
    return WORLD_LOCATIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dialCode.includes(q)
    );
  }, [details.country, countrySearchTouched]);

  const availableCities = useMemo(
    () => getCitiesForCountry(details.country),
    [details.country]
  );

  const filteredCities = useMemo(() => {
    const q = citySearchTouched ? details.city.trim().toLowerCase() : '';
    if (!q) return availableCities;
    return availableCities.filter((city) => city.toLowerCase().includes(q));
  }, [availableCities, details.city, citySearchTouched]);

  const matchedCountryObj = useMemo(
    () => findCountryByName(details.country),
    [details.country]
  );

  const handleSelectCountry = (loc: CountryLocation) => {
    const cityStillValid = loc.cities.some(
      (c) => c.toLowerCase() === details.city.trim().toLowerCase()
    );
    const next = {
      ...details,
      country: loc.name,
      countryCode: loc.dialCode,
      city: cityStillValid ? details.city : ''
    };
    setDetails(next);
    setCountryDropdownOpen(false);
    setCountrySearchTouched(false);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated.country;
      return updated;
    });
    if (next.mobile) validateSingleField('mobile', next);
    if (step2Error) setStep2Error('');
  };

  const handleSelectDialCode = (loc: CountryLocation) => {
    const cityStillValid = loc.cities.some(
      (c) => c.toLowerCase() === details.city.trim().toLowerCase()
    );
    const next = {
      ...details,
      countryCode: loc.dialCode,
      country: loc.name,
      city: details.country.trim().toLowerCase() === loc.name.toLowerCase() || cityStillValid ? details.city : ''
    };
    setDetails(next);
    setCodeDropdownOpen(false);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated.country;
      return updated;
    });
    if (next.mobile) validateSingleField('mobile', next);
    if (step2Error) setStep2Error('');
  };

  const handleSelectCity = (cityName: string) => {
    const next = { ...details, city: cityName };
    setDetails(next);
    setCityDropdownOpen(false);
    setCitySearchTouched(false);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated.city;
      return updated;
    });
    if (step2Error) setStep2Error('');
  };

  const chevronBgStyle: React.CSSProperties = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isUrdu ? 'left 14px center' : 'right 14px center',
    backgroundSize: '16px 16px',
  };

  useEffect(() => {
    let mounted = true;
    fetch('/api/donations/config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data) {
          setConfig({
            razorpayEnabled: Boolean(data.razorpayEnabled),
            razorpayKeyId: data.razorpayKeyId || '',
            upi: data.upi || DEFAULT_CONFIG.upi,
            bank: data.bank || DEFAULT_CONFIG.bank,
            whatsapp: data.whatsapp || DEFAULT_CONFIG.whatsapp
          });
        }
      })
      .catch(() => {
        // Fallback to default foundation config silently
      });
    return () => {
      mounted = false;
    };
  }, []);

  const predefinedAmounts = ['501', '1100', '2500', '5100', '11000', '21000'];

  const causes = [
    'Where Needed Most',
    'Hussaini Langar Revival',
    'Fatimi Langar',
    'Religious & Community Events',
    'General Charity'
  ];

  const razorpayMethods = [
    { id: 'upi', name: dt.methods.upi, icon: <Smartphone size={20} />, sub: dt.methods.upiSub },
    { id: 'card', name: dt.methods.card, icon: <CreditCard size={20} />, sub: dt.methods.cardSub },
    { id: 'netbanking', name: dt.methods.netbanking, icon: <Landmark size={20} />, sub: dt.methods.netbankingSub },
    { id: 'wallet', name: dt.methods.wallet, icon: <Wallet size={20} />, sub: dt.methods.walletSub },
    { id: 'applepay', name: dt.methods.applepay, icon: <Smartphone size={20} />, sub: dt.methods.applepaySub },
    { id: 'int_card', name: dt.methods.int_card, icon: <CreditCard size={20} />, sub: dt.methods.int_cardSub },
  ];

  const getDonationAmount = () => customAmount || amount || '0';
  const getNumericAmount = () => Number(getDonationAmount());

  const handleCopyText = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleProceedToDonate = () => {
    const val = Number(customAmount || amount);
    if (!Number.isFinite(val) || val < 1) {
      setStep1Error(dt.alertSelectAmount);
      return;
    }
    setStep1Error('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapValidationError = (code: FieldErrorCode | null, suggestion?: string): string => {
    if (!code) return '';
    switch (code) {
      case 'required':
        return dt.errRequired;
      case 'invalid_name':
        return dt.errInvalidName;
      case 'invalid_email':
        return dt.alertInvalidEmail;
      case 'disposable_email':
        return dt.errDisposableEmail;
      case 'typo_domain':
        return dt.errEmailTypo.replace('{suggestion}', suggestion || '');
      case 'non_digits':
        return dt.errNonDigits;
      case 'invalid_indian_mobile':
        return dt.errInvalidIndianMobile;
      case 'invalid_mobile_length':
        return dt.errInvalidMobileLength;
      case 'fake_mobile_pattern':
        return dt.errFakeMobilePattern;
      case 'invalid_location':
        return dt.errInvalidLocation;
      case 'invalid_pan':
        return dt.alertInvalidPan;
      case 'pan_required_80g':
        return dt.alertPanRequired80G;
      default:
        return dt.alertFillFields;
    }
  };

  const validateSingleField = (
    field: 'fullName' | 'email' | 'mobile' | 'country' | 'city' | 'pan',
    nextDetails = details
  ): string => {
    let msg = '';
    if (field === 'fullName') {
      msg = mapValidationError(validateFullName(nextDetails.fullName));
    } else if (field === 'email') {
      const check = validateEmailAddress(nextDetails.email);
      setEmailSuggestion(check.suggestion || '');
      msg = mapValidationError(check.errorCode, check.suggestion);
    } else if (field === 'mobile') {
      const check = validateMobileNumber(nextDetails.countryCode, nextDetails.mobile);
      msg = mapValidationError(check.errorCode);
    } else if (field === 'country') {
      msg = mapValidationError(validateLocationText(nextDetails.country));
    } else if (field === 'city') {
      msg = mapValidationError(validateLocationText(nextDetails.city));
    } else if (field === 'pan') {
      msg = mapValidationError(
        validatePanNumber(nextDetails.pan, nextDetails.require80G && donorType === 'indian')
      );
    }
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (msg) updated[field] = msg;
      else delete updated[field];
      return updated;
    });
    return msg;
  };

  const handleDonateNow = async () => {
    const errors: Record<string, string> = {};
    const nameMsg = mapValidationError(validateFullName(details.fullName));
    if (nameMsg) errors.fullName = nameMsg;

    const emailCheck = validateEmailAddress(details.email);
    setEmailSuggestion(emailCheck.suggestion || '');
    const emailMsg = mapValidationError(emailCheck.errorCode, emailCheck.suggestion);
    if (emailMsg) errors.email = emailMsg;

    const mobileCheck = validateMobileNumber(details.countryCode, details.mobile);
    const mobileMsg = mapValidationError(mobileCheck.errorCode);
    if (mobileMsg) errors.mobile = mobileMsg;

    const countryMsg = mapValidationError(validateLocationText(details.country));
    if (countryMsg) errors.country = countryMsg;

    const cityMsg = mapValidationError(validateLocationText(details.city));
    if (cityMsg) errors.city = cityMsg;

    const panMsg = mapValidationError(
      validatePanNumber(details.pan, details.require80G && donorType === 'indian')
    );
    if (panMsg) errors.pan = panMsg;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStep2Error(dt.alertFillFields);
      return;
    }

    setFieldErrors({});
    setStep2Error('');
    setIsValidatingDetails(true);

    try {
      const res = await fetch('/api/donations/validate-donor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: details.fullName.trim(),
          donorEmail: details.email.trim(),
          countryCode: details.countryCode,
          mobile: mobileCheck.digits,
          donorMobile: `${details.countryCode}${mobileCheck.digits}`,
          donorType,
          country: details.country.trim(),
          city: details.city.trim(),
          pan: details.pan.trim().toUpperCase(),
          require80G: details.require80G,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        const srvErrors: Record<string, string> = {};
        if (data.fieldErrors?.email) {
          srvErrors.email = dt.errEmailDomainUnreachable;
        }
        if (data.fieldErrors?.mobile) {
          srvErrors.mobile = mapValidationError(
            details.countryCode === '+91' ? 'invalid_indian_mobile' : 'invalid_mobile_length'
          );
        }
        if (data.fieldErrors?.fullName) srvErrors.fullName = dt.errInvalidName;
        if (data.fieldErrors?.country) srvErrors.country = dt.errInvalidLocation;
        if (data.fieldErrors?.city) srvErrors.city = dt.errInvalidLocation;
        if (data.fieldErrors?.pan) srvErrors.pan = dt.alertInvalidPan;
        setFieldErrors(srvErrors);
        setStep2Error(data.error || dt.alertFillFields);
        setIsValidatingDetails(false);
        return;
      }
    } catch {
      // Allow client-validated details to proceed if offline check cannot complete
    } finally {
      setIsValidatingDetails(false);
    }

    setPaymentError('');
    setUtrNumber('');
    setActivePayTab('upi');
    setIsModalScrolled(false);
    setShowPaymentModal(true);
  };

  const handleDirectSubmit = async (method: 'upi' | 'bank_transfer') => {
    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 6) {
      setPaymentError(dt.alertEnterUtr);
      return;
    }

    setPaymentError('');
    setIsProcessing(true);
    try {
      const cleanDigits = details.mobile.replace(/\D/g, '');
      const response = await fetch('/api/donations/submit-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getNumericAmount(),
          currency: 'INR',
          donorName: details.fullName.trim(),
          donorEmail: details.email.trim(),
          countryCode: details.countryCode,
          mobile: cleanDigits,
          donorMobile: `${details.countryCode}${cleanDigits}`,
          donorType,
          frequency,
          country: details.country.trim(),
          city: details.city.trim(),
          pan: details.pan.trim().toUpperCase(),
          require80G: details.require80G,
          prayerRequest: details.prayerRequest.trim(),
          cause,
          paymentMethod: method,
          utrNumber: cleanUtr
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setPaymentError(data.error || 'Could not record donation. Please check your UTR reference.');
        setIsProcessing(false);
        return;
      }

      setReceiptData(data.donation);
      setIsProcessing(false);
      setShowPaymentModal(false);
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setPaymentError('Network error while recording donation. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleProcessRazorpay = async (methodId: string) => {
    setPaymentError('');
    setIsProcessing(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setPaymentError('Razorpay SDK failed to load. Please check your connection or use UPI QR / Bank Transfer.');
        setIsProcessing(false);
        return;
      }

      const key = config.razorpayKeyId;
      if (!config.razorpayEnabled || !key) {
        setPaymentError('Online card gateway is not active yet. Please use UPI QR or Direct Bank Transfer.');
        setIsProcessing(false);
        return;
      }

      const cleanDigits = details.mobile.replace(/\D/g, '');
      const amountToPay = getNumericAmount();
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToPay,
          currency: 'INR',
          donorName: details.fullName.trim(),
          donorEmail: details.email.trim(),
          countryCode: details.countryCode,
          mobile: cleanDigits,
          donorMobile: `${details.countryCode}${cleanDigits}`,
          donorType,
          frequency,
          country: details.country.trim(),
          city: details.city.trim(),
          pan: details.pan.trim().toUpperCase(),
          require80G: details.require80G,
          prayerRequest: details.prayerRequest.trim(),
          paymentMethod: `razorpay_${methodId}`,
          cause
        })
      });

      const order = await orderRes.json();
      if (!orderRes.ok || order.error) {
        setPaymentError(order.error || 'Could not initiate payment order.');
        setIsProcessing(false);
        return;
      }

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'Maulai Growh Foundation',
        description: cause,
        image: '/logo.png',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            const result = await verifyRes.json();
            if (result.success && result.donation) {
              setReceiptData(result.donation);
              setIsProcessing(false);
              setShowPaymentModal(false);
              setStep(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setPaymentError(result.message || 'Payment verification failed!');
              setIsProcessing(false);
            }
          } catch {
            setPaymentError('Error verifying payment. Please contact us with your payment ID.');
            setIsProcessing(false);
          }
        },
        prefill: {
          name: details.fullName.trim(),
          email: details.email.trim(),
          contact: `${details.countryCode}${details.mobile.trim()}`,
          method: methodId === 'int_card' ? 'card' : methodId
        },
        theme: {
          color: '#d4af37'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setPaymentError(`Payment Failed: ${response.error?.description || 'Transaction declined'}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch {
      setPaymentError('Something went wrong starting online checkout. Please try UPI QR or Bank Transfer.');
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = () => {
    if (!receiptData) return;
    const formattedDate = new Date(receiptData.createdAt).toLocaleString();
    const causeText = dt.causes[receiptData.cause as keyof typeof dt.causes] || receiptData.cause;
    const methodLabel =
      receiptData.paymentMethod === 'upi'
        ? dt.methodUpi
        : receiptData.paymentMethod === 'bank_transfer'
        ? dt.methodBank
        : dt.methodGateway;
    const statusLabel =
      receiptData.status === 'SUCCESS' ? dt.statusVerified : dt.statusPendingVerify;

    const receiptHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Donation Receipt - ${escapeHtml(receiptData.receiptNumber)}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; background: #f8f5ef; color: #1a1a1a; margin: 0; padding: 32px 16px; }
    .card { max-width: 720px; margin: 0 auto; background: #ffffff; border: 2px solid #b8922e; border-radius: 14px; padding: 36px; box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 1px solid #e5dcc5; padding-bottom: 20px; margin-bottom: 24px; }
    .header h1 { margin: 0 0 6px; color: #8a6d21; font-size: 26px; letter-spacing: 1px; text-transform: uppercase; }
    .header p { margin: 2px 0; color: #555; font-size: 13px; font-family: Arial, sans-serif; }
    .badge { display: inline-block; margin-top: 10px; padding: 6px 14px; border-radius: 999px; background: #f3ebd3; color: #755814; font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; letter-spacing: 0.8px; text-transform: uppercase; }
    .grid { width: 100%; border-collapse: collapse; margin: 20px 0; font-family: Arial, sans-serif; font-size: 14px; }
    .grid td { padding: 10px 12px; border-bottom: 1px solid #eee6d3; }
    .grid td.label { color: #666; font-weight: 600; width: 40%; text-transform: uppercase; font-size: 12px; letter-spacing: 0.6px; }
    .grid td.value { color: #111; font-weight: 600; text-align: right; }
    .amount-box { background: #111; color: #d4af37; padding: 18px 24px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin: 20px 0; font-family: Arial, sans-serif; }
    .amount-box span { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #e5d49c; }
    .amount-box strong { font-size: 26px; }
    .footer { margin-top: 28px; padding-top: 16px; border-top: 1px dashed #d6c8a3; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #666; }
    .print-btn { display: inline-block; margin-top: 16px; padding: 10px 22px; background: #8a6d21; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    @media print { .print-btn { display: none; } body { background: #fff; padding: 0; } .card { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Maulai Growh Foundation</h1>
      <p>Hotel Khwaja Mahal, Langar Khana Street, Ajmer, Rajasthan 305001, India</p>
      <p>Phone: +91 9680872049 | UPI: syedgggurdezi@okicici</p>
      <div class="badge">${escapeHtml(statusLabel)}</div>
    </div>
    <div class="amount-box">
      <span>Official Donation Receipt</span>
      <strong>₹${escapeHtml(receiptData.amount.toLocaleString('en-IN'))}</strong>
    </div>
    <table class="grid">
      <tr><td class="label">Receipt Number</td><td class="value">${escapeHtml(receiptData.receiptNumber)}</td></tr>
      <tr><td class="label">Transaction / UTR ID</td><td class="value">${escapeHtml(receiptData.paymentId)}</td></tr>
      <tr><td class="label">Order Reference</td><td class="value">${escapeHtml(receiptData.orderId)}</td></tr>
      <tr><td class="label">Date &amp; Time</td><td class="value">${escapeHtml(formattedDate)}</td></tr>
      <tr><td class="label">Donor Name</td><td class="value">${escapeHtml(receiptData.donorName)}</td></tr>
      ${receiptData.city || receiptData.country ? `<tr><td class="label">Location</td><td class="value">${escapeHtml([receiptData.city, receiptData.country].filter(Boolean).join(', '))}</td></tr>` : ''}
      <tr><td class="label">Cause</td><td class="value">${escapeHtml(causeText)}</td></tr>
      <tr><td class="label">Frequency</td><td class="value">${escapeHtml(receiptData.frequency === 'monthly' ? 'Monthly' : 'One Time')}</td></tr>
      <tr><td class="label">Payment Method</td><td class="value">${escapeHtml(methodLabel)}</td></tr>
      ${receiptData.pan ? `<tr><td class="label">PAN (80G)</td><td class="value">${escapeHtml(receiptData.pan)}</td></tr>` : ''}
    </table>
    <div class="footer">
      <p>Offered as Nazar-o-Niyaz / Khums in service of humanity.</p>
      <p>Verify this receipt anytime on the Maulai Growh Foundation Donate page using Receipt No. <strong>${escapeHtml(receiptData.receiptNumber)}</strong>.</p>
      <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([receiptHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Maulai-Growh-Foundation-Receipt-${receiptData.receiptNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleShareReceipt = async () => {
    if (!receiptData) return;
    const summaryText = `I just contributed ₹${receiptData.amount.toLocaleString('en-IN')} towards ${receiptData.cause} at Maulai Growh Foundation (Receipt: ${receiptData.receiptNumber}). Join the legacy of Khidmat: ${window.location.origin}/donate`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Maulai Growh Foundation - Contribution',
          text: summaryText,
          url: `${window.location.origin}/donate`
        });
        return;
      } catch {
        // User cancelled or share unsupported in iframe -> fall through to clipboard
      }
    }
    await handleCopyText(summaryText, 'share');
    setShareFeedback(dt.shareCopiedMsg);
    setTimeout(() => setShareFeedback(''), 3000);
  };

  const handleVerifyReceiptLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = lookupRef.trim();
    if (ref.length < 4) {
      setLookupError(dt.verifyReceiptPlaceholder);
      setLookupResult(null);
      return;
    }
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);
    try {
      const res = await fetch(`/api/donations/verify-receipt/${encodeURIComponent(ref)}`);
      const data = await res.json();
      if (!res.ok || !data.found) {
        setLookupError(data.error || 'No donation record found.');
      } else {
        setLookupResult(data.receipt);
      }
    } catch {
      setLookupError('Unable to verify receipt right now. Please try again.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleResetDonation = () => {
    setReceiptData(null);
    setUtrNumber('');
    setPaymentError('');
    setStep2Error('');
    setStep1Error('');
    setShowNote(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const amountVal = getNumericAmount() > 0 ? getNumericAmount() : 0;
  const upiUri = `upi://pay?pa=${encodeURIComponent(config.upi.id)}&pn=${encodeURIComponent(config.upi.payeeName)}&am=${encodeURIComponent(String(amountVal))}&cu=INR&tn=${encodeURIComponent(`MGF - ${cause}`)}`;
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;

  const whatsappModalUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Assalamu Alaikum, I have made a donation of ₹${getDonationAmount()} towards "${cause}".\nName: ${details.fullName}\nEmail: ${details.email}\n${utrNumber ? `UTR / Ref: ${utrNumber}` : ''}`
  )}`;

  const whatsappReceiptUrl = receiptData
    ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
        `Assalamu Alaikum, please find my donation details:\nReceipt No: ${receiptData.receiptNumber}\nTransaction / UTR ID: ${receiptData.paymentId}\nAmount: ₹${receiptData.amount}\nCause: ${receiptData.cause}\nDonor: ${receiptData.donorName}`
      )}`
    : `https://wa.me/${config.whatsapp}`;

  if (step === 4 && receiptData) {
    const isVerified = receiptData.status === 'SUCCESS';
    return (
      <div className={`relative bg-brand-black min-h-screen pt-32 pb-20 px-4 ${isUrdu ? 'rtl' : 'ltr'}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 mix-blend-overlay z-0" />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] p-6 sm:p-10 rounded-3xl border border-brand-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />

            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 border ${isVerified ? 'bg-green-500/20 border-green-500/30' : 'bg-brand-gold/15 border-brand-gold/40'}`}>
              {isVerified ? (
                <CheckCircle2 size={44} className="text-green-500" />
              ) : (
                <Clock size={42} className="text-brand-gold" />
              )}
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
              isVerified
                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                : 'bg-brand-gold/10 text-brand-gold border-brand-gold/30'
            }`}>
              <ShieldCheck size={14} />
              {isVerified ? dt.statusVerified : dt.statusPendingVerify}
            </div>

            <h2 className={`text-3xl md:text-4xl text-brand-gold mb-4 ${t.fontClassSerif}`}>{dt.successTitle}</h2>
            <p className={`text-gray-300 mb-8 text-base sm:text-lg ${isUrdu ? 'font-urdu' : isHindi ? 'font-hindi' : ''}`}>
              {dt.successDesc.replace('{name}', receiptData.donorName || details.fullName)}
            </p>

            <div className={`bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-y-5 ${isUrdu ? 'text-right' : 'text-left'}`}>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.receiptNoLabel}</p>
                <p className="text-brand-gold font-mono font-bold text-sm sm:text-base break-all">{receiptData.receiptNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.txnId}</p>
                <p className="text-white font-mono text-sm sm:text-base break-all">{receiptData.paymentId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.amount}</p>
                <p className="text-brand-gold font-bold text-xl">₹{receiptData.amount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.date}</p>
                <p className="text-white text-sm sm:text-base">{new Date(receiptData.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.cause}</p>
                <p className="text-white text-sm sm:text-base">{dt.causes[receiptData.cause as keyof typeof dt.causes] || receiptData.cause}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dt.paymentMethodLabel}</p>
                <p className="text-white text-sm sm:text-base">
                  {receiptData.paymentMethod === 'upi'
                    ? dt.methodUpi
                    : receiptData.paymentMethod === 'bank_transfer'
                    ? dt.methodBank
                    : dt.methodGateway}
                </p>
              </div>
            </div>

            {shareFeedback && (
              <p className="text-green-400 text-sm mb-4 font-medium">{shareFeedback}</p>
            )}

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-gold text-black hover:bg-white transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm cursor-pointer"
              >
                <Download size={18} /> {dt.btnReceipt}
              </button>
              <button
                type="button"
                onClick={handleShareReceipt}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm cursor-pointer"
              >
                <Share2 size={18} /> {dt.btnShare}
              </button>
              <a
                href={whatsappReceiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm"
              >
                <MessageCircle size={18} /> {dt.whatsappProofBtn}
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleResetDonation}
                className="text-sm text-brand-gold hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                {dt.btnMakeAnother}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                {dt.btnReturnHome}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-brand-black w-full overflow-hidden min-h-screen pb-32 ${isUrdu ? 'rtl' : 'ltr'}`}>

      {/* Initial Humble Request Note */}
      <AnimatePresence>
        {showNote && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowNote(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="humble-note-modal relative w-full max-w-lg mx-auto bg-[#111] border-2 border-brand-gold rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 sm:p-4">
                <button
                  onClick={() => setShowNote(false)}
                  className="text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-1.5 sm:p-2"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 sm:mb-6">
                  <AlertCircle className="text-brand-gold w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3
                  className={`text-xl sm:text-2xl md:text-3xl text-brand-gold mb-3 sm:mb-4 ${t.fontClassSerif}`}
                  style={
                    isUrdu
                      ? {
                          fontSize: 'clamp(24px, 6.5vw, 42px)',
                          fontFamily: "'Lateef', serif",
                          paddingLeft: '0px',
                          paddingTop: '0px',
                          marginTop: '0px',
                          lineHeight: '1.3'
                        }
                      : isHindi
                      ? { fontSize: 'clamp(20px, 5vw, 28px)', lineHeight: '1.3' }
                      : { fontSize: 'clamp(20px, 5vw, 28px)', fontFamily: "'Cinzel', serif", lineHeight: '1.3' }
                  }
                >
                  {dt.humbleRequestTitle}
                </h3>
                <p
                  className={`text-gray-300 leading-relaxed mb-6 sm:mb-8 ${isUrdu ? 'font-urdu' : isHindi ? 'font-hindi' : ''}`}
                  style={
                    isUrdu
                      ? {
                          fontSize: 'clamp(14px, 3.8vw, 18px)',
                          lineHeight: '1.75'
                        }
                      : isHindi
                      ? { fontFamily: 'Arial', fontSize: 'clamp(13.5px, 3.6vw, 17px)', lineHeight: '1.6' }
                      : { fontSize: 'clamp(13.5px, 3.6vw, 16px)', lineHeight: '1.6' }
                  }
                >
                  {dt.humbleRequestDesc}
                </p>
                <button
                  onClick={() => setShowNote(false)}
                  className="w-full py-3 sm:py-4 rounded-xl bg-brand-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  style={
                    isUrdu
                      ? {
                          fontSize: 'clamp(16px, 4vw, 22px)',
                          fontFamily: "'Noto Naskh Arabic', serif"
                        }
                      : isHindi
                      ? { fontSize: 'clamp(14px, 3.5vw, 18px)' }
                      : { fontSize: 'clamp(13px, 3.5vw, 16px)' }
                  }
                >
                  {dt.btnUnderstand}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Real Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="payment-modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !isProcessing && setShowPaymentModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="payment-modal-card relative w-full max-w-xl bg-[#111] border border-brand-gold/30 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div
                className={`payment-modal-header border-b border-white/10 relative shrink-0 transition-all duration-300 ease-in-out ${
                  isModalScrolled
                    ? 'is-scrolled px-5 py-3.5 md:px-6 md:py-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] bg-[#141414]'
                    : 'p-6 md:p-8'
                }`}
              >
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                  className={`payment-modal-close absolute text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
                    isModalScrolled ? 'top-3 right-4' : 'top-6 right-6'
                  }`}
                >
                  <X size={isModalScrolled ? 20 : 24} />
                </button>
                <div
                  className={`payment-modal-brand flex items-center transition-all duration-300 ${
                    isModalScrolled ? 'gap-3 mb-2.5' : 'gap-4 mb-6'
                  }`}
                >
                  <div
                    className={`payment-modal-logo bg-black border border-brand-gold/60 overflow-hidden rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0 transition-all duration-300 ${
                      isModalScrolled ? 'w-9 h-9' : 'w-12 h-12'
                    }`}
                  >
                    <img
                      src="/logo.png"
                      alt="Maulai Growh Foundation Logo"
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`payment-modal-title text-white transition-all duration-300 font-bold ${t.fontClassSerif}`}
                      style={
                        isUrdu
                          ? { fontSize: isModalScrolled ? '22px' : '29px', fontFamily: 'Georgia, serif' }
                          : { fontSize: isModalScrolled ? '19px' : '25px' }
                      }
                    >
                      {dt.securePayment}
                    </h3>
                    <p
                      className={`payment-modal-order text-gray-400 transition-all duration-300 text-sm overflow-hidden ${
                        isModalScrolled ? 'max-h-0 opacity-0 m-0' : 'max-h-12 opacity-100'
                      }`}
                      style={
                        isUrdu
                          ? { fontSize: '20px', fontFamily: 'Georgia, serif' }
                          : { fontSize: '16px' }
                      }
                    >
                      {dt.causes[cause as keyof typeof dt.causes] || cause} • {frequency === 'monthly' ? dt.freqMonthly : dt.freqOnce}
                    </p>
                  </div>
                </div>
                <div
                  className={`payment-modal-summary flex items-center justify-between bg-black/50 border border-white/5 rounded-xl transition-all duration-300 ${
                    isModalScrolled ? 'px-3.5 py-2' : 'p-4'
                  }`}
                >
                  <span
                    className="payment-modal-total-label text-gray-400 text-sm uppercase tracking-widest font-bold transition-all duration-300"
                    style={
                      isUrdu
                        ? { fontSize: isModalScrolled ? '18px' : '25px', fontFamily: "'Noto Naskh Arabic', serif" }
                        : { fontSize: isModalScrolled ? '14px' : '19px' }
                    }
                  >
                    {dt.totalAmount}
                  </span>
                  <span
                    className="payment-modal-total-val font-bold text-brand-gold text-3xl transition-all duration-300"
                    style={{ fontSize: isModalScrolled ? '21px' : '30px' }}
                  >
                    ₹{getNumericAmount().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div
                className="payment-modal-body flex flex-col p-6 md:p-8 overflow-y-auto"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const top = el.scrollTop;
                  const maxScroll = el.scrollHeight - el.clientHeight;
                  setIsModalScrolled((prev) => {
                    if (!prev && top > 32 && maxScroll > 110) return true;
                    if (prev && top <= 4) return false;
                    return prev;
                  });
                }}
              >
                <div
                  className="payment-modal-badge order-1 flex items-center gap-2 justify-center mb-6 text-xs md:text-sm text-green-500 font-bold uppercase tracking-widest bg-green-500/10 py-2.5 px-5 rounded-full w-fit mx-auto border border-green-500/20 shrink-0"
                  style={
                    isUrdu
                      ? { fontSize: '20px', fontFamily: 'Georgia, serif' }
                      : { fontSize: '16px' }
                  }
                >
                  <ShieldCheck size={isUrdu ? 20 : 18} /> {dt.encrypted100}
                </div>

                {isProcessing ? (
                  <div className="payment-modal-processing order-2 flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-white/10 border-t-brand-gold rounded-full animate-spin mb-6" />
                    <h4 className="text-xl md:text-2xl text-white font-bold mb-2">{dt.processingPayment}</h4>
                    <p className="text-gray-400 text-center text-sm md:text-base">{dt.processingWait}</p>
                  </div>
                ) : (
                  <div className="order-2 space-y-5">
                    {/* Payment Method Selector Tabs */}
                    <div className={`grid gap-2 bg-black/70 p-1.5 rounded-xl border border-white/10 ${config.razorpayEnabled ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <button
                        type="button"
                        onClick={() => { setActivePayTab('upi'); setPaymentError(''); }}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          activePayTab === 'upi'
                            ? 'bg-brand-gold text-black shadow-md'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Smartphone size={16} />
                        <span>{dt.tabUpi}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setActivePayTab('bank'); setPaymentError(''); }}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          activePayTab === 'bank'
                            ? 'bg-brand-gold text-black shadow-md'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Landmark size={16} />
                        <span>{dt.tabBank}</span>
                      </button>
                      {config.razorpayEnabled && (
                        <button
                          type="button"
                          onClick={() => { setActivePayTab('gateway'); setPaymentError(''); }}
                          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            activePayTab === 'gateway'
                              ? 'bg-brand-gold text-black shadow-md'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <CreditCard size={16} />
                          <span>{dt.tabOnline}</span>
                        </button>
                      )}
                    </div>

                    {/* UPI QR & App Instant Payment */}
                    {activePayTab === 'upi' && (
                      <div className="space-y-5">
                        <div className="bg-black/60 border border-brand-gold/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
                          <div className="bg-white p-2.5 rounded-xl border-2 border-brand-gold/40 shrink-0 shadow-lg">
                            <img
                              src={upiQrUrl}
                              alt="UPI Payment QR Code"
                              className="w-40 h-40 object-contain"
                            />
                          </div>
                          <div className={`flex-1 space-y-3 ${isUrdu ? 'text-right' : 'text-center sm:text-left'}`}>
                            <div>
                              <h4 className="text-white font-bold text-base sm:text-lg">{dt.scanUpiTitle}</h4>
                              <p className="text-gray-400 text-xs sm:text-sm mt-1">{dt.scanUpiDesc}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{dt.upiIdLabel}</p>
                                <p className="text-brand-gold font-mono text-xs sm:text-sm font-bold truncate">{config.upi.id}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopyText(config.upi.id, 'upi_id')}
                                className="px-2.5 py-1.5 rounded-lg bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-black text-xs font-bold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                              >
                                {copiedField === 'upi_id' ? <Check size={14} /> : <Copy size={14} />}
                                {copiedField === 'upi_id' ? dt.copiedLabel : dt.copyLabel}
                              </button>
                            </div>
                            <a
                              href={upiUri}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-black text-white text-xs sm:text-sm font-bold transition-colors border border-white/10"
                            >
                              <ExternalLink size={15} />
                              {dt.openUpiApp} (₹{getNumericAmount().toLocaleString('en-IN')})
                            </a>
                          </div>
                        </div>

                        {/* UTR Confirmation Form */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                          <h5 className="text-brand-gold text-xs sm:text-sm font-bold uppercase tracking-wider">
                            {dt.utrStepTitle}
                          </h5>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            {dt.utrHelper}
                          </p>
                          <div className="space-y-2">
                            <label className="block text-xs text-gray-300 font-semibold">
                              {dt.utrLabel} <span className="text-brand-crimson">*</span>
                            </label>
                            <input
                              type="text"
                              value={utrNumber}
                              onChange={(e) => {
                                setUtrNumber(e.target.value);
                                if (paymentError) setPaymentError('');
                              }}
                              placeholder={dt.utrPlaceholder}
                              className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-brand-gold transition-colors uppercase placeholder:normal-case placeholder:text-gray-600"
                            />
                          </div>

                          {paymentError && (
                            <div className="flex items-start gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs sm:text-sm">
                              <AlertCircle size={16} className="shrink-0 mt-0.5" />
                              <span>{paymentError}</span>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDirectSubmit('upi')}
                            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#8a6d21] to-[#d4af37] text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
                          >
                            {dt.btnConfirmUtr}
                          </button>

                          <a
                            href={whatsappModalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                          >
                            <MessageCircle size={15} /> {dt.whatsappProofBtn}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Direct Bank Transfer (IMPS / NEFT / RTGS) */}
                    {activePayTab === 'bank' && (
                      <div className="space-y-5">
                        <div className="bg-black/60 border border-brand-gold/25 rounded-2xl p-4 sm:p-5 space-y-3">
                          <h4 className="text-white font-bold text-sm sm:text-base border-b border-white/10 pb-2.5">
                            {dt.bankDetailsTitle}
                          </h4>
                          {[
                            { id: 'holder', label: dt.bankAccHolder, val: config.bank.accountHolder, copy: true },
                            { id: 'bank', label: dt.bankNameLabel, val: config.bank.bankName, copy: false },
                            { id: 'type', label: dt.bankAccType, val: config.bank.accountType, copy: false },
                            { id: 'accno', label: dt.bankAccNo, val: config.bank.accountNumber, copy: true, mono: true },
                            { id: 'ifsc', label: dt.bankIfsc, val: config.bank.ifsc, copy: true, mono: true }
                          ].map((row) => (
                            <div key={row.id} className="flex items-center justify-between gap-3 bg-white/5 rounded-xl px-3.5 py-2.5 border border-white/5">
                              <div className="min-w-0">
                                <p className="text-[11px] text-gray-400 uppercase tracking-wider">{row.label}</p>
                                <p className={`text-sm sm:text-base text-white font-semibold truncate ${row.mono ? 'font-mono text-brand-gold' : ''}`}>
                                  {row.val}
                                </p>
                              </div>
                              {row.copy && (
                                <button
                                  type="button"
                                  onClick={() => handleCopyText(row.val, row.id)}
                                  className="px-2.5 py-1.5 rounded-lg bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-black text-xs font-bold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                                >
                                  {copiedField === row.id ? <Check size={14} /> : <Copy size={14} />}
                                  {copiedField === row.id ? dt.copiedLabel : dt.copyLabel}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                          <h5 className="text-brand-gold text-xs sm:text-sm font-bold uppercase tracking-wider">
                            {dt.utrStepTitle}
                          </h5>
                          <div className="space-y-2">
                            <label className="block text-xs text-gray-300 font-semibold">
                              {dt.bankUtrLabel} <span className="text-brand-crimson">*</span>
                            </label>
                            <input
                              type="text"
                              value={utrNumber}
                              onChange={(e) => {
                                setUtrNumber(e.target.value);
                                if (paymentError) setPaymentError('');
                              }}
                              placeholder={dt.bankUtrPlaceholder}
                              className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-brand-gold transition-colors uppercase placeholder:normal-case placeholder:text-gray-600"
                            />
                          </div>

                          {paymentError && (
                            <div className="flex items-start gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs sm:text-sm">
                              <AlertCircle size={16} className="shrink-0 mt-0.5" />
                              <span>{paymentError}</span>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDirectSubmit('bank_transfer')}
                            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#8a6d21] to-[#d4af37] text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
                          >
                            {dt.btnConfirmUtr}
                          </button>

                          <a
                            href={whatsappModalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                          >
                            <MessageCircle size={15} /> {dt.whatsappProofBtn}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Razorpay Online Gateway (when RAZORPAY_KEY_ID & SECRET are configured) */}
                    {activePayTab === 'gateway' && config.razorpayEnabled && (
                      <div className="space-y-4">
                        <p className="text-xs sm:text-sm text-gray-400 text-center">{dt.gatewayCardsNote}</p>

                        {paymentError && (
                          <div className="flex items-start gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs sm:text-sm">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{paymentError}</span>
                          </div>
                        )}

                        <div className="payment-methods-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {razorpayMethods.map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => handleProcessRazorpay(method.id)}
                              className={`payment-method-btn flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-black/50 hover:bg-brand-gold/5 hover:border-brand-gold/40 transition-all ${isUrdu ? 'text-right' : 'text-left'} group cursor-pointer`}
                            >
                              <div className="payment-method-icon p-2 rounded-lg bg-white/5 text-gray-300 group-hover:text-brand-gold group-hover:bg-brand-gold/10 transition-colors shrink-0">
                                {method.icon}
                              </div>
                              <div>
                                <h4
                                  className="payment-method-title text-sm font-bold text-white mb-1"
                                  style={isUrdu ? { fontSize: '20px' } : { fontSize: '18px' }}
                                >
                                  {method.name}
                                </h4>
                                <p
                                  className="payment-method-sub text-xs text-gray-500 leading-tight"
                                  style={isUrdu ? { fontSize: '20px', fontFamily: 'Georgia, serif' } : { fontSize: '15px' }}
                                >
                                  {method.sub}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="relative pt-32 pb-16 px-4 lg:px-8 border-b border-brand-gold/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1590076215667-875d4cebe19e?auto=format&fit=crop&w=2000&q=80"
            alt="Dargah Sharif"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1
              variants={itemVariants}
              className={`text-4xl md:text-5xl lg:text-6xl text-brand-gold lg:mt-[65px] mb-6 ${t.fontClassSerif} leading-tight drop-shadow-lg`}
              style={
                isUrdu
                  ? { fontFamily: "'Lateef', serif", fontSize: '68px', lineHeight: '1.4' }
                  : isHindi
                  ? { fontFamily: "'Amita', cursive, sans-serif" }
                  : { fontSize: '64px', fontFamily: "'Cinzel', serif" }
              }
            >
              {dt.heroTitle}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className={`text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed italic ${t.fontClassSans} ${isUrdu ? 'font-urdu not-italic text-lg' : isHindi ? 'font-hindi not-italic text-lg' : ''}`}
              style={
                isUrdu
                  ? { fontSize: '20px' }
                  : isHindi
                  ? { fontFamily: 'Arial', fontSize: '22px' }
                  : { fontSize: '20px' }
              }
            >
              {dt.heroQuote}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 px-4 lg:px-8 z-20">
        <div className="max-w-3xl mx-auto space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#050505] p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl border border-brand-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(212,175,55,0.2)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[#991b1b]/15 rounded-full blur-[100px] pointer-events-none z-0" />

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col relative z-10"
              >
                {/* Donor Type Tabs */}
                <div className="flex border-b border-white/10 mb-6 md:mb-8 relative">
                  {['indian', 'nri', 'international'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDonorType(type)}
                      className={`flex-1 pb-3 md:pb-4 text-xs md:text-sm lg:text-base tracking-[0.1em] md:tracking-widest font-bold uppercase transition-colors relative ${
                        donorType === type ? 'text-brand-gold' : 'text-gray-500 hover:text-white'
                      }`}
                      style={
                        isUrdu
                          ? {
                              fontSize: '20px',
                              fontFamily: "'Noto Nastaliq Urdu', serif",
                              fontWeight: type === 'indian' ? 'bold' : 'normal',
                            }
                          : isHindi
                          ? { fontSize: '20px' }
                          : { fontSize: '18px' }
                      }
                    >
                      {type === 'indian' ? dt.donorIndian : type === 'nri' ? dt.donorNri : dt.donorInternational}
                      {donorType === type && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  <div className="space-y-4">
                    <h3
                      className="text-xs md:text-sm lg:text-base text-gray-400 uppercase tracking-[0.15em] md:tracking-widest font-bold"
                      style={
                        isUrdu
                          ? { fontSize: '22px', fontFamily: "'Noto Naskh Arabic', serif" }
                          : isHindi
                          ? { fontSize: '19px' }
                          : { fontSize: '18px' }
                      }
                    >
                      {dt.frequencyLabel}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 bg-black p-1.5 rounded-xl border border-white/10">
                      <button
                        onClick={() => setFrequency('once')}
                        className={`py-2.5 md:py-3.5 rounded-lg text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-widest uppercase transition-all ${frequency === 'once' ? 'bg-[#991b1b] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        style={
                          isUrdu
                            ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', serif" }
                            : isHindi
                            ? { fontSize: '20px' }
                            : { fontSize: '18px' }
                        }
                      >
                        {dt.freqOnce}
                      </button>
                      <button
                        onClick={() => setFrequency('monthly')}
                        className={`py-2.5 md:py-3.5 rounded-lg text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-widest uppercase transition-all flex items-center justify-center gap-1 md:gap-2 ${frequency === 'monthly' ? 'bg-[#991b1b] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        style={
                          isUrdu
                            ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', serif" }
                            : isHindi
                            ? { fontSize: '20px' }
                            : { fontSize: '18px' }
                        }
                      >
                        <Heart size={16} className={frequency === 'monthly' ? 'animate-pulse' : ''} /> {dt.freqMonthly}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3
                      className="text-xs md:text-sm lg:text-base text-gray-400 uppercase tracking-[0.15em] md:tracking-widest font-bold"
                      style={
                        isUrdu
                          ? { fontSize: '22px', fontFamily: "'Noto Naskh Arabic', serif" }
                          : isHindi
                          ? { fontSize: '19px' }
                          : { fontSize: '18px' }
                      }
                    >
                      {dt.causeLabel}
                    </h3>
                    <div className="relative">
                      <select
                        value={cause}
                        onChange={(e) => setCause(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer"
                        style={
                          isUrdu
                            ? { fontSize: '20px', fontFamily: "'Noto Naskh Arabic', serif" }
                            : isHindi
                            ? { fontSize: '20px' }
                            : { fontSize: '18px' }
                        }
                      >
                        {causes.map((c) => (
                          <option key={c} value={c}>{dt.causes[c as keyof typeof dt.causes] || c}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-xs md:text-sm lg:text-base text-gray-400 uppercase tracking-[0.15em] md:tracking-widest font-bold"
                      style={
                        isUrdu
                          ? { fontSize: '22px', fontFamily: "'Noto Naskh Arabic', serif" }
                          : isHindi
                          ? { fontSize: '20px' }
                          : { fontSize: '18px' }
                      }
                    >
                      {dt.selectAmount}
                    </h3>
                    <span
                      className="text-xs md:text-sm text-brand-gold font-bold uppercase tracking-wider"
                      style={
                        isUrdu
                          ? { fontSize: '24px', fontFamily: "'Scheherazade New', serif" }
                          : isHindi
                          ? { fontSize: '20px' }
                          : { fontSize: '18px' }
                      }
                    >
                      {dt.currency}
                    </span>
                  </div>

                  <div
                    className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 mb-3 md:mb-4"
                    style={!isUrdu && !isHindi ? { fontSize: '17px' } : undefined}
                  >
                    {predefinedAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setAmount(amt); setCustomAmount(''); setStep1Error(''); }}
                        className={`py-2.5 md:py-3.5 rounded-lg md:rounded-xl border transition-all duration-300 text-sm md:text-base font-bold ${
                          amount === amt && !customAmount
                            ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] transform scale-105'
                            : 'bg-black border-white/10 text-gray-300 hover:border-brand-gold/50 hover:text-brand-gold'
                        }`}
                        style={
                          isUrdu
                            ? { fontSize: '22px' }
                            : isHindi
                            ? { fontSize: '20px' }
                            : { fontSize: '19px' }
                        }
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base md:text-lg">₹</span>
                    <input
                      type="number"
                      min="1"
                      placeholder={dt.customAmountPlaceholder}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount('');
                        if (step1Error) setStep1Error('');
                      }}
                      className="w-full bg-black border border-white/10 rounded-xl py-4 pl-10 pr-4 text-base md:text-lg text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600 font-medium"
                      style={
                        isUrdu
                          ? { fontSize: '20px', fontFamily: "'Noto Nastaliq Urdu', serif", fontWeight: 'normal' }
                          : { fontSize: '20px' }
                      }
                    />
                  </div>
                </div>

                {step1Error && (
                  <p className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{step1Error}</span>
                  </p>
                )}

                <button
                  onClick={handleProceedToDonate}
                  className="w-full relative overflow-hidden group px-4 md:px-6 py-4 md:py-5 flex items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-r from-[#8a6d21] to-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer"
                >
                  <span
                    className="relative z-10 text-xs md:text-base uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-black flex items-center justify-center gap-2"
                    style={
                      isUrdu
                        ? { fontSize: '28px', fontFamily: "'Noto Naskh Arabic', serif" }
                        : isHindi
                        ? { fontSize: '24px' }
                        : { fontSize: '18px' }
                    }
                  >
                    {isHindi ? (
                      <>
                        <span className="md:hidden">आगे बढ़ें</span>
                        <span className="hidden md:inline">{dt.btnProceed}</span>
                      </>
                    ) : (
                      dt.btnProceed
                    )}{' '}
                    {isUrdu ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col relative z-10"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 md:pb-6 mb-6 md:mb-8">
                  <button
                    onClick={() => { setStep(1); setStep2Error(''); }}
                    className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors font-bold text-xs md:text-sm uppercase tracking-widest group cursor-pointer"
                    style={isUrdu ? { fontSize: '22px' } : isHindi ? { fontSize: '19px' } : { fontSize: '18px' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      {isUrdu ? <ArrowRight size={16} /> : <ChevronLeft size={16} />}
                    </div>
                    {dt.btnBack}
                  </button>
                  <div className={isUrdu ? 'text-left' : 'text-right'}>
                    <p
                      className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-1"
                      style={isUrdu ? { fontSize: '28px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                    >
                      {dt.donationAmountLabel}
                    </p>
                    <p
                      className="text-2xl md:text-3xl font-bold text-brand-gold tracking-tight"
                      style={{ fontSize: '30px' }}
                    >
                      ₹{getNumericAmount().toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-gold/10 to-transparent border-l-2 border-brand-gold p-4 md:p-5 mb-6 md:mb-8 rounded-r-lg md:rounded-r-xl">
                  <div className="flex gap-4 items-start">
                    <AlertCircle className="text-brand-gold shrink-0 mt-0.5" size={22} />
                    <div>
                      <h4
                        className="text-brand-gold font-bold mb-1 uppercase tracking-widest text-xs md:text-sm"
                        style={isUrdu ? { fontSize: '22px', fontFamily: 'Georgia, serif' } : isHindi ? { fontSize: '22px', fontFamily: "'Amita', cursive, sans-serif" } : { fontSize: '18px' }}
                      >
                        {dt.humbleRequestTitle}
                      </h4>
                      <p
                        className={`text-xs md:text-sm text-gray-300 leading-relaxed ${isUrdu ? 'font-urdu' : isHindi ? 'font-hindi' : ''}`}
                        style={
                          isUrdu
                            ? {
                                fontSize: '18px',
                                lineHeight: '39.5px',
                                textAlign: 'justify',
                              }
                            : isHindi
                            ? { fontSize: '19px', fontFamily: 'Arial, sans-serif' }
                            : { fontSize: '17px' }
                        }
                      >
                        {dt.humbleRequestDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontSize: '24px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                      >
                        {dt.fullNameLabel} <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={details.fullName}
                        onChange={(e) => {
                          const next = { ...details, fullName: e.target.value };
                          setDetails(next);
                          if (fieldErrors.fullName) validateSingleField('fullName', next);
                          if (step2Error) setStep2Error('');
                        }}
                        onBlur={() => validateSingleField('fullName')}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        className={`w-full bg-black/50 border rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none transition-colors placeholder:text-gray-700 ${
                          fieldErrors.fullName
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-white/10 focus:border-brand-gold'
                        }`}
                        placeholder={dt.fullNamePlaceholder}
                        dir={isUrdu ? 'rtl' : undefined}
                        lang={isUrdu ? 'ur' : undefined}
                        style={isUrdu ? { fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif", fontSize: '19px', lineHeight: '2.2', letterSpacing: '0px', unicodeBidi: 'plaintext' } : { fontSize: '18px' }}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-red-400 mt-1">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontSize: '24px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                      >
                        {dt.emailLabel} <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={details.email}
                        onChange={(e) => {
                          const next = { ...details, email: e.target.value };
                          setDetails(next);
                          if (fieldErrors.email) validateSingleField('email', next);
                          if (step2Error) setStep2Error('');
                        }}
                        onBlur={() => validateSingleField('email')}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className={`w-full bg-black/50 border rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none transition-colors placeholder:text-gray-700 ${
                          fieldErrors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-white/10 focus:border-brand-gold'
                        }`}
                        placeholder={dt.emailPlaceholder}
                        dir={isUrdu ? 'rtl' : undefined}
                        lang={isUrdu ? 'ur' : undefined}
                        style={isUrdu ? { fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif", fontSize: '19px', lineHeight: '2.2', letterSpacing: '0px', unicodeBidi: 'plaintext' } : { fontSize: '18px' }}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-400 mt-1">
                          {fieldErrors.email}
                          {emailSuggestion && (
                            <>
                              {' '}
                              <button
                                type="button"
                                onClick={() => {
                                  const next = { ...details, email: emailSuggestion };
                                  setDetails(next);
                                  setEmailSuggestion('');
                                  validateSingleField('email', next);
                                }}
                                className="underline text-brand-gold hover:text-white font-semibold ml-1 cursor-pointer"
                              >
                                {emailSuggestion}
                              </button>
                            </>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 relative" ref={codeDropdownRef}>
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontFamily: 'Georgia, serif', fontSize: '24px' } : { fontSize: '18px' }}
                      >
                        {dt.mobileLabel} <span className="text-brand-crimson">*</span>
                      </label>
                      <div className="flex gap-2 relative">
                        <button
                          type="button"
                          onClick={() => {
                            setCodeDropdownOpen((prev) => !prev);
                            setCountryDropdownOpen(false);
                            setCityDropdownOpen(false);
                          }}
                          aria-haspopup="listbox"
                          aria-expanded={codeDropdownOpen}
                          className={`w-[108px] sm:w-[118px] shrink-0 bg-black/50 border rounded-xl px-2.5 py-3 text-sm md:text-base text-white flex items-center justify-between gap-1.5 focus:outline-none transition-colors cursor-pointer ${
                            codeDropdownOpen
                              ? 'border-brand-gold bg-black/80'
                              : 'border-white/10 hover:border-brand-gold/50'
                          }`}
                          style={{ fontSize: '16px' }}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className="text-base leading-none">{activeDialCountry.flag}</span>
                            <span className="font-mono font-semibold text-white truncate">{details.countryCode}</span>
                          </span>
                          <ChevronDown
                            size={15}
                            className={`text-brand-gold shrink-0 transition-transform duration-200 ${codeDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <input
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={getMobileMaxLength(details.countryCode)}
                          value={details.mobile}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '');
                            const next = { ...details, mobile: digitsOnly };
                            setDetails(next);
                            if (fieldErrors.mobile) validateSingleField('mobile', next);
                            if (step2Error) setStep2Error('');
                          }}
                          onBlur={() => validateSingleField('mobile')}
                          aria-invalid={Boolean(fieldErrors.mobile)}
                          className={`flex-1 min-w-0 bg-black/50 border rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none transition-colors placeholder:text-gray-700 ${
                            fieldErrors.mobile
                              ? 'border-red-500/80 focus:border-red-500'
                              : 'border-white/10 focus:border-brand-gold'
                          }`}
                          placeholder={dt.mobilePlaceholder}
                          style={isUrdu ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', serif" } : { fontSize: '18px' }}
                        />
                        {codeDropdownOpen && (
                          <div
                            className={`absolute top-full ${isUrdu ? 'right-0' : 'left-0'} mt-1.5 w-[275px] sm:w-[310px] z-50 rounded-xl bg-[#111111] border border-brand-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden`}
                            dir="ltr"
                          >
                            <div className="p-2 border-b border-white/10 bg-black/60">
                              <div className="flex items-center gap-2 bg-black/80 border border-white/10 focus-within:border-brand-gold/70 rounded-lg px-2.5 py-2">
                                <Search size={14} className="text-brand-gold shrink-0" />
                                <input
                                  ref={codeSearchInputRef}
                                  type="text"
                                  value={codeSearch}
                                  onChange={(e) => setCodeSearch(e.target.value)}
                                  placeholder={dt.searchCodePlaceholder}
                                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                />
                                {codeSearch && (
                                  <button
                                    type="button"
                                    onClick={() => setCodeSearch('')}
                                    className="text-gray-500 hover:text-white cursor-pointer"
                                  >
                                    <X size={13} />
                                  </button>
                                )}
                              </div>
                            </div>
                            <ul className="max-h-60 overflow-y-auto py-1 divide-y divide-white/[0.04]" role="listbox">
                              {filteredDialCountries.length > 0 ? (
                                filteredDialCountries.map((loc) => {
                                  const isSelected =
                                    loc.dialCode === details.countryCode &&
                                    loc.iso === activeDialCountry.iso;
                                  return (
                                    <li key={loc.iso}>
                                      <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSelectDialCode(loc)}
                                        className={`w-full px-3 py-2.5 flex items-center justify-between gap-2 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                                          isSelected
                                            ? 'bg-brand-gold/15 text-brand-gold font-semibold'
                                            : 'text-gray-200 hover:bg-white/5 hover:text-white'
                                        }`}
                                      >
                                        <span className="flex items-center gap-2.5 min-w-0">
                                          <span className="text-base leading-none shrink-0">{loc.flag}</span>
                                          <span className="truncate">{loc.name}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5 shrink-0">
                                          <span className="font-mono text-xs text-brand-gold/90">{loc.dialCode}</span>
                                          {isSelected && <Check size={13} className="text-brand-gold" />}
                                        </span>
                                      </button>
                                    </li>
                                  );
                                })
                              ) : (
                                <li className="px-3 py-4 text-center text-xs text-gray-500">
                                  {dt.noMatchingResults}
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                      {fieldErrors.mobile && (
                        <p className="text-xs text-red-400 mt-1">{fieldErrors.mobile}</p>
                      )}
                    </div>

                    <div className="space-y-2 relative" ref={countryDropdownRef}>
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontSize: '24px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                      >
                        {dt.countryLabel} <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        value={details.country}
                        onFocus={() => {
                          setCountryDropdownOpen(true);
                          setCountrySearchTouched(false);
                          setCodeDropdownOpen(false);
                          setCityDropdownOpen(false);
                        }}
                        onClick={() => {
                          setCountryDropdownOpen(true);
                          setCodeDropdownOpen(false);
                          setCityDropdownOpen(false);
                        }}
                        onChange={(e) => {
                          const nextVal = e.target.value;
                          const matched = findCountryByName(nextVal);
                          const next = {
                            ...details,
                            country: nextVal,
                            ...(matched ? { countryCode: matched.dialCode } : {})
                          };
                          setDetails(next);
                          setCountryDropdownOpen(true);
                          setCountrySearchTouched(true);
                          if (fieldErrors.country) validateSingleField('country', next);
                          if (step2Error) setStep2Error('');
                        }}
                        onBlur={() => validateSingleField('country')}
                        aria-invalid={Boolean(fieldErrors.country)}
                        aria-expanded={countryDropdownOpen}
                        aria-autocomplete="list"
                        className={`w-full bg-black/50 border rounded-lg md:rounded-xl ${isUrdu ? 'pl-10 pr-4' : 'pl-4 pr-10'} py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none transition-colors placeholder:text-gray-700 ${
                          fieldErrors.country
                            ? 'border-red-500/80 focus:border-red-500'
                            : countryDropdownOpen
                            ? 'border-brand-gold'
                            : 'border-white/10 focus:border-brand-gold'
                        }`}
                        placeholder={dt.countryPlaceholder}
                        dir={isUrdu ? 'rtl' : undefined}
                        lang={isUrdu ? 'ur' : undefined}
                        style={
                          isUrdu
                            ? {
                                ...chevronBgStyle,
                                fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif",
                                fontSize: '19px',
                                lineHeight: '2.2',
                                letterSpacing: '0px',
                                unicodeBidi: 'plaintext',
                              }
                            : { ...chevronBgStyle, fontSize: '18px' }
                        }
                      />
                      {countryDropdownOpen && (
                        <div
                          className="absolute left-0 right-0 z-50 mt-1 rounded-xl bg-[#111111] border border-brand-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
                          dir="ltr"
                        >
                          <div className="px-3 py-1.5 border-b border-white/10 bg-black/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-gray-400">
                            <span>{dt.searchCountryHint}</span>
                            <span className="text-brand-gold/80 font-mono">{filteredCountries.length}</span>
                          </div>
                          <ul className="max-h-60 overflow-y-auto py-1 divide-y divide-white/[0.04]" role="listbox">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((loc) => {
                                const isSelected =
                                  details.country.trim().toLowerCase() === loc.name.toLowerCase();
                                return (
                                  <li key={loc.iso}>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => handleSelectCountry(loc)}
                                      className={`w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                                        isSelected
                                          ? 'bg-brand-gold/15 text-brand-gold font-semibold'
                                          : 'text-gray-200 hover:bg-white/5 hover:text-white'
                                      }`}
                                    >
                                      <span className="flex items-center gap-2.5 min-w-0">
                                        <span className="text-base leading-none shrink-0">{loc.flag}</span>
                                        <span className="truncate">{loc.name}</span>
                                      </span>
                                      <span className="flex items-center gap-1.5 shrink-0">
                                        <span className="font-mono text-xs text-gray-400">{loc.dialCode}</span>
                                        {isSelected && <Check size={13} className="text-brand-gold" />}
                                      </span>
                                    </button>
                                  </li>
                                );
                              })
                            ) : (
                              <li className="px-3.5 py-3 text-center text-xs text-gray-500">
                                {dt.noMatchingResults}
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      {fieldErrors.country && (
                        <p className="text-xs text-red-400 mt-1">{fieldErrors.country}</p>
                      )}
                    </div>

                    <div className="space-y-2 relative" ref={cityDropdownRef}>
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontSize: '24px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                      >
                        {dt.cityLabel} <span className="text-brand-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        value={details.city}
                        onFocus={() => {
                          setCityDropdownOpen(true);
                          setCitySearchTouched(false);
                          setCodeDropdownOpen(false);
                          setCountryDropdownOpen(false);
                        }}
                        onClick={() => {
                          setCityDropdownOpen(true);
                          setCodeDropdownOpen(false);
                          setCountryDropdownOpen(false);
                        }}
                        onChange={(e) => {
                          const next = { ...details, city: e.target.value };
                          setDetails(next);
                          setCityDropdownOpen(true);
                          setCitySearchTouched(true);
                          if (fieldErrors.city) validateSingleField('city', next);
                          if (step2Error) setStep2Error('');
                        }}
                        onBlur={() => validateSingleField('city')}
                        aria-invalid={Boolean(fieldErrors.city)}
                        aria-expanded={cityDropdownOpen}
                        aria-autocomplete="list"
                        className={`w-full bg-black/50 border rounded-lg md:rounded-xl ${isUrdu ? 'pl-10 pr-4' : 'pl-4 pr-10'} py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none transition-colors placeholder:text-gray-700 ${
                          fieldErrors.city
                            ? 'border-red-500/80 focus:border-red-500'
                            : cityDropdownOpen
                            ? 'border-brand-gold'
                            : 'border-white/10 focus:border-brand-gold'
                        }`}
                        placeholder={dt.cityPlaceholder}
                        dir={isUrdu ? 'rtl' : undefined}
                        lang={isUrdu ? 'ur' : undefined}
                        style={
                          isUrdu
                            ? {
                                ...chevronBgStyle,
                                fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif",
                                fontSize: '19px',
                                lineHeight: '2.2',
                                letterSpacing: '0px',
                                unicodeBidi: 'plaintext',
                              }
                            : { ...chevronBgStyle, fontSize: '18px' }
                        }
                      />
                      {cityDropdownOpen && (
                        <div
                          className="absolute left-0 right-0 z-50 mt-1 rounded-xl bg-[#111111] border border-brand-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
                          dir="ltr"
                        >
                          <div className="px-3 py-1.5 border-b border-white/10 bg-black/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-gray-400">
                            <span className="truncate">
                              {matchedCountryObj
                                ? `${matchedCountryObj.flag} ${matchedCountryObj.name}`
                                : dt.searchCityHint}
                            </span>
                            <span className="text-brand-gold/80 font-mono shrink-0">{filteredCities.length}</span>
                          </div>
                          <ul className="max-h-60 overflow-y-auto py-1 divide-y divide-white/[0.04]" role="listbox">
                            {filteredCities.map((cityName) => {
                              const isSelected =
                                details.city.trim().toLowerCase() === cityName.toLowerCase();
                              return (
                                <li key={cityName}>
                                  <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelectCity(cityName)}
                                    className={`w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-brand-gold/15 text-brand-gold font-semibold'
                                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                                    }`}
                                  >
                                    <span className="flex items-center gap-2 min-w-0">
                                      <MapPin size={13} className="text-brand-gold/70 shrink-0" />
                                      <span className="truncate">{cityName}</span>
                                    </span>
                                    {isSelected && <Check size={13} className="text-brand-gold shrink-0" />}
                                  </button>
                                </li>
                              );
                            })}
                            {details.city.trim().length >= 2 &&
                              !availableCities.some(
                                (c) => c.toLowerCase() === details.city.trim().toLowerCase()
                              ) && (
                                <li>
                                  <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelectCity(details.city.trim())}
                                    className="w-full px-3.5 py-2.5 flex items-center gap-2 text-left text-xs sm:text-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 transition-colors cursor-pointer"
                                  >
                                    <MapPin size={13} className="shrink-0" />
                                    <span className="truncate">
                                      {dt.useCustomCity} <strong>{details.city.trim()}</strong>
                                    </span>
                                  </button>
                                </li>
                              )}
                            {filteredCities.length === 0 && details.city.trim().length < 2 && (
                              <li className="px-3.5 py-3 text-center text-xs text-gray-500">
                                {dt.noMatchingResults}
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      {fieldErrors.city && (
                        <p className="text-xs text-red-400 mt-1">{fieldErrors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.1em] md:tracking-widest font-bold flex gap-1"
                        style={isUrdu ? { fontSize: '24px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                      >
                        {dt.panLabel} <span className="text-gray-600 font-normal normal-case">{dt.panOptional}</span>
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={details.pan}
                        onChange={(e) => {
                          const next = { ...details, pan: e.target.value.toUpperCase() };
                          setDetails(next);
                          if (fieldErrors.pan) validateSingleField('pan', next);
                          if (step2Error) setStep2Error('');
                        }}
                        onBlur={() => validateSingleField('pan')}
                        aria-invalid={Boolean(fieldErrors.pan)}
                        className={`w-full bg-black/50 border rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-white focus:outline-none transition-colors uppercase placeholder:normal-case placeholder:text-gray-700 ${
                          fieldErrors.pan
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-white/10 focus:border-brand-gold'
                        }`}
                        placeholder={dt.panPlaceholder}
                        dir={isUrdu ? 'rtl' : undefined}
                        lang={isUrdu ? 'ur' : undefined}
                        style={isUrdu ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif", lineHeight: '2.2', letterSpacing: '0px', unicodeBidi: 'plaintext' } : { fontSize: '18px' }}
                      />
                      {fieldErrors.pan && (
                        <p className="text-xs text-red-400 mt-1">{fieldErrors.pan}</p>
                      )}
                    </div>
                  </div>

                  <div className="p-5 bg-black/30 rounded-xl border border-white/5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4
                          className="text-sm md:text-base text-white font-bold mb-1"
                          style={isUrdu ? { fontFamily: 'Georgia, serif', fontSize: '24px' } : { fontSize: '19px' }}
                        >
                          {dt.taxExemptionTitle}
                        </h4>
                        <p
                          className="text-xs md:text-sm text-gray-500"
                          style={
                            isUrdu
                              ? {
                                  fontSize: '22px',
                                  fontFamily: "'Noto Naskh Arabic', serif",
                                  paddingLeft: '0px',
                                  marginLeft: '7px',
                                  marginBottom: '0px',
                                  paddingRight: '0px',
                                  fontWeight: 'bold',
                                }
                              : { fontSize: '16px' }
                          }
                        >
                          {dt.taxExemptionDesc}
                        </p>
                      </div>
                      <div className="flex bg-black p-1 rounded-lg border border-white/10 w-fit shrink-0">
                        <button
                          onClick={() => {
                            const next = { ...details, require80G: true };
                            setDetails(next);
                            if (fieldErrors.pan) validateSingleField('pan', next);
                          }}
                          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-md text-xs md:text-sm font-bold tracking-wider uppercase transition-colors ${details.require80G ? 'bg-brand-gold text-black' : 'text-gray-400 hover:text-white'}`}
                          style={isUrdu ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', serif" } : { fontSize: '18px' }}
                        >
                          {dt.yes}
                        </button>
                        <button
                          onClick={() => {
                            const next = { ...details, require80G: false };
                            setDetails(next);
                            if (fieldErrors.pan) validateSingleField('pan', next);
                          }}
                          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-md text-xs md:text-sm font-bold tracking-wider uppercase transition-colors ${!details.require80G ? 'bg-brand-gold text-black' : 'text-gray-400 hover:text-white'}`}
                          style={isUrdu ? { fontSize: '19px', fontFamily: "'Noto Nastaliq Urdu', serif" } : { fontSize: '18px' }}
                        >
                          {dt.no}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] md:tracking-widest font-bold"
                      style={isUrdu ? { fontSize: '25px', fontFamily: 'Georgia, serif' } : { fontSize: '18px' }}
                    >
                      {dt.prayerLabel} <span className="text-gray-600 font-normal normal-case">{dt.prayerOptional}</span>
                    </label>
                    <textarea
                      rows={3}
                      value={details.prayerRequest}
                      onChange={(e) => setDetails({ ...details, prayerRequest: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg md:rounded-xl px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-gray-700"
                      placeholder={dt.prayerPlaceholder}
                      dir={isUrdu ? 'rtl' : undefined}
                      lang={isUrdu ? 'ur' : undefined}
                      style={isUrdu ? { fontFamily: "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif", fontSize: '20px', lineHeight: '2.2', letterSpacing: '0px', unicodeBidi: 'plaintext' } : { fontSize: '18px' }}
                    ></textarea>
                  </div>
                </div>

                {step2Error && (
                  <p className="mt-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{step2Error}</span>
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={handleDonateNow}
                    disabled={isValidatingDetails}
                    className="w-full relative overflow-hidden group px-6 py-5 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8a6d21] to-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer disabled:opacity-70"
                    style={
                      isUrdu
                        ? {
                            width: '300px',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            marginRight: '200px',
                          }
                        : undefined
                    }
                  >
                    <span
                      className="relative z-10 text-sm uppercase tracking-[0.2em] font-bold text-black flex items-center gap-2"
                      style={
                        isUrdu
                          ? {
                              fontFamily: "'Noto Nastaliq Urdu', serif",
                              fontSize: '23px',
                              marginTop: '7px',
                            }
                          : isHindi
                          ? { fontSize: '23px' }
                          : { fontSize: '19px' }
                      }
                    >
                      {isValidatingDetails ? (
                        dt.verifyingDetailsLabel
                      ) : (
                        <>
                          {dt.btnCompleteDonation} {isUrdu ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>

          {/* Official Receipt Verification Lookup */}
          <div className="bg-[#0e0e0e] border border-brand-gold/20 rounded-2xl p-5 sm:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className={`text-brand-gold font-bold text-lg sm:text-xl ${t.fontClassSerif}`}>
                  {dt.verifyReceiptTitle}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {dt.verifyReceiptDesc}
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyReceiptLookup} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={lookupRef}
                onChange={(e) => setLookupRef(e.target.value)}
                placeholder={dt.verifyReceiptPlaceholder}
                className="flex-1 bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-brand-gold placeholder:font-sans placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="px-6 py-3 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-black font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                <Search size={16} />
                {lookupLoading ? dt.verifyingReceipt : dt.btnVerifyReceipt}
              </button>
            </form>

            {lookupError && (
              <p className="mt-4 text-xs sm:text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{lookupError}</span>
              </p>
            )}

            {lookupResult && (
              <div className="mt-5 bg-black/60 border border-brand-gold/30 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> {dt.receiptVerifiedBanner}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    lookupResult.status === 'SUCCESS'
                      ? 'bg-green-500/10 text-green-400 border-green-500/30'
                      : 'bg-brand-gold/10 text-brand-gold border-brand-gold/30'
                  }`}>
                    {lookupResult.status === 'SUCCESS' ? dt.statusVerified : dt.statusPendingVerify}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                  <div>
                    <p className="text-gray-500 text-[11px] uppercase">{dt.receiptNoLabel}</p>
                    <p className="text-brand-gold font-mono font-bold break-all">{lookupResult.receiptNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[11px] uppercase">{dt.donorNameLabel}</p>
                    <p className="text-white font-medium">{lookupResult.donorName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[11px] uppercase">{dt.amount}</p>
                    <p className="text-white font-bold">₹{lookupResult.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[11px] uppercase">{dt.cause}</p>
                    <p className="text-gray-200">{dt.causes[lookupResult.cause as keyof typeof dt.causes] || lookupResult.cause}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
