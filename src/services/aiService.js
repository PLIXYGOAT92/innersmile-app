import { getCategoryById } from '../config/categories';

const STUDENT_PERSONAS = {
  1: {
    name: 'Emma',
    personality: 'Je suis en première, j\'ai traversé pas mal de moments de stress avec les examens mais j\'ai appris à gérer ça.',
    interests: ['la musique', 'le dessin', 'la lecture']
  },
  2: {
    name: 'Lucas',
    personality: 'Je suis en terminale, je suis plutôt décontracté mais je prends mes études au sérieux.',
    interests: ['le sport', 'les jeux vidéo', 'la photographie']
  },
  3: {
    name: 'Léa',
    personality: 'Je suis en seconde, je suis très sociable et j\'aime aider les autres.',
    interests: ['la danse', 'les réseaux sociaux', 'la mode']
  }
};

const TOPICS_BY_CATEGORY = {
  1: [ // Examens et stress
    "Comment gérer l'anxiété avant un examen important ?",
    "Techniques de révision efficaces et gestion du temps",
    "Faire face à la pression des résultats"
  ],
  2: [ // Isolement
    "Comment créer des liens dans un nouvel environnement ?",
    "Surmonter le sentiment de solitude sur le campus",
    "Trouver sa place dans la vie étudiante"
  ],
  3: [ // Harcèlement
    "Reconnaître les signes de harcèlement",
    "Comment réagir face à une situation de harcèlement",
    "Soutenir un ami victime de harcèlement"
  ],
  4: [ // Relations
    "Maintenir l'équilibre entre études et vie sociale",
    "Gérer une rupture pendant les études",
    "Faire face aux conflits entre amis"
  ],
  5: [ // Famille
    "Gérer les attentes familiales pendant les études",
    "Communication avec les parents à distance",
    "Trouver son indépendance tout en gardant les liens familiaux"
  ],
  6: [ // Bien-être
    "Routines pour maintenir un équilibre mental",
    "Gestion du stress au quotidien",
    "Prendre soin de soi pendant les périodes intenses"
  ]
};

const generatePrompt = (categoryId, messages, currentPersona) => {
  const category = getCategoryById(categoryId);
  const lastMessages = messages.slice(-3); // On prend les 3 derniers messages pour garder le contexte récent
  
  let contextPrompt = `Je suis ${currentPersona.name}. ${currentPersona.personality} `;
  
  // Ajouter le contexte des derniers messages
  if (lastMessages.length > 0) {
    contextPrompt += `\n\nJe participe à une discussion sur "${category.title}" avec d'autres élèves. `;
    lastMessages.forEach(msg => {
      if (msg.username !== currentPersona.name) {
        contextPrompt += `\n${msg.username} a dit: "${msg.content}"`;
      }
    });
  }

  // Ajouter des instructions spécifiques selon la catégorie
  switch (categoryId) {
    case 1: // Examens et stress
      contextPrompt += `\nJe vais partager mon expérience sur la gestion du stress et des examens, comme je le ferais avec un ami de classe.`;
      break;
    case 2: // Relations familiales
      contextPrompt += `\nJe vais parler de mes expériences familiales de façon honnête, comme je le ferais avec des amis en qui j'ai confiance.`;
      break;
    case 3: // Amitié et relations
      contextPrompt += `\nJe vais parler de mes expériences avec mes amis et donner des conseils basés sur ce que j'ai vécu.`;
      break;
    case 4: // Confiance en soi
      contextPrompt += `\nJe vais partager mes moments de doute et comment j'ai réussi à les surmonter, comme je le ferais avec des amis proches.`;
      break;
    case 5: // Orientation et avenir
      contextPrompt += `\nJe vais parler de mes projets d'avenir et de mes questionnements, comme je le ferais avec d'autres élèves.`;
      break;
    case 6: // Bien-être et santé mentale
      contextPrompt += `\nJe vais parler de mon expérience personnelle avec le bien-être et le stress, comme je le ferais avec des amis qui me font confiance.`;
      break;
  }

  return contextPrompt;
};

