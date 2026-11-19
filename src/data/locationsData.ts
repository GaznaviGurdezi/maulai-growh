export interface CountryLocation {
  iso: string;
  name: string;
  dialCode: string;
  flag: string;
  cities: string[];
}

export const WORLD_LOCATIONS: CountryLocation[] = [
  {
    iso: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    cities: [
      'Ajmer',
      'Jaipur',
      'New Delhi',
      'Delhi',
      'Mumbai',
      'Hyderabad',
      'Lucknow',
      'Bengaluru',
      'Kolkata',
      'Chennai',
      'Pune',
      'Ahmedabad',
      'Surat',
      'Jodhpur',
      'Udaipur',
      'Kota',
      'Bikaner',
      'Alwar',
      'Bhilwara',
      'Pali',
      'Tonk',
      'Sikar',
      'Nagaur',
      'Barmer',
      'Kishangarh',
      'Beawar',
      'Bhopal',
      'Indore',
      'Ujjain',
      'Jabalpur',
      'Gwalior',
      'Agra',
      'Varanasi',
      'Prayagraj',
      'Kanpur',
      'Bareilly',
      'Aligarh',
      'Meerut',
      'Moradabad',
      'Rampur',
      'Saharanpur',
      'Muzaffarnagar',
      'Gorakhpur',
      'Ghaziabad',
      'Noida',
      'Gurugram',
      'Faridabad',
      'Chandigarh',
      'Amritsar',
      'Ludhiana',
      'Jalandhar',
      'Srinagar',
      'Jammu',
      'Patna',
      'Gaya',
      'Ranchi',
      'Jamshedpur',
      'Bhubaneswar',
      'Cuttack',
      'Guwahati',
      'Nagpur',
      'Nashik',
      'Chhatrapati Sambhajinagar (Aurangabad)',
      'Thane',
      'Navi Mumbai',
      'Solapur',
      'Kolhapur',
      'Vadodara',
      'Rajkot',
      'Jamnagar',
      'Bhavnagar',
      'Gandhinagar',
      'Kochi',
      'Kozhikode',
      'Thiruvananthapuram',
      'Thrissur',
      'Coimbatore',
      'Madurai',
      'Tiruchirappalli',
      'Visakhapatnam',
      'Vijayawada',
      'Guntur',
      'Mysuru',
      'Mangaluru',
      'Hubballi',
      'Raipur',
      'Dehradun',
      'Haridwar',
      'Roorkee',
      'Haldwani',
      'Shimla',
      'Panaji'
    ]
  },
  {
    iso: 'AE',
    name: 'United Arab Emirates',
    dialCode: '+971',
    flag: '🇦🇪',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
  },
  {
    iso: 'SA',
    name: 'Saudi Arabia',
    dialCode: '+966',
    flag: '🇸🇦',
    cities: ['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'Al Khobar', 'Dhahran', 'Taif', 'Tabuk', 'Abha', 'Jubail', 'Yanbu']
  },
  {
    iso: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Bradford', 'Leicester', 'Liverpool', 'Glasgow', 'Edinburgh', 'Bristol', 'Sheffield', 'Nottingham', 'Luton', 'Cardiff', 'Belfast', 'Coventry', 'Oxford', 'Cambridge']
  },
  {
    iso: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Dallas', 'San Francisco', 'San Jose', 'Washington, D.C.', 'Atlanta', 'Boston', 'Seattle', 'Miami', 'Detroit', 'Philadelphia', 'Phoenix', 'Austin', 'Jersey City', 'Edison', 'Dearborn', 'Orlando']
  },
  {
    iso: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    cities: ['Toronto', 'Mississauga', 'Brampton', 'Vancouver', 'Surrey', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Hamilton', 'Halifax', 'Kitchener']
  },
  {
    iso: 'QA',
    name: 'Qatar',
    dialCode: '+974',
    flag: '🇶🇦',
    cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail', 'Al Khor', 'Umm Salal', 'Mesaieed']
  },
  {
    iso: 'KW',
    name: 'Kuwait',
    dialCode: '+965',
    flag: '🇰🇼',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mangaf', 'Fahaheel']
  },
  {
    iso: 'OM',
    name: 'Oman',
    dialCode: '+968',
    flag: '🇴🇲',
    cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Seeb', 'Barka', 'Ibri']
  },
  {
    iso: 'BH',
    name: 'Bahrain',
    dialCode: '+973',
    flag: '🇧🇭',
    cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra', 'Budaiya']
  },
  {
    iso: 'PK',
    name: 'Pakistan',
    dialCode: '+92',
    flag: '🇵🇰',
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot', 'Gujranwala', 'Bahawalpur', 'Sukkur']
  },
  {
    iso: 'BD',
    name: 'Bangladesh',
    dialCode: '+880',
    flag: '🇧🇩',
    cities: ['Dhaka', 'Chattogram', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal', 'Cumilla', 'Rangpur', 'Gazipur']
  },
  {
    iso: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Hobart', 'Darwin']
  },
  {
    iso: 'SG',
    name: 'Singapore',
    dialCode: '+65',
    flag: '🇸🇬',
    cities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Bedok', 'Orchard']
  },
  {
    iso: 'MY',
    name: 'Malaysia',
    dialCode: '+60',
    flag: '🇲🇾',
    cities: ['Kuala Lumpur', 'George Town (Penang)', 'Johor Bahru', 'Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Ipoh', 'Malacca', 'Kota Kinabalu', 'Kuching']
  },
  {
    iso: 'DE',
    name: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Leipzig', 'Hannover']
  },
  {
    iso: 'FR',
    name: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Strasbourg', 'Bordeaux', 'Lille', 'Nantes']
  },
  {
    iso: 'TR',
    name: 'Turkey',
    dialCode: '+90',
    flag: '🇹🇷',
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Konya', 'Antalya', 'Adana', 'Gaziantep', 'Kayseri']
  },
  {
    iso: 'IQ',
    name: 'Iraq',
    dialCode: '+964',
    flag: '🇮🇶',
    cities: ['Baghdad', 'Najaf', 'Karbala', 'Basra', 'Kufa', 'Samarra', 'Erbil', 'Mosul', 'Hillah']
  },
  {
    iso: 'IR',
    name: 'Iran',
    dialCode: '+98',
    flag: '🇮🇷',
    cities: ['Tehran', 'Mashhad', 'Qom', 'Isfahan', 'Shiraz', 'Tabriz', 'Ahvaz', 'Karaj']
  },
  {
    iso: 'ZA',
    name: 'South Africa',
    dialCode: '+27',
    flag: '🇿🇦',
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Pietermaritzburg', 'Gqeberha (Port Elizabeth)', 'Bloemfontein']
  },
  {
    iso: 'NZ',
    name: 'New Zealand',
    dialCode: '+64',
    flag: '🇳🇿',
    cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin']
  },
  {
    iso: 'NL',
    name: 'Netherlands',
    dialCode: '+31',
    flag: '🇳🇱',
    cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg']
  },
  {
    iso: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Venice', 'Bologna', 'Genoa']
  },
  {
    iso: 'ES',
    name: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Málaga', 'Bilbao', 'Zaragoza']
  },
  {
    iso: 'CH',
    name: 'Switzerland',
    dialCode: '+41',
    flag: '🇨🇭',
    cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne']
  },
  {
    iso: 'SE',
    name: 'Sweden',
    dialCode: '+46',
    flag: '🇸🇪',
    cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås']
  },
  {
    iso: 'NO',
    name: 'Norway',
    dialCode: '+47',
    flag: '🇳🇴',
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen']
  },
  {
    iso: 'DK',
    name: 'Denmark',
    dialCode: '+45',
    flag: '🇩🇰',
    cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg']
  },
  {
    iso: 'IE',
    name: 'Ireland',
    dialCode: '+353',
    flag: '🇮🇪',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford']
  },
  {
    iso: 'BE',
    name: 'Belgium',
    dialCode: '+32',
    flag: '🇧🇪',
    cities: ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Liège']
  },
  {
    iso: 'AT',
    name: 'Austria',
    dialCode: '+43',
    flag: '🇦🇹',
    cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck']
  },
  {
    iso: 'ID',
    name: 'Indonesia',
    dialCode: '+62',
    flag: '🇮🇩',
    cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Yogyakarta', 'Denpasar']
  },
  {
    iso: 'EG',
    name: 'Egypt',
    dialCode: '+20',
    flag: '🇪🇬',
    cities: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Luxor', 'Aswan', 'Mansoura']
  },
  {
    iso: 'JO',
    name: 'Jordan',
    dialCode: '+962',
    flag: '🇯🇴',
    cities: ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Madaba']
  },
  {
    iso: 'LB',
    name: 'Lebanon',
    dialCode: '+961',
    flag: '🇱🇧',
    cities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos']
  },
  {
    iso: 'MA',
    name: 'Morocco',
    dialCode: '+212',
    flag: '🇲🇦',
    cities: ['Casablanca', 'Rabat', 'Marrakesh', 'Fes', 'Tangier', 'Agadir']
  },
  {
    iso: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flag: '🇰🇪',
    cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']
  },
  {
    iso: 'TZ',
    name: 'Tanzania',
    dialCode: '+255',
    flag: '🇹🇿',
    cities: ['Dar es Salaam', 'Zanzibar City', 'Arusha', 'Dodoma', 'Mwanza']
  },
  {
    iso: 'UG',
    name: 'Uganda',
    dialCode: '+256',
    flag: '🇺🇬',
    cities: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara']
  },
  {
    iso: 'NG',
    name: 'Nigeria',
    dialCode: '+234',
    flag: '🇳🇬',
    cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Kaduna']
  },
  {
    iso: 'MU',
    name: 'Mauritius',
    dialCode: '+230',
    flag: '🇲🇺',
    cities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes']
  },
  {
    iso: 'LK',
    name: 'Sri Lanka',
    dialCode: '+94',
    flag: '🇱🇰',
    cities: ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna', 'Dehiwala']
  },
  {
    iso: 'NP',
    name: 'Nepal',
    dialCode: '+977',
    flag: '🇳🇵',
    cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Birgunj', 'Nepalgunj']
  },
  {
    iso: 'MV',
    name: 'Maldives',
    dialCode: '+960',
    flag: '🇲🇻',
    cities: ['Malé', 'Addu City', 'Hulhumalé', 'Fuvahmulah']
  },
  {
    iso: 'AF',
    name: 'Afghanistan',
    dialCode: '+93',
    flag: '🇦🇫',
    cities: ['Kabul', 'Herat', 'Mazar-i-Sharif', 'Kandahar', 'Jalalabad']
  },
  {
    iso: 'JP',
    name: 'Japan',
    dialCode: '+81',
    flag: '🇯🇵',
    cities: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Kyoto', 'Fukuoka', 'Sapporo']
  },
  {
    iso: 'KR',
    name: 'South Korea',
    dialCode: '+82',
    flag: '🇰🇷',
    cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju']
  },
  {
    iso: 'CN',
    name: 'China',
    dialCode: '+86',
    flag: '🇨🇳',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Xi’an']
  },
  {
    iso: 'HK',
    name: 'Hong Kong',
    dialCode: '+852',
    flag: '🇭🇰',
    cities: ['Hong Kong Island', 'Kowloon', 'Tsim Sha Tsui', 'New Territories']
  },
  {
    iso: 'TH',
    name: 'Thailand',
    dialCode: '+66',
    flag: '🇹🇭',
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai']
  },
  {
    iso: 'PH',
    name: 'Philippines',
    dialCode: '+63',
    flag: '🇵🇭',
    cities: ['Manila', 'Quezon City', 'Cebu City', 'Davao City', 'Makati']
  },
  {
    iso: 'UZ',
    name: 'Uzbekistan',
    dialCode: '+998',
    flag: '🇺🇿',
    cities: ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Namangan']
  },
  {
    iso: 'AZ',
    name: 'Azerbaijan',
    dialCode: '+994',
    flag: '🇦🇿',
    cities: ['Baku', 'Ganja', 'Sumqayit', 'Lankaran']
  },
  {
    iso: 'RU',
    name: 'Russia',
    dialCode: '+7',
    flag: '🇷🇺',
    cities: ['Moscow', 'Saint Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg']
  },
  {
    iso: 'PL',
    name: 'Poland',
    dialCode: '+48',
    flag: '🇵🇱',
    cities: ['Warsaw', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań']
  },
  {
    iso: 'PT',
    name: 'Portugal',
    dialCode: '+351',
    flag: '🇵🇹',
    cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro']
  },
  {
    iso: 'BR',
    name: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Belo Horizonte']
  },
  {
    iso: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
    cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún']
  }
];

export function findCountryByName(name: string): CountryLocation | undefined {
  const clean = String(name || '').trim().toLowerCase();
  if (!clean) return undefined;
  return WORLD_LOCATIONS.find(
    (c) => c.name.toLowerCase() === clean || c.iso.toLowerCase() === clean
  );
}

export function findCountryByDialCode(
  dialCode: string,
  preferredCountryName?: string
): CountryLocation {
  if (preferredCountryName) {
    const byName = findCountryByName(preferredCountryName);
    if (byName && byName.dialCode === dialCode) {
      return byName;
    }
  }
  return (
    WORLD_LOCATIONS.find((c) => c.dialCode === dialCode) || WORLD_LOCATIONS[0]
  );
}

export function getCitiesForCountry(countryName: string): string[] {
  const country = findCountryByName(countryName);
  return country ? country.cities : [];
}
