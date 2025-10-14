export const API_BASE_URL = 'http://localhost:8000';

export const USER_ROLES = {
  PATIENT: 'patient',
  VISITOR: 'visitor',
  STAFF: 'staff',
  ADMIN: 'admin'
};

export const QUICK_ACTIONS = {
  patient: ['Find a Doctor', 'Book Appointment', 'Emergency Contact', 'Treatment Information'],
  visitor: ['Visiting Hours', 'Hospital Location', 'Parking Information', 'Amenities'],
  staff: ['Patient Inquiry', 'Department Info', 'Emergency Protocols', 'Hospital Policies'],
  admin: ['System Status', 'Upload Documents', 'Reload System']
};

export const ADMIN_TABS = {
  DASHBOARD: 'dashboard',
  APPOINTMENTS: 'appointments',
  HISTORY: 'history',
  NOTIFICATIONS: 'notifications'
};