const simulateStudentResponse = async (prompt, lastMessageContent, currentPersona) => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));

  const lowercaseContent = lastMessageContent.toLowerCase();
  
  // Plusieurs réponses possibles pour chaque thème
  const responses = {
    stress: [
      `Tkt, je comprends trop ce que tu ressens... Moi aussi je stresse grave avant les exams. Ce qui m'aide perso, c'est de faire des pauses et d'écouter ${currentPersona.interests.includes('la musique') ? 'ma playlist spéciale révisions' : 'de la musique'}. T'as déjà essayé ça ?`,
      "Franchement, je sais ce que c'est... L'année dernière j'étais paralysé(e) par le stress. J'ai appris à faire des exercices de respiration, ça aide vraiment !",
      "Le stress c'est normal, mais faut pas le laisser nous bouffer ! Moi je fais du sport pour décompresser, ça vide la tête. Tu fais quoi pour te détendre toi ?",
      "Grave relatable ce que tu dis... Perso, j'ai commencé à noter mes pensées stressantes dans un carnet, ça aide à relativiser. T'as déjà testé un truc comme ça ?"
    ],
    
    famille: [
      "Ah les parents... C'est pas toujours facile à gérer hein ? Les miens aussi me prennent la tête parfois. Mais j'ai trouvé que quand je prends le temps de leur expliquer calmement ce que je ressens, ça passe mieux.",
      "Trop ça ! Mes parents aussi ils comprennent pas toujours ce que je vis. Mais depuis qu'on a commencé à faire des 'réunions de famille' une fois par semaine pour parler, ça va mieux. Tu pourrais peut-être essayer ?",
      "Je te comprends tellement... Avec mes parents c'était tendu avant, surtout pour les notes. Maintenant on a trouvé un équilibre, mais ça a pris du temps. Faut pas lâcher !",
      "Les parents c'est compliqué... Ils veulent notre bien mais parfois ils s'y prennent mal. T'as essayé d'en parler avec eux ?"
    ],
    
    amitie: [
      "Les vrais potes c'est précieux ! Moi j'ai galéré au début de l'année, mais j'ai fini par trouver des gens avec qui je peux être moi-même.",
      `En vrai, ${currentPersona.interests[0]} m'a beaucoup aidé(e) à rencontrer des gens. Tu as des passions comme ça qui pourraient t'aider à faire des rencontres ?`,
      "L'amitié c'est comme tout, ça se construit petit à petit. Faut pas avoir peur d'aller vers les autres, même si c'est pas facile au début.",
      "Je sais que c'est dur de trouver sa place... Moi aussi j'ai eu des moments de solitude. Mais faut pas hésiter à rejoindre des clubs ou des activités, c'est là qu'on rencontre les meilleurs potes !"
    ],
    
    avenir: [
      "L'orientation c'est tout un délire... Perso je change d'idée tous les deux jours 😅 Mais mon prof principal m'a dit que c'était normal à notre âge.",
      "Trop ça ! Je stresse aussi pour l'avenir, mais j'essaie de me dire que rien n'est définitif. Y a plein de gens qui changent de voie et qui réussissent !",
      `Moi je pense faire quelque chose en rapport avec ${currentPersona.interests[0]}, mais j'hésite encore. Et toi, tu as des passions qui pourraient devenir un métier ?`,
      "C'est normal d'avoir peur pour son avenir, on est tous dans le même bateau ! L'important c'est d'avancer à son rythme et de faire ce qu'on aime."
    ],
    
    default: [
      "Hey ! Ça fait du bien de pouvoir parler avec d'autres qui comprennent ce qu'on vit. Vous aussi vous trouvez que c'est intense parfois le lycée ?",
      "C'est cool d'avoir un espace pour parler librement comme ça. Des fois on a l'impression d'être seul(e) avec nos problèmes, mais en fait on vit tous un peu les mêmes choses.",
      `Moi quand ça va pas trop, ${currentPersona.interests[0]} ça m'aide à me changer les idées. Tu as des trucs comme ça qui te font du bien ?`,
      "C'est pas toujours facile d'être ado, mais c'est rassurant de voir qu'on n'est pas seul(e) à vivre ça !"
    ]
  };

  // Sélectionner une réponse aléatoire appropriée
  let selectedResponses;
  if (lowercaseContent.includes('stress') || lowercaseContent.includes('peur') || lowercaseContent.includes('angoisse')) {
    selectedResponses = responses.stress;
  } else if (lowercaseContent.includes('parents') || lowercaseContent.includes('famille')) {
    selectedResponses = responses.famille;
  } else if (lowercaseContent.includes('ami') || lowercaseContent.includes('pote') || lowercaseContent.includes('seul')) {
    selectedResponses = responses.amitie;
  } else if (lowercaseContent.includes('avenir') || lowercaseContent.includes('métier') || lowercaseContent.includes('orientation')) {
    selectedResponses = responses.avenir;
  } else {
    selectedResponses = responses.default;
  }

  const randomIndex = Math.floor(Math.random() * selectedResponses.length);
  return { content: selectedResponses[randomIndex] };
};

