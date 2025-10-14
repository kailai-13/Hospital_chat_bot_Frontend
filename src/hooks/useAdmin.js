import { useState, useCallback } from 'react';
import { useApi } from './useApi';

export const useAdmin = () => {
  const [documents, setDocuments] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = useApi();

  const loadDocuments = useCallback(async () => {
    try {
      const response = await api.getDocuments();
      setDocuments(response.documents || []);
    } catch (error) {
      console.error('Failed to load documents:', error);
      throw error;
    }
  }, [api]);

  const loadSystemStatus = useCallback(async () => {
    try {
      const status = await api.getSystemStatus();
      setSystemStatus(status);
    } catch (error) {
      console.error('Failed to load system status:', error);
      throw error;
    }
  }, [api]);

  const uploadDocument = useCallback(async (file, onProgress) => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const response = await api.uploadDocument(file);
      setUploadProgress(100);
      await loadDocuments();
      await loadSystemStatus();
      return response;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [api, loadDocuments, loadSystemStatus]);

  const reloadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      await api.reloadDocuments();
      await loadDocuments();
      await loadSystemStatus();
    } catch (error) {
      console.error('Reload failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api, loadDocuments, loadSystemStatus]);

  const loadChatHistory = useCallback(async (filter = 'all') => {
    try {
      const role = filter === 'all' ? null : filter;
      const response = await api.getChatHistory(role);
      setChatHistory(response.history || []);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      throw error;
    }
  }, [api]);

  const loadAppointments = useCallback(async (status = 'pending') => {
    try {
      const response = await api.getAppointments(status);
      setAppointments(response.appointments || []);
    } catch (error) {
      console.error('Failed to load appointments:', error);
      throw error;
    }
  }, [api]);

  const loadStatistics = useCallback(async () => {
    try {
      const stats = await api.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to load statistics:', error);
      throw error;
    }
  }, [api]);

  const loadNotifications = useCallback(async () => {
    try {
      const response = await api.getNotifications();
      setNotifications(response.notifications || []);
      const unread = (response.notifications || []).filter(n => !n.read).length;
      setUnreadNotifications(unread);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      throw error;
    }
  }, [api]);

  const handleAppointmentAction = useCallback(async (appointmentId, action, notes = '') => {
    try {
      await api.handleAppointment(appointmentId, action, notes);
      await loadAppointments();
      await loadStatistics();
      await loadNotifications();
    } catch (error) {
      console.error(`Failed to ${action} appointment:`, error);
      throw error;
    }
  }, [api, loadAppointments, loadStatistics, loadNotifications]);

  const markNotificationRead = useCallback(async (notificationId) => {
    try {
      await api.markNotificationRead(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }, [api, loadNotifications]);

  return {
    documents,
    uploadFile,
    setUploadFile,
    uploading,
    uploadProgress,
    setUploadProgress,
    systemStatus,
    chatHistory,
    appointments,
    statistics,
    notifications,
    unreadNotifications,
    dragOver,
    setDragOver,
    loading,
    loadDocuments,
    loadSystemStatus,
    uploadDocument,
    reloadDocuments,
    loadChatHistory,
    loadAppointments,
    loadStatistics,
    loadNotifications,
    handleAppointmentAction,
    markNotificationRead
  };
};