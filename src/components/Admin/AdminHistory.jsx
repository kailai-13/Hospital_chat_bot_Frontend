import React, { useEffect } from 'react';
import { formatDateTime } from '../../utils/formatters';

const AdminHistory = ({
  chatHistory,
  historyFilter,
  onHistoryFilterChange,
  onLoadChatHistory
}) => {
  useEffect(() => {
    onLoadChatHistory();
  }, [historyFilter]);

  return (
    <div style={styles.adminSection}>
      <div style={styles.adminCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Chat History</h3>
          <select 
            value={historyFilter}
            onChange={(e) => onHistoryFilterChange(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Roles</option>
            <option value="patient">Patients</option>
            <option value="visitor">Visitors</option>
            <option value="staff">Staff</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <div style={styles.historyList}>
          {chatHistory.length === 0 ? (
            <p style={styles.noData}>No chat history available</p>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} style={styles.historyCard}>
                <div style={styles.historyHeader}>
                  <div style={styles.historyUserInfo}>
                    <strong style={styles.historyUser}>{chat.user_name}</strong>
                    <span style={styles.historyRole}>{chat.user_role}</span>
                    {chat.is_appointment_request && (
                      <span style={styles.appointmentTag}>📅 Appointment</span>
                    )}
                  </div>
                  <span style={styles.historyTime}>{formatDateTime(chat.created_at)}</span>
                </div>
                <div style={styles.historyMessage}>
                  <div style={styles.historyQuestion}><strong>Q:</strong> {chat.message}</div>
                  <div style={styles.historyAnswer}><strong>A:</strong> {chat.response}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  adminSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  adminCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e8f1ff',
    width: '100%',
    boxSizing: 'border-box'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#1F3A9E',
    fontWeight: '600'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  filterSelect: {
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #d1e4ff',
    background: 'white',
    color: '#1F3A9E',
    fontWeight: '600',
    fontSize: '14px'
  },
  historyList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px' 
  },
  historyCard: { 
    border: '1px solid #e8f1ff', 
    borderRadius: '12px', 
    padding: '16px', 
    background: '#fff' 
  },
  historyHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '10px',
    flexWrap: 'wrap'
  },
  historyUserInfo: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    flexWrap: 'wrap'
  },
  historyUser: { 
    color: '#1F3A9E' 
  },
  historyRole: { 
    background: '#eef2ff', 
    color: '#1F3A9E', 
    borderRadius: '8px', 
    padding: '2px 6px', 
    fontSize: '12px', 
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },
  appointmentTag: {
    marginLeft: '8px',
    whiteSpace: 'nowrap'
  },
  historyTime: { 
    fontSize: '12px', 
    color: '#718096',
    whiteSpace: 'nowrap'
  },
  historyMessage: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '6px' 
  },
  historyQuestion: {
    wordBreak: 'break-word'
  },
  historyAnswer: {
    wordBreak: 'break-word'
  },
  noData: { 
    textAlign: 'center', 
    color: '#718096', 
    padding: '32px' 
  }
};

export default AdminHistory;