export const generateReply = async (categoryId, messages) => {
  if (!messages || messages.length === 0) return null;

  const lastMessage = messages[messages.length - 1];
  console.log('Génération de réponse élève pour la catégorie:', categoryId);
  
  // Choisir une personnalité d'élève aléatoire
  const personaId = Math.floor(Math.random() * Object.keys(STUDENT_PERSONAS).length) + 1;
  const currentPersona = STUDENT_PERSONAS[personaId];
  
  const prompt = generatePrompt(categoryId, messages, currentPersona);
  console.log('Contexte de la conversation:', prompt);

  const response = await simulateStudentResponse(prompt, lastMessage.content, currentPersona);
  
  return {
    id: Date.now(),
    username: currentPersona.name,
    content: response.content,
    timestamp: new Date().getTime(),
    isAI: true
  };
};

export const generateNewDiscussion = async (categoryId) => {
  const category = getCategoryById(categoryId);
  const personaId = Math.floor(Math.random() * Object.keys(STUDENT_PERSONAS).length) + 1;
  const currentPersona = STUDENT_PERSONAS[personaId];

  const startingMessages = {
    1: "Salut tout le monde ! Je vois que vous parlez de stress et d'examens... Perso, j'ai trouvé quelques astuces qui m'aident à gérer la pression, ça vous dit qu'on en parle ?",
    2: "Hey ! Les relations avec les parents c'est pas toujours simple... Qui d'autre galère parfois à la maison ?",
    3: "Coucou ! Je me demandais comment vous gérez les amitiés au lycée ? C'est pas toujours facile de trouver sa place...",
    4: "Hello ! Vous aussi vous avez parfois des doutes sur vous-mêmes ? Moi ça m'arrive souvent, mais j'essaie de positiver...",
    5: "Salut la team ! L'orientation c'est un vrai casse-tête pour moi... Je change d'avis tous les deux jours 😅 Et vous ?",
    6: "Coucou ! Je trouve ça cool qu'on puisse parler bien-être et santé mentale ici. C'est important d'en discuter entre nous, non ?"
  };

  return {
    id: Date.now(),
    username: currentPersona.name,
    content: startingMessages[categoryId] || "Hey ! Ça vous dit qu'on discute ?",
    timestamp: new Date().getTime(),
    isAI: true
  };
};

export const checkAndGenerateNewDiscussion = async (categoryId, messages) => {
  if (!messages || messages.length === 0) {
    return generateNewDiscussion(categoryId);
  }
  return null;
}; 