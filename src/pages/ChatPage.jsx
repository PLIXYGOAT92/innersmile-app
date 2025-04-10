import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Typography, Card, Avatar, Popover, Tooltip } from 'antd';
import { SendOutlined, ArrowLeftOutlined, DeleteOutlined, MessageOutlined, SmileOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { getMessagesByGroup, addMessage, deleteMessage, addReaction, updateTypingStatus, getTypingUsers } from '../services/messageService';
import { getCategoryById } from '../config/categories';
import { generateReply } from '../services/aiService';
import EmojiPicker from 'emoji-picker-react';
import MobileLayout from '../components/MobileLayout';

const { Title, Text } = Typography;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 430px;
  margin: 0 auto;
  padding: 0;
  background-color: #f5f5f5;
  position: absolute;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

const StyledCard = styled(Card)`
  flex: 1;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: none;
  width: 100%;
  background: #f5f5f5;
  transition: all 0.3s ease;

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 130px);
  background-color: #f5f5f5;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 60px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
    height: calc(100vh - 180px);
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  position: fixed;
  bottom: 0;
  width: 430px;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 12px;
  }
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.$isCurrentUser ? 'flex-end' : 'flex-start'};
  width: 100%;
  max-width: 100%;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const MessageContent = styled.div`
  background-color: ${props => props.$isAI ? '#FFF0F6' : props.$isCurrentUser ? props.color : '#ffffff'};
  color: ${props => props.$isCurrentUser ? 'white' : 'black'};
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 85%;
  width: fit-content;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  > div {
    text-align: left;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  flex-direction: ${props => props.$isCurrentUser ? 'row-reverse' : 'row'};
  align-items: center;
  margin-bottom: 4px;
  text-align: left;
`;

const MessageTime = styled(Text)`
  font-size: 11px;
  color: ${props => props.$isCurrentUser ? 'rgba(255, 255, 255, 0.8)' : '#999'};
  margin-top: 4px;
  text-align: ${props => props.$isCurrentUser ? 'right' : 'left'};
`;

const CategoryHeader = styled.div`
  padding: 12px 16px;
  background-color: ${props => props.color || '#722ed1'};
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const CategoryTitle = styled(Title)`
  color: white !important;
  margin: 0 !important;
  font-size: 18px !important;
  text-align: center;
  width: 100%;
`;

const CategoryDescription = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  display: block;
  margin-top: 4px;
  text-align: center;
`;

const BackButton = styled(Button)`
  position: absolute;
  left: 16px;
  background-color: transparent;
  border: none;
  color: white;
  padding: 0;
  height: auto;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    left: 12px;
  }
`;

const AIBadge = styled.span`
  background-color: #FF69B4;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 0 40px;
  text-align: center;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const ReplyPreview = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  .close-button {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const MessageActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-5px);
`;

const MessageWrapper = styled.div`
  &:hover ${MessageActions} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReactionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
  transition: all 0.3s ease;
`;

const Reaction = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.9em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

const TypingIndicator = styled.div`
  padding: 8px;
  color: #666;
  font-style: italic;
  font-size: 0.9em;
  animation: fadeIn 0.3s ease;
`;

const SendButton = styled(Button)`
  background-color: ${props => props.color || '#722ed1'};
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.color || '#722ed1'};
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const StyledInput = styled(Input.TextArea)`
  border-radius: 20px;
  padding: 8px 12px;
  resize: none;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:focus {
    border-color: ${props => props.color || '#722ed1'};
    box-shadow: 0 0 0 2px rgba(114, 46, 209, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const ChatPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const messageListRef = useRef(null);
  const currentUsername = sessionStorage.getItem('username');
  const [isAITyping, setIsAITyping] = useState(false);
  
  const numericGroupId = parseInt(groupId, 10);
  const category = getCategoryById(numericGroupId);

  useEffect(() => {
    const loadMessages = async () => {
      if (isNaN(numericGroupId) || numericGroupId < 1 || numericGroupId > 6) {
        navigate('/groups');
        return;
      }

      if (!category) {
        navigate('/groups');
        return;
      }

      if (!currentUsername) {
        navigate('/login');
        return;
      }

      const fetchedMessages = await getMessagesByGroup(numericGroupId);
      setMessages(fetchedMessages);
      scrollToBottom();
    };

    loadMessages();
    
    // Mettre en place la vérification périodique des utilisateurs en train d'écrire
    const typingCheckInterval = setInterval(() => {
      const activeTypers = getTypingUsers(numericGroupId);
      setTypingUsers(activeTypers.filter(user => user !== currentUsername));
    }, 1000);

    return () => {
      clearInterval(typingCheckInterval);
      // Nettoyer le statut de frappe lors du démontage
      updateTypingStatus(numericGroupId, currentUsername, false);
    };
  }, [numericGroupId, category, currentUsername, navigate]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      username: currentUsername,
      content: newMessage,
      replyTo: replyingTo
    };

    const savedMessage = await addMessage(numericGroupId, messageData);
    setMessages(prev => [...prev, savedMessage]);
    setNewMessage('');
    setReplyingTo(null);
    scrollToBottom();

    // Simuler la réponse de l'IA
    setIsAITyping(true);
    const aiResponse = await generateReply(numericGroupId, [...messages, savedMessage]);
    if (aiResponse) {
      const savedAiResponse = await addMessage(numericGroupId, aiResponse);
      setMessages(prev => [...prev, savedAiResponse]);
      scrollToBottom();
    }
    setIsAITyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Gérer l'indicateur "en train d'écrire"
    if (typingTimeout) clearTimeout(typingTimeout);
    
    updateTypingStatus(numericGroupId, currentUsername, true);
    
    const timeout = setTimeout(() => {
      updateTypingStatus(numericGroupId, currentUsername, false);
    }, 2000);
    
    setTypingTimeout(timeout);
  };

  const handleDeleteMessage = async (messageId) => {
    if (await deleteMessage(numericGroupId, messageId)) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const handleReaction = async (messageId, reaction) => {
    if (await addReaction(numericGroupId, messageId, reaction, currentUsername)) {
      const updatedMessages = await getMessagesByGroup(numericGroupId);
      setMessages(updatedMessages);
    }
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const renderReactions = (message) => {
    if (!message.reactions || message.reactions.length === 0) return null;

    const reactionCounts = message.reactions.reduce((acc, reaction) => {
      const key = reaction.emoji;
      if (!acc[key]) acc[key] = { count: 0, users: [] };
      acc[key].count++;
      acc[key].users.push(reaction.username);
      return acc;
    }, {});

    return (
      <ReactionsList>
        {Object.entries(reactionCounts).map(([emoji, data]) => (
          <Tooltip 
            key={emoji} 
            title={data.users.join(', ')}
          >
            <Reaction onClick={() => handleReaction(message.id, emoji)}>
              {emoji} {data.count}
            </Reaction>
          </Tooltip>
        ))}
      </ReactionsList>
    );
  };

  if (!category || !currentUsername) {
    return null;
  }

  return (
    <MobileLayout>
      <CategoryHeader color={category.color}>
        <BackButton 
          icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />} 
          onClick={() => navigate('/groups')}
          size="large"
        />
        <div style={{ width: '100%', padding: '0 40px', textAlign: 'center' }}>
          <CategoryTitle level={4}>
            {category.title}
          </CategoryTitle>
          <CategoryDescription>{category.description}</CategoryDescription>
        </div>
      </CategoryHeader>

      <MessageList ref={messageListRef}>
        {messages.map((msg) => {
          const isCurrentUser = msg.username === currentUsername;
          const replyToMessage = msg.replyTo ? messages.find(m => m.id === msg.replyTo.id) : null;
          
          return (
            <MessageWrapper key={msg.id}>
              <MessageItem $isCurrentUser={isCurrentUser}>
                <MessageContent $isCurrentUser={isCurrentUser} $isAI={msg.isAI} color={category.color}>
                  {replyToMessage && (
                    <ReplyPreview>
                      <small>
                        Réponse à {replyToMessage.username}: {replyToMessage.content.substring(0, 50)}
                        {replyToMessage.content.length > 50 ? '...' : ''}
                      </small>
                    </ReplyPreview>
                  )}
                  <MessageHeader $isCurrentUser={isCurrentUser}>
                    <Avatar 
                      style={{ 
                        backgroundColor: msg.isAI ? '#FF69B4' : isCurrentUser ? 'white' : category.color,
                        marginRight: isCurrentUser ? '0' : '8px',
                        marginLeft: isCurrentUser ? '8px' : '0',
                        color: isCurrentUser ? category.color : 'white'
                      }}
                    >
                      {msg.username[0].toUpperCase()}
                    </Avatar>
                    <Text strong style={{ color: isCurrentUser ? 'white' : category.color }}>
                      {msg.username}
                      {msg.isAI && <AIBadge>AI</AIBadge>}
                    </Text>
                  </MessageHeader>
                  <div style={{ textAlign: 'left' }}>{msg.content}</div>
                  <MessageTime $isCurrentUser={isCurrentUser}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </MessageTime>
                  {renderReactions(msg)}
                  <MessageActions>
                    <Popover 
                      content={
                        <EmojiPicker
                          onEmojiClick={(emojiData) => {
                            handleReaction(msg.id, emojiData.emoji);
                          }}
                        />
                      }
                      trigger="click"
                    >
                      <Button 
                        type="text" 
                        icon={<SmileOutlined />} 
                        size="small"
                      />
                    </Popover>
                    <Button 
                      type="text" 
                      icon={<MessageOutlined />} 
                      size="small"
                      onClick={() => handleReply(msg)}
                    />
                    {isCurrentUser && (
                      <Button 
                        type="text" 
                        icon={<DeleteOutlined />} 
                        size="small"
                        onClick={() => handleDeleteMessage(msg.id)}
                      />
                    )}
                  </MessageActions>
                </MessageContent>
              </MessageItem>
            </MessageWrapper>
          );
        })}
        {isAITyping && (
          <MessageItem $isCurrentUser={false}>
            <MessageContent $isAI color={category.color}>
              <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </MessageContent>
          </MessageItem>
        )}
        {typingUsers.length > 0 && (
          <TypingIndicator>
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'est' : 'sont'} en train d'écrire...
          </TypingIndicator>
        )}
      </MessageList>

      {replyingTo && (
        <ReplyPreview>
          <span>
            Réponse à {replyingTo.username}: {replyingTo.content.substring(0, 50)}
            {replyingTo.content.length > 50 ? '...' : ''}
          </span>
          <span className="close-button" onClick={() => setReplyingTo(null)}>✕</span>
        </ReplyPreview>
      )}

      <InputContainer>
        <StyledInput
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Écrivez votre message..."
          style={{ 
            borderRadius: '20px',
            flex: 1,
            height: '36px'
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          style={{ 
            borderRadius: '20px', 
            backgroundColor: category.color, 
            borderColor: category.color,
            padding: '0 20px',
            height: '36px',
            flexShrink: 0
          }}
        >
          Envoyer
        </Button>
      </InputContainer>
    </MobileLayout>
  );
};

// Ajoutez ces styles pour l'animation des points de chargement
const GlobalStyle = createGlobalStyle`
  .typing-dot {
    width: 8px;
    height: 8px;
    background: #FF69B4;
    border-radius: 50%;
    animation: typing 1s infinite ease-in-out;
  }

  .typing-dot:nth-child(1) { animation-delay: 0.2s; }
  .typing-dot:nth-child(2) { animation-delay: 0.3s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

export default ChatPage; 