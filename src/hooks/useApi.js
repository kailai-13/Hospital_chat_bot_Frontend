import { useCallback } from 'react';
import { API_BASE_URL } from '../utils/constants';

export const useApi = () => {
  const sendMessage = useCallback(async (message, userRole, userId, userName, phoneNumber) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message, 
        user_role: userRole,
        user_id: userId,
        user_name: userName || null,
        phone_number: phoneNumber || null
      })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }
    return await response.json();
  }, []);

  const uploadDocument = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload-document`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }
    return await response.json();
  }, []);

  const getDocuments = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/documents`);
    if (!response.ok) throw new Error('Failed to fetch documents');
    return await response.json();
  }, []);

  const reloadDocuments = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/reload-documents`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to reload documents');
    return await response.json();
  }, []);

  const getSystemStatus = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/system/status`);
    if (!response.ok) throw new Error('Failed to fetch status');
    return await response.json();
  }, []);

  // Admin APIs
  const getChatHistory = useCallback(async (role = null) => {
    const url = role && role !== 'all'
      ? `${API_BASE_URL}/admin/chat-history?user_role=${role}`
      : `${API_BASE_URL}/admin/chat-history`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch chat history');
    return await response.json();
  }, []);

  const getAppointments = useCallback(async (status = null) => {
    const url = status
      ? `${API_BASE_URL}/admin/appointments?status=${status}`
      : `${API_BASE_URL}/admin/appointments`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return await response.json();
  }, []);

  const handleAppointment = useCallback(async (appointmentId, action, notes = '') => {
    const response = await fetch(`${API_BASE_URL}/admin/appointments/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointment_id: appointmentId, action, admin_notes: notes })
    });
    if (!response.ok) throw new Error('Failed to update appointment');
    return await response.json();
  }, []);

  const getStatistics = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/admin/statistics`);
    if (!response.ok) throw new Error('Failed to fetch statistics');
    return await response.json();
  }, []);

  const getNotifications = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/admin/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  }, []);

  const markNotificationRead = useCallback(async (notificationId) => {
    const response = await fetch(`${API_BASE_URL}/admin/notifications/mark-read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_id: notificationId })
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return await response.json();
  }, []);

  return {
    sendMessage,
    uploadDocument,
    getDocuments,
    reloadDocuments,
    getSystemStatus,
    getChatHistory,
    getAppointments,
    handleAppointment,
    getStatistics,
    getNotifications,
    markNotificationRead
  };
};