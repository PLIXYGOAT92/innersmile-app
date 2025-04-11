import { schoolCodes } from '../config/schoolCodes';

const ADMIN_CODES_STORAGE_KEY = 'admin_codes';

// Format du code admin : [code_école]_[mot_de_passe_complexe]
// Exemple : "1234_AdminComplex2024!"

const getAdminCodes = () => {
  let adminCodes = sessionStorage.getItem(ADMIN_CODES_STORAGE_KEY);
  if (!adminCodes) {
    // Initialiser avec des codes admin pour chaque école
    const initialAdminCodes = {};
    Object.keys(schoolCodes).forEach(schoolCode => {
      // Générer un code admin complexe pour chaque école
      const complexPart = generateComplexCode();
      initialAdminCodes[schoolCode] = `${schoolCode}_${complexPart}`;
    });
    sessionStorage.setItem(ADMIN_CODES_STORAGE_KEY, JSON.stringify(initialAdminCodes));
    return initialAdminCodes;
  }
  return JSON.parse(adminCodes);
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
  const adminCodes = getAdminCodes();
  const expectedCode = adminCodes[schoolCode];
  
  if (!expectedCode) {
    return {
      isValid: false,
      message: 'Code école invalide'
    };
  }
  
  if (adminCode !== expectedCode) {
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