// Liste des codes écoles valides avec leurs informations
export const schoolCodes = {
  '1234': {
    name: 'Lycée Victor Hugo',
    city: 'Paris',
    active: true,
    createdAt: '2024-03-20'
  },
  '5678': {
    name: 'Collège Jean Moulin',
    city: 'Lyon',
    active: true,
    createdAt: '2024-03-20'
  },
  '9012': {
    name: 'Lycée Saint-Exupéry',
    city: 'Marseille',
    active: true,
    createdAt: '2024-03-20'
  }
};

// Fonction pour vérifier si un code est valide
export const isValidSchoolCode = (code) => {
  return schoolCodes[code] && schoolCodes[code].active;
};

// Fonction pour obtenir les informations d'une école
export const getSchoolInfo = (code) => {
  return schoolCodes[code];
};

export const initialSchoolCodes = {
  '1234': {
    name: 'Lycée Démonstration',
    active: true
  },
  '5678': {
    name: 'Collège Test',
    active: true
  },
  '9012': {
    name: 'Lycée Exemple',
    active: false
  }
}; 