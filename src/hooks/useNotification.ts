import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning';

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback(({ 
    title, 
    message, 
    type, 
    duration = 3000 
  }: Omit<NotificationData, 'id'> & { duration?: number }) => {
    const id = Date.now().toString();
    const newNotification: NotificationData = { id, title, message, type };
    
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, duration);
  }, []);

  const closeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return { 
    notifications, 
    showNotification, 
    closeNotification 
  };
}; 