import React, { useState, useEffect, useRef, useCallback } from "react";

const APIBASEURL = "https://hospital-chat-bot-backend.onrender.com";

// Icon Components
const Icons = {
  Hospital: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  HospitalLarge: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 7v10M7 12h10" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M12 11v6M9 14l3-3 3 3" />
    </svg>
  ),
  Document: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Error: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  ),
  Reload: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M1 4v6h6M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  ),
  StatusDot: ({ status }) => (
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: status === "success" ? "#28a745" : status === "error" ? "#dc3545" : status === "warning" ? "#ffc107" : "#6c757d", position: "relative" }}>
      <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: `2px solid ${status === "success" ? "#28a745" : status === "error" ? "#dc3545" : status === "warning" ? "#ffc107" : "#6c757d"}`, position: "absolute", top: "-4px", left: "-4px", opacity: "0.3" }}></div>
    </div>
  ),
  FileUpload: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
  Remove: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Analysis: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M7 12l4-4 4 4 4-4" />
    </svg>
  ),
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userRole, setUserRole] = useState("patient");
  const [isTyping, setIsTyping] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadIntervalRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (messageCount >= 3) {
      setShowQuickActions(false);
    }
  }, [messageCount]);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      const response = await fetch(`${APIBASEURL}/`);
      if (response.ok) {
        setConnectionStatus("connected");
        setMessages([{
          type: "bot",
          content: "Welcome! I'm your Hospital AI Assistant. How can I help you today?",
          timestamp: new Date().toLocaleTimeString()
        }]);
      } else {
        setConnectionStatus("error");
      }
    } catch (error) {
      setConnectionStatus("error");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg = {
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessageCount((prev) => prev + 1);

    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(`${APIBASEURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: currentInput, user_role: userRole })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const botMsg = {
        type: "bot",
        content: data.response || "No response generated.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${APIBASEURL}/admin/documents`);
      if (!response.ok) throw new Error("Failed to load documents");
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Failed to load documents", error);
    }
  };

  const loadSystemStatus = async () => {
    try {
      const response = await fetch(`${APIBASEURL}/system/status`);
      if (!response.ok) throw new Error("Failed to load status");
      const status = await response.json();
      setSystemStatus(status);
    } catch (error) {
      console.error("Failed to load system status", error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setUploadFile(file);
      } else {
        alert("Please select a PDF file only.");
        e.target.value = "";
      }
    }
  };

  const removeSelectedFile = () => {
    setUploadFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile || uploading) return;

    setUploading(true);
    setUploadProgress(0);

    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }

    uploadIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          if (uploadIntervalRef.current) {
            clearInterval(uploadIntervalRef.current);
          }
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch(`${APIBASEURL}/admin/upload-document`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Upload failed");
      }

      setUploadProgress(100);
      setMessages((prev) => [...prev, {
        type: "bot",
        content: `✅ Document ${uploadFile.name} uploaded successfully!`,
        timestamp: new Date().toLocaleTimeString()
      }]);

      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadDocuments();
      await loadSystemStatus();
    } catch (error) {
      setMessages((prev) => [...prev, {
        type: "bot",
        content: `❌ Upload failed: ${error.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const handleReloadDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APIBASEURL}/admin/reload-documents`, {
        method: "POST"
      });

      if (!response.ok) throw new Error("Failed to reload");

      setMessages((prev) => [...prev, {
        type: "bot",
        content: "✅ Documents reloaded successfully!",
        timestamp: new Date().toLocaleTimeString()
      }]);

      await loadDocuments();
      await loadSystemStatus();
    } catch (error) {
      setMessages((prev) => [...prev, {
        type: "bot",
        content: `❌ Reload failed: ${error.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = {
    patient: ["Find a Doctor", "Book Appointment", "Emergency Contact", "Treatment Information"],
    visitor: ["Visiting Hours", "Hospital Location", "Parking Information", "Amenities"],
    staff: ["Patient Inquiry", "Department Info", "Emergency Protocols", "Hospital Policies"],
    admin: ["System Status", "Upload Documents", "Reload System"]
  };

  const handleQuickAction = (action) => {
    if (action === "Upload Documents" || action === "System Status") {
      setShowAdminModal(true);
      if (action === "System Status") {
        loadSystemStatus();
        loadDocuments();
      }
      return;
    }
    if (action === "Reload System") {
      handleReloadDocuments();
      return;
    }
    setInputMessage(action);
    setMessageCount((prev) => prev + 1);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Icons.User />
                <span style={styles.userName}>User</span>
              </div>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                style={styles.roleSelector}
              >
                <option value="patient">Patient</option>
                <option value="visitor">Visitor</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {userRole === "admin" && (
              <button
                style={styles.adminPanelBtn}
                onClick={() => {
                  setShowAdminModal(true);
                  loadDocuments();
                  loadSystemStatus();
                }}
              >
                <Icons.Dashboard />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={styles.chatMessages}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.type === "user" ? styles.messageUser : styles.messageBot)
            }}
          >
            <div style={styles.messageContent}>{message.content}</div>
            <div style={styles.messageTime}>{message.timestamp}</div>
          </div>
        ))}

        {isTyping && (
          <div style={{ ...styles.message, ...styles.messageBot }}>
            <div style={styles.messageContent}>
              <div style={styles.typingIndicator}>
                <span style={styles.typingDot}></span>
                <span style={{ ...styles.typingDot, animationDelay: "0.2s" }}></span>
                <span style={{ ...styles.typingDot, animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showQuickActions && (
        <div style={styles.quickActions}>
          <div style={styles.quickActionsHeader}>
            <h4 style={styles.quickActionsTitle}>Quick Actions</h4>
            <span style={styles.messageCounter}>Messages: {messageCount}/3</span>
          </div>
          <div style={styles.actionButtons}>
            {quickActions[userRole]?.map((action, index) => (
              <button
                key={index}
                style={styles.actionBtn}
                onClick={() => handleQuickAction(action)}
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
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          style={styles.messageInput}
          disabled={isTyping}
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          style={{
            ...styles.sendButton,
            ...(!inputMessage.trim() || isTyping ? styles.sendButtonDisabled : {})
          }}
          disabled={!inputMessage.trim() || isTyping}
        >
          {isTyping ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={styles.loadingSpinner}></div>
              Sending...
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icons.Send />
              Send
            </div>
          )}
        </button>
      </div>

      {showAdminModal && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAdminModal(false);
            }
          }}
        >
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icons.Settings />
                <h2 style={styles.modalTitle}>Admin Dashboard</h2>
              </div>
              <button
                style={styles.modalClose}
                onClick={() => setShowAdminModal(false)}
              >
                <Icons.Close />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.adminCard}>
                <h3 style={styles.cardTitle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icons.Analysis />
                    System Status
                  </div>
                </h3>
                <div style={styles.statusGrid}>
                  <div style={styles.statusItem}>
                    <span>Firebase</span>
                    <span style={systemStatus.firebase_initialized ? styles.statusSuccess : styles.statusError}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {systemStatus.firebase_initialized ? <Icons.Check /> : <Icons.Error />}
                        {systemStatus.firebase_initialized ? "Connected" : "Disconnected"}
                      </div>
                    </span>
                  </div>
                  <div style={styles.statusItem}>
                    <span>Documents</span>
                    <span style={styles.statusSuccess}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Icons.Document />
                        {systemStatus.documents_loaded || 0} loaded
                      </div>
                    </span>
                  </div>
                  <div style={styles.statusItem}>
                    <span>Vector Store</span>
                    <span style={systemStatus.vectorstore_ready ? styles.statusSuccess : styles.statusError}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {systemStatus.vectorstore_ready ? <Icons.Check /> : <Icons.Error />}
                        {systemStatus.vectorstore_ready ? "Ready" : "Not Ready"}
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.adminCard}>
                <h3 style={styles.cardTitle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icons.Upload />
                    Upload Document
                  </div>
                </h3>
                <div
                  style={{
                    ...styles.uploadArea,
                    ...(dragOver ? styles.uploadAreaDragOver : {})
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const files = e.dataTransfer.files;
                    if (files.length > 0 && files[0].type === "application/pdf") {
                      setUploadFile(files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icons.FileUpload />
                  <p style={styles.uploadText}>Drag & Drop PDF or Click to Browse</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  style={styles.fileInput}
                />
                {uploadFile && (
                  <div style={styles.selectedFile}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icons.Document />
                      <span>{uploadFile.name} ({formatFileSize(uploadFile.size)})</span>
                    </div>
                    <button
                      onClick={removeSelectedFile}
                      style={styles.removeFileBtn}
                    >
                      <Icons.Remove />
                    </button>
                  </div>
                )}
                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || uploading}
                  style={{
                    ...styles.uploadBtn,
                    ...(!uploadFile || uploading ? styles.uploadBtnDisabled : {})
                  }}
                >
                  {uploading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={styles.loadingSpinner}></div>
                      Uploading {uploadProgress}%
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icons.Upload />
                      Upload PDF
                    </div>
                  )}
                </button>
                {uploading && (
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${uploadProgress}%`
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <div style={styles.adminCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icons.Document />
                      Documents ({documents.length})
                    </div>
                  </h3>
                  <button
                    onClick={handleReloadDocuments}
                    style={styles.reloadBtn}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icons.Reload />
                      Reload
                    </div>
                  </button>
                </div>
                <div style={styles.documentsList}>
                  {documents.length === 0 ? (
                    <p style={styles.noDocuments}>No documents uploaded yet</p>
                  ) : (
                    documents.map((doc, index) => (
                      <div key={index} style={styles.documentItem}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Icons.Document />
                          <span>{doc.name}</span>
                        </div>
                        <span style={styles.docSize}>{formatFileSize(doc.size)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  chatbotContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#f7fafc",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  chatbotHeader: {
    background: "linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)",
    color: "white",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },
  headerTitle: {
    margin: 0,
    fontSize: "20px"
  },
  headerSubtitle: {
    margin: "5px 0 0 0",
    fontSize: "13px",
    opacity: 0.9
  },
  headerControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px"
  },
  userName: {
    fontWeight: "bold",
    fontSize: "14px"
  },
  roleSelector: {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer"
  },
  adminPanelBtn: {
    padding: "10px 16px",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  hospitalLogo: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  logoIconSmall: {
    width: "45px",
    height: "45px",
    background: "linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    flexShrink: 0
  },
  logoText: {
    flex: 1
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)"
  },
  message: {
    maxWidth: "70%",
    padding: "14px 18px",
    borderRadius: "16px",
    animation: "fadeIn 0.3s ease-in",
    wordWrap: "break-word"
  },
  messageUser: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    color: "white"
  },
  messageBot: {
    alignSelf: "flex-start",
    background: "linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)",
    color: "#1F3A9E",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #d1e4ff"
  },
  messageContent: {
    fontSize: "15px",
    lineHeight: 1.5,
    marginBottom: "6px"
  },
  messageTime: {
    fontSize: "11px",
    opacity: 0.7
  },
  typingIndicator: {
    display: "flex",
    gap: "4px",
    alignItems: "center"
  },
  typingDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#2E4AC7",
    animation: "bounce 1.4s infinite ease-in-out"
  },
  quickActions: {
    padding: "20px",
    background: "linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)",
    borderTop: "1px solid #d1e4ff",
    animation: "slideUp 0.4s ease-out"
  },
  quickActionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  quickActionsTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#1F3A9E",
    fontWeight: 600
  },
  messageCounter: {
    fontSize: "13px",
    color: "#718096",
    padding: "6px 12px",
    background: "rgba(255, 140, 0, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 140, 0, 0.2)"
  },
  actionButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  actionBtn: {
    padding: "12px 18px",
    background: "linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 4px rgba(46, 74, 199, 0.3)"
  },
  chatInput: {
    display: "flex",
    gap: "12px",
    padding: "20px",
    background: "white",
    borderTop: "1px solid #e8f1ff"
  },
  messageInput: {
    flex: 1,
    padding: "14px 18px",
    border: "2px solid #d1e4ff",
    borderRadius: "16px",
    fontSize: "15px",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    maxHeight: "120px",
    transition: "border-color 0.3s",
    background: "linear-gradient(135deg, #fafcff 0%, #f8fafe 100%)"
  },
  sendButton: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100px"
  },
  sendButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed"
  },
  loadingSpinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in"
  },
  modalContainer: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    animation: "slideUp 0.3s ease-out"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 30px",
    borderBottom: "1px solid #e2e8f0",
    background: "linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)",
    color: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px"
  },
  modalTitle: {
    margin: 0,
    fontSize: "24px",
    color: "white",
    fontWeight: 600
  },
  modalClose: {
    width: "44px",
    height: "44px",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContent: {
    flex: 1,
    overflowY: "auto",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    background: "linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)"
  },
  adminCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid #e8f1ff"
  },
  cardTitle: {
    margin: "0 0 20px 0",
    fontSize: "18px",
    color: "#1F3A9E",
    fontWeight: 600
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px"
  },
  statusItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #f8fafe 0%, #f0f8ff 100%)",
    borderRadius: "12px",
    fontSize: "14px",
    border: "1px solid #e8f1ff"
  },
  statusSuccess: {
    color: "#28a745",
    fontWeight: 600
  },
  statusError: {
    color: "#dc3545",
    fontWeight: 600
  },
  uploadArea: {
    border: "2px dashed #d1e4ff",
    borderRadius: "16px",
    padding: "48px 24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    background: "linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)"
  },
  uploadAreaDragOver: {
    borderColor: "#2E4AC7",
    background: "#eef2ff"
  },
  uploadText: {
    margin: "16px 0 0 0",
    color: "#718096",
    fontSize: "15px",
    fontWeight: 500
  },
  fileInput: {
    display: "none"
  },
  selectedFile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #e8f1ff 0%, #f0f8ff 100%)",
    borderRadius: "12px",
    marginTop: "16px",
    border: "1px solid #d1e4ff"
  },
  removeFileBtn: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s"
  },
  uploadBtn: {
    width: "100%",
    padding: "14px 20px",
    background: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    marginTop: "16px",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  uploadBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#e8f1ff",
    borderRadius: "4px",
    marginTop: "16px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #FF8C00, #FFA500)",
    transition: "width 0.3s ease-in-out"
  },
  reloadBtn: {
    padding: "10px 16px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s"
  },
  documentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  noDocuments: {
    textAlign: "center",
    color: "#718096",
    padding: "32px",
    fontSize: "15px"
  },
  documentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #f8fafe 0%, #f0f8ff 100%)",
    borderRadius: "12px",
    border: "1px solid #e8f1ff"
  },
  docSize: {
    fontSize: "12px",
    color: "#718096",
    fontWeight: 500
  }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default App;
