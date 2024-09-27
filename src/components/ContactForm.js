import React, { useContext, useState } from 'react';
import ContactContext from '../context/ContactContext';

function ContactForm() {
  const { dispatch } = useContext(ContactContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
    };
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="نام"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">افزودن</button>
    </form>
  );
}

export default ContactForm;
