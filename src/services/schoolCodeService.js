import { schoolCodes } from '../config/schoolCodes';

const SCHOOL_CODES_STORAGE_KEY = 'schoolCodes';

export const getSchoolCodes = () => {
  const storedCodes = sessionStorage.getItem(SCHOOL_CODES_STORAGE_KEY);
  if (!storedCodes) {
    // Initialize with default school codes if none exist
    sessionStorage.setItem(SCHOOL_CODES_STORAGE_KEY, JSON.stringify(schoolCodes));
    console.log('Initialized school codes:', schoolCodes);
    return schoolCodes;
  }
  
  const codes = JSON.parse(storedCodes);
  console.log('Retrieved school codes:', codes);
  return codes;
};

export const validateSchoolCode = (code) => {
  const schoolCodes = getSchoolCodes();
  console.log('Validating school code:', code);
  
  if (!schoolCodes[code]) {
    console.log('School code not found');
    return { isValid: false, message: "Code d'établissement invalide" };
  }
  
  if (!schoolCodes[code].active) {
    console.log('School code is inactive');
    return { isValid: false, message: "Ce code d'établissement n'est plus actif" };
  }
  
  console.log('School code is valid');
  return { isValid: true, schoolName: schoolCodes[code].name };
};

export const addSchoolCode = (code, data) => {
  const codes = getSchoolCodes();
  if (codes[code]) {
    throw new Error('Ce code existe déjà');
  }
  
  const newCodes = {
    ...codes,
    [code]: {
      ...data,
      createdAt: new Date().toISOString().split('T')[0]
    }
  };
  
  sessionStorage.setItem(SCHOOL_CODES_STORAGE_KEY, JSON.stringify(newCodes));
  return newCodes;
};

export const editSchoolCode = (code, data) => {
  const codes = getSchoolCodes();
  if (!codes[code]) {
    throw new Error('Code non trouvé');
  }
  
  const newCodes = {
    ...codes,
    [code]: {
      ...codes[code],
      ...data
    }
  };
  
  sessionStorage.setItem(SCHOOL_CODES_STORAGE_KEY, JSON.stringify(newCodes));
  return newCodes;
};

export const deleteSchoolCode = (code) => {
  const codes = getSchoolCodes();
  if (!codes[code]) {
    throw new Error('Code non trouvé');
  }
  
  const { [code]: removed, ...newCodes } = codes;
  sessionStorage.setItem(SCHOOL_CODES_STORAGE_KEY, JSON.stringify(newCodes));
  return newCodes;
}; 