import Navbar from '../components/Navbar';
import { Truck, Shield, Headphones, MapPin, Clock, CreditCard } from 'lucide-react';

const Delivery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-16 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-12 text-white">Доставка дисков из Японии</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface p-8 rounded-xl border border-primary/20 hover:border-primary/30 transition-all text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4 text-white">Оригинальные диски</h3>
            <p className="text-text-secondary">
              Мы гарантируем подлинность всех дисков. Прямые поставки с аукционов и магазинов Японии.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-xl border border-primary/20 hover:border-primary/30 transition-all text-center">
            <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4 text-white">Быстрая доставка</h3>
            <p className="text-text-secondary">
              Отлаженная логистика позволяет доставлять диски из Японии в кратчайшие сроки.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-xl border border-primary/20 hover:border-primary/30 transition-all text-center">
            <Headphones className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4 text-white">Поддержка 24/7</h3>
            <p className="text-text-secondary">
              Наши специалисты помогут подобрать диски и ответят на все вопросы по доставке.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-primary/20 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Остались вопросы?</h2>
          <p className="mb-6 text-text-secondary">
            Наши менеджеры готовы проконсультировать вас по подбору дисков и условиям доставки из Японии:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2 p-4 bg-primary/5 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="font-medium text-white">Адрес</h3>
              <p className="text-text-secondary">г. Москва, ул. Примерная, д. 123</p>
            </div>
            
            <div className="flex flex-col space-y-2 p-4 bg-primary/5 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-medium text-white">Время работы</h3>
              <p className="text-text-secondary">Пн-Пт: 10:00 - 20:00<br/>Сб: 11:00 - 18:00</p>
            </div>
            
            <div className="flex flex-col space-y-2 p-4 bg-primary/5 rounded-lg">
              <CreditCard className="w-6 h-6 text-primary" />
              <h3 className="font-medium text-white">Оплата</h3>
              <p className="text-text-secondary">Безналичный расчет<br/>Карты Visa, MasterCard</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="bg-surface border border-primary/20 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Процесс доставки</h2>
            <div className="space-y-4 text-text-secondary">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">1</div>
                <p>Подбор и заказ дисков на японских аукционах или в магазинах</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">2</div>
                <p>Проверка состояния дисков нашими специалистами в Японии</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">3</div>
                <p>Отправка морским транспортом (15-20 дней)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">4</div>
                <p>Таможенное оформление (включено в стоимость)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">5</div>
                <p>Доставка до вашего города</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-primary/20 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Наши гарантии</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary">
              <li className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Гарантия подлинности дисков из Японии</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Предоставление фотографий дисков перед отправкой</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Страховка груза на всём пути следования</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Помощь в подборе дисков под ваш автомобиль</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Возврат средств при обнаружении дефектов</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface border border-primary/20 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Стоимость доставки</h2>
            <div className="space-y-4 text-text-secondary">
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-primary mr-3"></span>
                <span>Бесплатная доставка при заказе от 50 000 ₽</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-primary mr-3"></span>
                <span>Стоимость доставки рассчитывается индивидуально в зависимости от города</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-primary mr-3"></span>
                <span>Возможность объединения нескольких заказов для экономии на доставке</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-primary mr-3"></span>
                <span>Специальные условия для оптовых заказов</span>
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                <p className="font-medium text-white mb-2">Важная информация</p>
                <p>Уточняйте актуальные сроки и стоимость доставки у наших менеджеров, так как они могут меняться в зависимости от логистической ситуации.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery; 