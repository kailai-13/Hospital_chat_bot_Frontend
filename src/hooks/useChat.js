import { useState, useCallback } from 'react';
import { useApi } from './useApi';
import { formatTime } from '../utils/formatters';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const api = useApi();

  const sendMessage = useCallback(async (message, userRole, userId, userName, phoneNumber) => {
    if (!message.trim() || isTyping) return;

    const userMsg = {
      type: 'user',
      content: message,
      timestamp: formatTime(new Date())
    };
    
    setMessages(prev => [...prev, userMsg]);
    setMessageCount(prev => prev + 1);
    
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await api.sendMessage(message, userRole, userId, userName, phoneNumber);
      const botMsg = {
        type: 'bot',
        content: response.response || 'No response generated.',
        timestamp: formatTime(new Date())
      };
      setMessages(prev => [...prev, botMsg]);
      return response;
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: formatTime(new Date())
      }]);
      throw error;
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, api]);

  const handleQuickAction = useCallback((action, setInputMessage, setMessageCount) => {
    setInputMessage(action);
    setMessageCount(prev => prev + 1);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setMessageCount(0);
    setShowQuickActions(true);
  }, []);

  return {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isTyping,
    setIsTyping,
    messageCount,
    setMessageCount,
    showQuickActions,
    setShowQuickActions,
    sendMessage,
    handleQuickAction,
    resetChat
  };
};