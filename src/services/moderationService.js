import * as toxicity from '@tensorflow-models/toxicity';

// Seuil de confiance pour la détection (entre 0 et 1)
const THRESHOLD = 0.85;

// Variable pour stocker le modèle une fois chargé
let model = null;

// Fonction pour charger le modèle
const loadModel = async () => {
  if (!model) {
    console.log('Chargement du modèle de modération...');
    model = await toxicity.load(THRESHOLD);
    console.log('Modèle chargé avec succès!');
  }
  return model;
};

// Fonction principale de modération
export const moderateMessage = async (message) => {
  try {
    // Charger le modèle si ce n'est pas déjà fait
    const moderationModel = await loadModel();

    // Prédictions
    const predictions = await moderationModel.classify([message]);

    // Vérifier les résultats
    const toxicCategories = predictions.filter(prediction => prediction.results[0].match);

    if (toxicCategories.length > 0) {
      // Message inapproprié détecté
      const category = toxicCategories[0].label;
      let reason;

      switch (category) {
        case 'identity_attack':
          reason = "Votre message contient des propos discriminatoires.";
          break;
        case 'insult':
          reason = "Votre message contient des insultes.";
          break;
        case 'threat':
          reason = "Votre message contient des menaces.";
          break;
        case 'toxicity':
          reason = "Votre message contient du contenu inapproprié.";
          break;
        case 'severe_toxicity':
          reason = "Votre message contient du contenu strictement interdit.";
          break;
        default:
          reason = "Votre message ne respecte pas nos règles de communauté.";
      }

      return {
        isAppropriate: false,
        reason: reason
      };
    }

    // Message approprié
    return {
      isAppropriate: true
    };

  } catch (error) {
    console.error('Erreur lors de la modération:', error);
    // En cas d'erreur, on laisse passer le message
    return {
      isAppropriate: true,
      error: true
    };
  }
};

// Fonction pour obtenir un message d'avertissement approprié
export const getWarningMessage = (severity) => {
  switch (severity) {
    case 'high':
      return "Ce message contient du contenu strictement interdit. Veuillez respecter les règles de la communauté.";
    case 'medium':
      return "Ce message contient du langage inapproprié. Merci de reformuler votre message de manière plus respectueuse.";
    case 'low':
      return "Ce message ne respecte pas les règles de format. Merci de le modifier.";
    default:
      return "Message non conforme aux règles de la communauté.";
  }
}; 