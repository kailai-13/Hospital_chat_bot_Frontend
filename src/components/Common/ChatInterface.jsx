import React from 'react';
import { Icons } from '../Icons';
import FormattedMessage from '../FormattedMessage';
import { QUICK_ACTIONS } from '../../utils/constants';
import { formatTime } from '../../utils/formatters';

const ChatInterface = ({
  messages,
  inputMessage,
  setInputMessage,
  userRole,
  isTyping,
  showQuickActions,
  messageCount,
  userName,
  phoneNumber,
  onSendMessage,
  onQuickAction,
  onEditInfo,
  onShowAdminPanel,
  onSwitchRole,
  isMobile
}) => {
  const handleSendMessage = () => {
    onSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatbotHeader}>
        <div style={styles.headerContent}>
          <div style={styles.hospitalLogo}>
            <div style={styles.logoIconSmall}>
              <Icons.Hospital />
            </div>
            <div style={styles.logoText}>
              <h3 style={styles.headerTitle}>Hospital AI Assistant</h3>
              <p style={styles.headerSubtitle}>24/7 Healthcare Support</p>
            </div>
          </div>
          <div style={styles.headerControls}>
            <div style={styles.userInfo}>
              <span style={styles.userRole}>{userRole}</span>
              {(userRole === 'patient' || userRole === 'visitor') && (
                <div style={{ fontSize: '12px', color: 'white', opacity: 0.9 }}>
                  {userName ? userName : 'Guest'}{phoneNumber ? ` • ${phoneNumber}` : ''}
                </div>
              )}
            </div>
            {(userRole === 'patient' || userRole === 'visitor') && (
              <button 
                style={styles.adminPanelBtn}
                onClick={onEditInfo}
              >
                <Icons.Settings />
                <span>Edit Info</span>
              </button>
            )}
            {userRole === 'admin' && (
              <button 
                style={styles.adminPanelBtn}
                onClick={onShowAdminPanel}
              >
                <Icons.Dashboard />
                <span>Dashboard</span>
              </button>
            )}
            <button 
              style={styles.logoutBtn} 
              onClick={onSwitchRole}
            >
              Switch Role
            </button>
          </div>
        </div>
      </div>

      <div style={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} style={{...styles.message, ...(message.type === 'user' ? styles.messageUser : styles.messageBot)}}>
            <div style={styles.messageContent}>
              {typeof message.content === 'string' ? (
                <FormattedMessage content={message.content} />
              ) : (
                message.content
              )}
            </div>
            <div style={styles.messageTime}>{message.timestamp}</div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{...styles.message, ...styles.messageBot}}>
            <div style={styles.messageContent}>
              <div style={styles.typingIndicator}>
                <span style={styles.typingDot}></span>
                <span style={{...styles.typingDot, animationDelay: '0.2s'}}></span>
                <span style={{...styles.typingDot, animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {showQuickActions && (
        <div style={styles.quickActions}>
          <div style={styles.quickActionsHeader}>
            <h4 style={styles.quickActionsTitle}>Quick Actions:</h4>
            <span style={styles.messageCounter}>Messages: {messageCount}/3</span>
          </div>
          <div style={styles.actionButtons}>
            {QUICK_ACTIONS[userRole]?.map((action, index) => (
              <button 
                key={index} 
                style={styles.actionBtn}
                onClick={() => onQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={styles.chatInput}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.messageInput}
          disabled={isTyping}
          rows={1}
        />
        <button 
          onClick={handleSendMessage} 
          style={{...styles.sendButton, ...(!inputMessage.trim() || isTyping ? styles.sendButtonDisabled : {})}}
          disabled={!inputMessage.trim() || isTyping}
        >
          {isTyping ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={styles.loadingSpinner}></div>
              Sending...
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Send />
              {isMobile ? 'Send' : 'Send'}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#f7fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  chatbotHeader: {
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    color: 'white',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  hospitalLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logoIconSmall: {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0
  },
  logoText: {
    flex: 1
  },
  headerTitle: {
    margin: 0,
    fontSize: '20px'
  },
  headerSubtitle: {
    margin: '5px 0 0 0',
    fontSize: '13px',
    opacity: 0.9
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  userRole: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'capitalize',
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '8px'
  },
  adminPanelBtn: {
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logoutBtn: {
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    color: '#1F3A9E',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)'
  },
  message: {
    maxWidth: '85%',
    padding: '14px 18px',
    borderRadius: '16px',
    animation: 'fadeIn 0.3s ease-in',
    wordWrap: 'break-word'
  },
  messageUser: {
    alignSelf: 'flex-end',
    background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
    color: 'white'
  },
  messageBot: {
    alignSelf: 'flex-start',
    background: 'linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)',
    color: '#1F3A9E',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #d1e4ff'
  },
  messageContent: {
    fontSize: '15px',
    lineHeight: '1.5',
    marginBottom: '6px'
  },
  messageTime: {
    fontSize: '11px',
    opacity: 0.7
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#2E4AC7',
    animation: 'bounce 1.4s infinite ease-in-out'
  },
  quickActions: {
    padding: '20px',
    background: 'linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)',
    borderTop: '1px solid #d1e4ff',
    animation: 'slideUp 0.4s ease-out'
  },
  quickActionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  quickActionsTitle: {
    margin: 0,
    fontSize: '16px',
    color: '#1F3A9E',
    fontWeight: '600'
  },
  messageCounter: {
    fontSize: '13px',
    color: '#718096',
    padding: '6px 12px',
    background: 'rgba(255, 140, 0, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 140, 0, 0.2)'
  },
  actionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  actionBtn: {
    padding: '12px 18px',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 4px rgba(46, 74, 199, 0.3)'
  },
  chatInput: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
    background: 'white',
    borderTop: '1px solid #e8f1ff'
  },
  messageInput: {
    flex: 1,
    padding: '14px 18px',
    border: '2px solid #d1e4ff',
    borderRadius: '16px',
    fontSize: '15px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    maxHeight: '120px',
    transition: 'border-color 0.3s',
    background: 'linear-gradient(135deg, #fafcff 0%, #f8fafe 100%)'
  },
  sendButton: {
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px'
  },
  sendButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  loadingSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

export default ChatInterface;