import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import NotificationsContainer from './NotificationsContainer';
import { useNotification } from '../contexts/NotificationContext';

export const NotificationManager: React.FC = () => {
  const { notifications, closeNotification } = useNotification();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Создаем контейнер при монтировании
    let notificationRoot = document.getElementById('notification-root');
    
    if (!notificationRoot) {
      notificationRoot = document.createElement('div');
      notificationRoot.id = 'notification-root';
      document.body.appendChild(notificationRoot);
    }
    
    setContainer(notificationRoot);
    
    // Удаляем контейнер при размонтировании
    return () => {
      if (notificationRoot && notificationRoot.parentNode) {
        notificationRoot.parentNode.removeChild(notificationRoot);
      }
    };
  }, []);
  
  if (!container) return null;
  
  return createPortal(
    <NotificationsContainer 
      notifications={notifications}
      onClose={closeNotification}
    />,
    container
  );
};

export default NotificationManager; 