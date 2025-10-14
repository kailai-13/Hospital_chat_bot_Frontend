import React from 'react';
import { Icons } from '../Icons';

const UserInfoModal = ({ 
  isOpen, 
  onClose, 
  tempUserName, 
  setTempUserName, 
  tempPhoneNumber, 
  setTempPhoneNumber, 
  onSave,
  isMobile 
}) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{
        ...styles.modalContainer,
        width: isMobile ? '95%' : '500px',
        maxWidth: isMobile ? '95%' : '500px'
      }}>
        <div style={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icons.Settings />
            <h2 style={styles.modalTitle}>Your Information</h2>
          </div>
          <button 
            style={styles.modalClose}
            onClick={onClose}
          >
            <Icons.Close />
          </button>
        </div>
        <div style={styles.modalContent}>
          <div style={styles.adminCard}>
            <h3 style={styles.cardTitle}>Please provide your details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#1F3A9E', fontWeight: '600' }}>Full Name</label>
                <input 
                  type="text"
                  value={tempUserName}
                  onChange={(e) => setTempUserName(e.target.value)}
                  placeholder="e.g., John Doe"
                  style={{ padding: '12px 14px', border: '1px solid #d1e4ff', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#1F3A9E', fontWeight: '600' }}>Phone Number</label>
                <input 
                  type="tel"
                  value={tempPhoneNumber}
                  onChange={(e) => setTempPhoneNumber(e.target.value)}
                  placeholder="e.g., +91 98765 43210"
                  style={{ padding: '12px 14px', border: '1px solid #d1e4ff', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button 
                style={{...styles.uploadBtn, background: '#e2e8f0', color: '#1f2937'}} 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                style={styles.uploadBtn}
                onClick={handleSave}
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in'
  },
  modalContainer: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)',
    borderRadius: '20px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.3s ease-out'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px',
    borderBottom: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)',
    color: 'white',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px'
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    color: 'white',
    fontWeight: '600'
  },
  modalClose: {
    width: '44px',
    height: '44px',
    border: 'none',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '20px',
    color: 'white',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)'
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
  uploadBtn: {
    width: 'auto',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }
};

export default UserInfoModal;