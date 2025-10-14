import React from 'react';
import { Icons } from '../Icons';
import { USER_ROLES } from '../../utils/constants';

const RoleSelector = ({ connectionStatus, onRoleSelect }) => {
  const handleRoleSelection = (role) => {
    onRoleSelect(role);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.hospitalLogo}>
          <div style={styles.logoIcon}>
            <Icons.HospitalLarge />
          </div>
          <div style={styles.logoText}>
            <h2 style={styles.logoTitle}>Hospital AI Assistant</h2>
            <p style={styles.logoSubtitle}>Select your role to continue</p>
          </div>
        </div>
        
        <div style={{...styles.connectionStatus, ...styles[connectionStatus]}}>
          <Icons.StatusDot status={
            connectionStatus === 'connected' ? 'success' :
            connectionStatus === 'error' ? 'error' : 'warning'
          } />
          {connectionStatus === 'connecting' && 'Connecting...'}
          {connectionStatus === 'connected' && 'Connected'}
          {connectionStatus === 'error' && 'Connection Error'}
        </div>
        
        <div style={styles.roleButtons}>
          <button 
            style={styles.roleButton}
            onClick={() => handleRoleSelection(USER_ROLES.PATIENT)}
            disabled={connectionStatus === 'error'}
          >
            <div style={styles.roleIcon}>👤</div>
            <div>
              <h3 style={styles.roleTitle}>Patient</h3>
              <p style={styles.roleDesc}>Book appointments, view treatments</p>
            </div>
          </button>

          <button 
            style={styles.roleButton}
            onClick={() => handleRoleSelection(USER_ROLES.VISITOR)}
            disabled={connectionStatus === 'error'}
          >
            <div style={styles.roleIcon}>🚶</div>
            <div>
              <h3 style={styles.roleTitle}>Visitor</h3>
              <p style={styles.roleDesc}>Visiting hours, directions</p>
            </div>
          </button>

          <button 
            style={styles.roleButton}
            onClick={() => handleRoleSelection(USER_ROLES.STAFF)}
            disabled={connectionStatus === 'error'}
          >
            <div style={styles.roleIcon}>👨‍⚕️</div>
            <div>
              <h3 style={styles.roleTitle}>Staff</h3>
              <p style={styles.roleDesc}>Patient inquiries, protocols</p>
            </div>
          </button>

          <button 
            style={styles.roleButton}
            onClick={() => handleRoleSelection(USER_ROLES.ADMIN)}
            disabled={connectionStatus === 'error'}
          >
            <div style={styles.roleIcon}>⚙️</div>
            <div>
              <h3 style={styles.roleTitle}>Admin</h3>
              <p style={styles.roleDesc}>Manage documents, system</p>
            </div>
          </button>
        </div>
        
        {connectionStatus === 'error' && (
          <div style={styles.connectionError}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Error />
              Cannot connect to server. Please ensure backend is running.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    padding: '20px'
  },
  loginCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  hospitalLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px'
  },
  logoIcon: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  logoText: {
    flex: 1
  },
  logoTitle: {
    margin: 0,
    fontSize: '24px',
    color: '#2d3748'
  },
  logoSubtitle: {
    margin: '5px 0 0 0',
    color: '#718096',
    fontSize: '14px'
  },
  connectionStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: '500'
  },
  connecting: {
    background: '#fef3c7',
    color: '#92400e'
  },
  connected: {
    background: '#d1fae5',
    color: '#065f46'
  },
  error: {
    background: '#fee2e2',
    color: '#991b1b'
  },
  roleButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px'
  },
  roleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '18px 20px',
    background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)',
    border: '2px solid #e8f1ff',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'left',
    width: '100%',
    fontFamily: 'inherit'
  },
  roleIcon: {
    fontSize: '32px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    borderRadius: '12px',
    flexShrink: 0
  },
  roleTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#2d3748',
    fontWeight: '600'
  },
  roleDesc: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#718096'
  },
  connectionError: {
    marginTop: '15px',
    padding: '12px 16px',
    background: '#fee2e2',
    color: '#991b1b',
    borderRadius: '10px',
    fontSize: '14px'
  }
};

export default RoleSelector;