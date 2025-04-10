// Clé pour le stockage des messages dans le sessionStorage
const MESSAGES_STORAGE_KEY = 'messages';

// Structure initiale des messages par groupe
const initialMessages = {
  1: [], // Examens et stress
  2: [], // Isolement
  3: [], // Harcèlement
  4: [], // Relations
  5: [], // Famille
  6: [], // Bien-être
};

// Récupérer tous les messages
const getMessages = () => {
  const storedMessages = sessionStorage.getItem(MESSAGES_STORAGE_KEY);
  if (!storedMessages) {
    console.log('Aucun message trouvé, initialisation avec les messages par défaut');
    sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(initialMessages));
    return initialMessages;
  }
  const messages = JSON.parse(storedMessages);
  console.log('Messages récupérés:', messages);
  return messages;
};

// Récupérer les messages d'un groupe spécifique
const getMessagesByGroup = (groupId) => {
  console.log('Récupération des messages pour le groupe:', groupId);
  const messages = getMessages();
  console.log('Messages récupérés:', messages);
  return messages[groupId] || [];
};

// Ajouter un nouveau message
const addMessage = (groupId, message) => {
  console.log('Ajout d\'un message dans le groupe:', groupId);
  console.log('Message à ajouter:', message);
  
  const messages = getMessages();
  if (!messages[groupId]) {
    messages[groupId] = [];
  }

  const newMessage = {
    ...message,
    id: Date.now(),
    timestamp: new Date().getTime(),
    reactions: [],
    replyTo: message.replyTo || null,
  };

  messages[groupId].push(newMessage);
  sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  console.log('Nouveau état des messages:', messages);
  return newMessage;
};

// Effacer tous les messages (utile pour les tests)
const clearMessages = () => {
  sessionStorage.removeItem(MESSAGES_STORAGE_KEY);
  console.log('Tous les messages ont été effacés');
};

const deleteMessage = (groupId, messageId) => {
  const messages = getMessages();
  if (!messages[groupId]) return false;

  const messageIndex = messages[groupId].findIndex(msg => msg.id === messageId);
  if (messageIndex === -1) return false;

  messages[groupId].splice(messageIndex, 1);
  sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  return true;
};

const addReaction = (groupId, messageId, reaction, username) => {
  const messages = getMessages();
  if (!messages[groupId]) return false;

  const message = messages[groupId].find(msg => msg.id === messageId);
  if (!message) return false;

  // Vérifier si l'utilisateur a déjà réagi avec cet emoji
  const existingReaction = message.reactions.find(
    r => r.username === username && r.emoji === reaction
  );

  if (existingReaction) {
    // Supprimer la réaction si elle existe déjà
    message.reactions = message.reactions.filter(
      r => !(r.username === username && r.emoji === reaction)
    );
  } else {
    // Ajouter la nouvelle réaction
    message.reactions.push({
      username,
      emoji: reaction,
      timestamp: new Date().getTime()
    });
  }

  sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  return true;
};

const updateTypingStatus = (groupId, username, isTyping) => {
  const key = `typing_${groupId}`;
  const typingUsers = JSON.parse(sessionStorage.getItem(key) || '[]');
  
  if (isTyping) {
    if (!typingUsers.includes(username)) {
      typingUsers.push(username);
    }
  } else {
    const index = typingUsers.indexOf(username);
    if (index !== -1) {
      typingUsers.splice(index, 1);
    }
  }
  
  sessionStorage.setItem(key, JSON.stringify(typingUsers));
  return typingUsers;
};

const getTypingUsers = (groupId) => {
  const key = `typing_${groupId}`;
  return JSON.parse(sessionStorage.getItem(key) || '[]');
};

export {
  getMessages,
  getMessagesByGroup,
  addMessage,
  deleteMessage,
  addReaction,
  updateTypingStatus,
  getTypingUsers
}; 