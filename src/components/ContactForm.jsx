import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEnvelope, FaPhone, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
    mathAnswer: '',
    preferredContact: 'email', // Default value
  });
  const [selectedDate, setSelectedDate] = useState(null); // Optional, null by default
  const [selectedTimeRange, setSelectedTimeRange] = useState(''); // Optional, empty by default
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 });

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({ num1, num2, answer: num1 + num2 });
    console.log('Environment Variables:', {
      REACT_APP_EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      REACT_APP_EMAILJS_PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const timeRanges = [
    '8:00 - 12:00',
    '12:00 - 16:00',
    '16:00 - 20:00',
    '20:00 - 00:00',
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: <FaEnvelope className="text-lg" /> },
    { value: 'phone', label: 'Phone Call', icon: <FaPhone className="text-lg" /> },
    { value: 'telegram', label: 'Telegram', icon: <FaTelegramPlane className="text-lg" /> },
    { value: 'whatsapp', label: 'WhatsApp', icon: <FaWhatsapp className="text-lg" /> },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.trim()) {
      newErrors.email = 'Электронная почта обязательна';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат электронной почты';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Некорректный формат номера телефона';
    }
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно';
    if (formData.honeypot) newErrors.honeypot = 'Обнаружен бот';
    if (!formData.mathAnswer || parseInt(formData.mathAnswer) !== mathQuestion.answer) {
      newErrors.mathAnswer = 'Неверный ответ на вопрос. Попробуйте снова.';
    }
    // Removed required validation for preferredContact, date, and timeRange
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.honeypot) {
        console.log('Bot detected via honeypot');
        return;
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      console.log('EmailJS Configuration:', { serviceId, templateId, publicKey });

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not defined. Check your .env file.');
      }

      // Use default values if fields are not selected
      const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ru-RU') : 'не имеет значения';
      const timeRange = selectedTimeRange || 'не имеет значения';

      const enhancedMessage = `${formData.message}\n\nPreferred Contact Method: ${formData.preferredContact}\nPreferred Date: ${formattedDate}\nPreferred Time Range: ${timeRange}`;

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: enhancedMessage,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send email');
      }

      const result = await response.text();
      console.log('Email sent successfully:', result);
      alert('Сообщение успешно отправлено! Мы свяжемся с вами скоро.');
      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '', mathAnswer: '', preferredContact: 'email' });
      setSelectedDate(null);
      setSelectedTimeRange('');
      setErrors({});
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setMathQuestion({ num1, num2, answer: num1 + num2 });
    } catch (error) {
      console.error('Error sending email:', {
        message: error.message,
        status: error.status,
      });
      let errorMessage = 'Произошла ошибка при отправке. Попробуйте снова.';
      if (error.message) {
        if (error.message.includes('Service not found')) {
          errorMessage = 'Ошибка: Неверный Service ID. Пожалуйста, проверьте настройки.';
        } else if (error.message.includes('Template not found')) {
          errorMessage = 'Ошибка: Неверный Template ID. Пожалуйста, проверьте настройки.';
        } else if (error.message.includes('User not found')) {
          errorMessage = 'Ошибка: Неверный Public Key. Пожалуйста, проверьте настройки.';
        } else if (error.message.includes('Rate limit')) {
          errorMessage = 'Ошибка: Превышен лимит отправки. Попробуйте позже.';
        } else if (error.message.includes('recipients address')) {
          errorMessage = 'Ошибка: Адрес получателя не указан в EmailJS. Проверьте настройки шаблона.';
        } else {
          errorMessage = `Ошибка: ${error.message}`;
        }
      }
      alert(errorMessage);
      console.log('Fallback: Saving form data locally due to EmailJS failure:', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
        <p className="text-gray-700 mb-8">
          Заинтересовались помещением? Заполните форму ниже, и мы ответим на все ваши вопросы!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Ваше имя"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="+7 123 456 7890"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предпочитаемый способ связи (опционально)
            </label>
            <div className="sm:flex sm:flex-nowrap sm:divide-x sm:divide-gray-300 sm:border sm:rounded-md sm:overflow-hidden grid grid-cols-2 gap-2">
              {contactMethods.map((method, index) => (
                <label
                  key={method.value}
                  className={`flex items-center justify-center px-4 py-2 border-gray-300 cursor-pointer transition-colors duration-200 sm:flex-1 sm:min-w-0 ${
                    formData.preferredContact === method.value
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white hover:bg-blue-50'
                  } ${
                    index === 0 && 'sm:rounded-l-md'
                  } ${
                    index === contactMethods.length - 1 && 'sm:rounded-r-md'
                  } sm:border-0`}
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method.value}
                    checked={formData.preferredContact === method.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-center space-x-2 sm:space-x-2">
                    {method.icon}
                    <span className="text-sm text-gray-700 hidden sm:inline">{method.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Предпочитаемая дата (опционально)
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
              }}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholderText="Выберите дату"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предпочитаемый временной диапазон (опционально)
            </label>
            <div className="sm:flex sm:flex-nowrap sm:divide-x sm:divide-gray-300 sm:border sm:rounded-md sm:overflow-hidden flex flex-wrap">
              {timeRanges.map((range, index) => (
                <label
                  key={range}
                  className={`flex items-center justify-center px-4 py-2 border-gray-300 cursor-pointer transition-colors duration-200 ${
                    selectedTimeRange === range
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white hover:bg-blue-50'
                  } ${
                    index === 0 && 'sm:rounded-l-md'
                  } ${
                    index === timeRanges.length - 1 && 'sm:rounded-r-md'
                  } sm:border-0 flex-1 text-center sm:min-w-0 min-w-[150px]`}
                >
                  <input
                    type="radio"
                    name="timeRange"
                    value={range}
                    checked={selectedTimeRange === range}
                    onChange={(e) => {
                      setSelectedTimeRange(e.target.value);
                      if (errors.timeRange) setErrors((prev) => ({ ...prev, timeRange: '' }));
                    }}
                    className="sr-only"
                  />
                  <span className="text-sm text-gray-700">{range}</span>
                </label>
              ))}
            </div>
            {errors.timeRange && <p className="mt-2 text-sm text-red-600">{errors.timeRange}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Расскажите, что вас интересует..."
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <div className="hidden">
            <label htmlFor="honeypot">Оставьте это поле пустым</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="mathAnswer" className="block text-sm font-medium text-gray-700">
              Сколько будет {mathQuestion.num1} + {mathQuestion.num2}?
            </label>
            <input
              type="number"
              id="mathAnswer"
              name="mathAnswer"
              value={formData.mathAnswer}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.mathAnswer ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Введите ответ"
            />
            {errors.mathAnswer && <p className="mt-1 text-sm text-red-600">{errors.mathAnswer}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;