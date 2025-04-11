import { schoolCodes } from '../config/schoolCodes';

const ADMIN_CODES_STORAGE_KEY = 'admin_codes';

// Codes admin prédéfinis pour chaque école
const ADMIN_CODES = {
  '1234': '1234_AdminComplex2024!',
  '5678': '5678_SecureAdmin2024!',
  '9012': '9012_AdminAccess2024!'
};

const getAdminCodes = () => {
  // Toujours retourner les codes prédéfinis
  return ADMIN_CODES;
};

const generateComplexCode = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';
  
  const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
  
  let code = '';
  // Au moins une majuscule
  code += getRandomChar(uppercase);
  // Au moins une minuscule
  code += getRandomChar(lowercase);
  // Au moins un chiffre
  code += getRandomChar(numbers);
  // Au moins un caractère spécial
  code += getRandomChar(special);
  
  // Compléter jusqu'à 12 caractères
  const allChars = uppercase + lowercase + numbers + special;
  while (code.length < 12) {
    code += getRandomChar(allChars);
  }
  
  // Mélanger le code
  return code.split('').sort(() => Math.random() - 0.5).join('');
};

const validateAdminCode = (schoolCode, adminCode) => {
  console.log('Validation attempt:', {
    schoolCode,
    adminCode,
    expectedCode: ADMIN_CODES[schoolCode]
  });

  if (!ADMIN_CODES[schoolCode]) {
    return {
      isValid: false,
      message: 'Code école invalide'
    };
  }

  if (adminCode !== ADMIN_CODES[schoolCode]) {
    return {
      isValid: false,
      message: 'Code administrateur incorrect'
    };
  }

  return {
    isValid: true,
    message: 'Code administrateur valide'
  };
};

export { getAdminCodes, validateAdminCode }; 