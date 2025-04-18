import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

interface NotificationProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

const Notification = ({ title, message, type, onClose }: NotificationProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/20';
      case 'error':
        return 'border-red-500/20';
      case 'warning':
        return 'border-yellow-500/20';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-4 right-4 w-80 bg-surface border ${getBorderColor()} rounded-lg shadow-lg z-50 overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getIcon()}
              <div>
                <h4 className="text-sm font-medium text-white">{title}</h4>
                <p className="text-sm text-text-secondary mt-1">{message}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-primary/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification; 
 