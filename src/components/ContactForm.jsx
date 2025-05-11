import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
    mathAnswer: '',
  });
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
            message: formData.message,
            // Removed to_email; EmailJS will use the recipient set in the template
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
      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '', mathAnswer: '' });
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
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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