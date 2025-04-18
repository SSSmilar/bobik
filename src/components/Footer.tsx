import { useLanguage } from '../contexts/LanguageContext';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();

  const contacts = {
    ru: {
      phone: '+7 (XXX) XXX-XX-XX',
      email: 'info@example.com',
      address: 'г. Москва, ул. Примерная, д. 1',
      messengers: {
        telegram: 'Telegram',
        vkontakte: 'VKontakte',
        whatsapp: 'WhatsApp'
      }
    },
    en: {
      phone: '+7 (XXX) XXX-XX-XX',
      email: 'info@example.com',
      address: '1 Example St., Moscow',
      messengers: {
        telegram: 'Telegram',
        vkontakte: 'VKontakte',
        whatsapp: 'WhatsApp'
      }
    }
  };

  const currentContacts = contacts[language];

  return (
    <footer className="footer mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              {language === 'ru' ? 'О компании' : 'About Us'}
            </h3>
            <p className="text-text-secondary">
              {language === 'ru'
                ? 'Мы специализируемся на импорте высококачественных дисков из Японии, предлагая широкий выбор моделей для вашего автомобиля.'
                : 'We specialize in importing high-quality wheels from Japan, offering a wide selection of models for your vehicle.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              {language === 'ru' ? 'Навигация' : 'Navigation'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/catalog" className="text-text-secondary hover:text-primary transition-colors">
                  {language === 'ru' ? 'Каталог' : 'Catalog'}
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-text-secondary hover:text-primary transition-colors">
                  {language === 'ru' ? 'Доставка' : 'Delivery'}
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-text-secondary hover:text-primary transition-colors">
                  {language === 'ru' ? 'Отзывы' : 'Reviews'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-text-secondary">
                <Phone className="w-4 h-4 text-primary" />
                <span>{currentContacts.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4 text-primary" />
                <span>{currentContacts.email}</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentContacts.address}</span>
              </li>
            </ul>
          </div>

          {/* Messengers */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              {language === 'ru' ? 'Наши мессенджеры' : 'Our Messengers'}
            </h3>
            <ul className="space-y-2">
              {Object.entries(currentContacts.messengers).map(([key, value]) => (
                <li key={key}>
                  <a href="#" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-text-secondary">
          <p>© {new Date().getFullYear()} Bobik. {language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 