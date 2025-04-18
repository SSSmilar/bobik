import React from 'react';
import Notification from './Notification';

type NotificationType = 'success' | 'error' | 'warning';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

interface NotificationsContainerProps {
  notifications: NotificationData[];
  onClose: (id: string) => void;
}

const NotificationsContainer: React.FC<NotificationsContainerProps> = ({ 
  notifications, 
  onClose 
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-reverse space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type as 'success' | 'error' | 'warning'}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsContainer; 