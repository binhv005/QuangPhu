import React from 'react';
import ConsultationForm from '../components/ConsultationForm';
import ContactMap from '../components/ContactMap';

export default function ContactPage({ onToast, onPhoneClick }) {
  return (
    <div className="contact-page subpage-content">
      <ConsultationForm onToast={onToast} />

      <div className="section-divider" />

      <ContactMap onPhoneClick={onPhoneClick} />
    </div>
  );
}
