import React, { useEffect } from 'react';
import { Icons } from '../Icons';
import { formatDateTime } from '../../utils/formatters';

const AdminNotifications = ({
  notifications,
  unreadNotifications,
  onMarkNotificationRead,
  onLoadNotifications
}) => {
  useEffect(() => {
    onLoadNotifications();
  }, []);

  return (
    <div style={styles.adminSection}>
      <div style={styles.adminCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Notifications ({notifications.length})</h3>
          <button onClick={onLoadNotifications} style={styles.reloadBtn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Reload />
              <span style={styles.reloadText}>Refresh</span>
            </div>
          </button>
        </div>
        <div style={styles.notificationsList}>
          {notifications.length === 0 ? (
            <p style={styles.noData}>No notifications</p>
          ) : (
            notifications.map((n, index) => (
              <div 
                key={index}
                style={{ 
                  ...styles.notificationCard, 
                  background: n.read ? '#f8f9fa' : '#e8f1ff',
                  cursor: !n.read ? 'pointer' : 'default'
                }}
                onClick={() => !n.read && onMarkNotificationRead(n.id)}
              >
                <div style={styles.notificationHeader}>
                  <h4 style={styles.notificationTitle}>{n.title}</h4>
                  {!n.read && <span style={styles.unreadBadge}>New</span>}
                </div>
                <p style={styles.notificationMessage}>{n.message}</p>
                <div style={styles.notificationTime}>{formatDateTime(n.created_at)}</div>
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
  reloadBtn: {
    padding: '10px 16px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  },
  reloadText: {
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  notificationsList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px' 
  },
  notificationCard: { 
    border: '1px solid #e8f1ff', 
    borderRadius: '12px', 
    padding: '16px', 
    cursor: 'pointer' 
  },
  notificationHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '8px'
  },
  notificationTitle: { 
    margin: 0, 
    color: '#1F3A9E' 
  },
  unreadBadge: { 
    background: '#2E4AC7', 
    color: 'white', 
    borderRadius: '8px', 
    padding: '2px 6px', 
    fontSize: '11px', 
    fontWeight: '700' 
  },
  notificationMessage: { 
    margin: '8px 0', 
    color: '#2d3748',
    wordBreak: 'break-word'
  },
  notificationTime: { 
    fontSize: '12px', 
    color: '#718096' 
  },
  noData: { 
    textAlign: 'center', 
    color: '#718096', 
    padding: '32px' 
  }
};

export default AdminNotifications;