import React from 'react';
import { Icons } from '../Icons';

const AdminDashboard = ({ 
  systemStatus, 
  documents, 
  uploadFile, 
  uploading, 
  uploadProgress, 
  dragOver,
  fileInputRef,
  onFileSelect,
  onRemoveFile,
  onFileUpload,
  onReloadDocuments,
  onDragOver,
  onDragLeave,
  onDrop,
  formatFileSize
}) => (
  <div style={styles.adminDashboard}>
    <div style={styles.adminCard}>
      <h3 style={styles.cardTitle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Analysis />
          System Status
        </div>
      </h3>
      <div style={styles.statusGrid}>
        <div style={styles.statusItem}>
          <span>Firebase:</span>
          <span style={systemStatus.firebase_initialized ? styles.statusSuccess : styles.statusError}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {systemStatus.firebase_initialized ? <Icons.Check /> : <Icons.Error />}
              {systemStatus.firebase_initialized ? 'Connected' : 'Disconnected'}
            </div>
          </span>
        </div>
        <div style={styles.statusItem}>
          <span>Documents:</span>
          <span style={styles.statusSuccess}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Document />
              {systemStatus.documents_loaded || 0} loaded
            </div>
          </span>
        </div>
        <div style={styles.statusItem}>
          <span>Vector Store:</span>
          <span style={systemStatus.vectorstore_ready ? styles.statusSuccess : styles.statusError}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {systemStatus.vectorstore_ready ? <Icons.Check /> : <Icons.Error />}
              {systemStatus.vectorstore_ready ? 'Ready' : 'Not Ready'}
            </div>
          </span>
        </div>
      </div>
    </div>

    <div style={styles.adminCard}>
      <h3 style={styles.cardTitle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Upload />
          Upload Document
        </div>
      </h3>
      <div 
        style={{...styles.uploadArea, ...(dragOver ? styles.uploadAreaDragOver : {})}}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Icons.FileUpload />
        <p style={styles.uploadText}>Drag & Drop PDF or Click to Browse</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={onFileSelect}
        style={styles.fileInput}
      />

      {uploadFile && (
        <div style={styles.selectedFile}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <Icons.Document />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {uploadFile.name} ({formatFileSize(uploadFile.size)})
            </span>
          </div>
          <button onClick={onRemoveFile} style={styles.removeFileBtn}>
            <Icons.Remove />
          </button>
        </div>
      )}

      <button 
        onClick={onFileUpload}
        disabled={!uploadFile || uploading}
        style={{...styles.uploadBtn, ...(!uploadFile || uploading ? styles.uploadBtnDisabled : {})}}
      >
        {uploading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={styles.loadingSpinner}></div>
            Uploading {uploadProgress}%
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Upload />
            Upload PDF
          </div>
        )}
      </button>

      {uploading && (
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${uploadProgress}%`}}></div>
        </div>
      )}
    </div>

    <div style={styles.adminCard}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Document />
            Documents ({documents.length})
          </div>
        </h3>
        <button onClick={onReloadDocuments} style={styles.reloadBtn}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.Reload />
            <span style={styles.reloadText}>Reload</span>
          </div>
        </button>
      </div>
      <div style={styles.documentsList}>
        {documents.length === 0 ? (
          <p style={styles.noDocuments}>No documents uploaded yet</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} style={styles.documentItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                <Icons.Document />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {doc.name}
                </span>
              </div>
              <span style={styles.docSize}>{formatFileSize(doc.size)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

const styles = {
  adminDashboard: {
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
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #f8fafe 0%, #f0f8ff 100%)',
    borderRadius: '12px',
    fontSize: '14px',
    border: '1px solid #e8f1ff'
  },
  statusSuccess: {
    color: '#28a745',
    fontWeight: '600'
  },
  statusError: {
    color: '#dc3545',
    fontWeight: '600'
  },
  uploadArea: {
    border: '2px dashed #d1e4ff',
    borderRadius: '16px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)'
  },
  uploadAreaDragOver: {
    borderColor: '#2E4AC7',
    background: '#eef2ff'
  },
  uploadText: {
    margin: '16px 0 0 0',
    color: '#718096',
    fontSize: '15px',
    fontWeight: '500'
  },
  fileInput: {
    display: 'none'
  },
  selectedFile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)',
    borderRadius: '12px',
    marginTop: '16px',
    border: '1px solid #d1e4ff',
    gap: '10px'
  },
  removeFileBtn: {
    width: '32px',
    height: '32px',
    border: 'none',
    background: '#fee2e2',
    color: '#dc2626',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    flexShrink: 0
  },
  uploadBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    marginTop: '16px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  uploadBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e8f1ff',
    borderRadius: '4px',
    marginTop: '16px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #FF8C00, #FFA500)',
    transition: 'width 0.3s ease-in-out'
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
  documentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '300px',
    overflowY: 'auto'
  },
  noDocuments: {
    textAlign: 'center',
    color: '#718096',
    padding: '32px',
    fontSize: '15px'
  },
  documentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #f8fafe 0%, #f0f8ff 100%)',
    borderRadius: '12px',
    border: '1px solid #e8f1ff',
    gap: '10px'
  },
  docSize: {
    fontSize: '12px',
    color: '#718096',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  }
};

export default AdminDashboard;