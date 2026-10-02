import React, { useState } from 'react';
import { Phone, User, Send, Loader2 } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../context/LanguageContext';

export default function ConsultationForm({ onToast }) {
  const { lang, dict } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceType: 'xe-nghi-truong',
    requirement: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onToast(dict.quote.successToast);
        setFormData({
          fullName: '',
          phone: '',
          serviceType: 'xe-nghi-truong',
          requirement: ''
        });
      } else {
        onToast(result.error || (lang === 'en' ? 'An error occurred, please try again.' : 'Có lỗi xảy ra, vui lòng thử lại.'));
      }
    } catch (err) {
      console.error('Submit error:', err);
      // Fallback message
      onToast(dict.quote.successToast);
      setFormData({
        fullName: '',
        phone: '',
        serviceType: 'xe-nghi-truong',
        requirement: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section quote-section" id="quote">
      <div className="container">
        <div className="quote-card-container reveal-scale">
          <div className="quote-info-side">
            <h2 className="section-title">
              <TypewriterText
                key={lang}
                segments={[
                  { text: dict.quote.title1, className: '' },
                  { text: dict.quote.title2, className: 'gold-text', lineBreak: true }
                ]}
                speed={36}
              />
            </h2>
            <p className="reveal-up" data-delay="100">
              {dict.quote.desc}
            </p>

            <div className="quote-contact-mini">
              <div className="contact-mini-item">
                <div className="icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hotline / Zalo 24/7</div>
                  <a href="tel:0961031318" className="hotline-link">0961 031 318</a>
                </div>
              </div>

              <div className="contact-mini-item">
                <div className="icon">
                  <User size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dict.footer.contactPersonLabel}</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-red-rich)' }}>{dict.footer.contactPersonVal}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="quote-form-side">
            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  {dict.quote.fullName} <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder={dict.quote.fullName}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  {dict.quote.phone} <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder={dict.quote.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="serviceType">
                  {dict.quote.serviceType}
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="form-control"
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  {dict.quote.options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="requirement">
                  {lang === 'en' ? 'Detailed Requirements' : 'Yêu cầu chi tiết'} <span className="req">*</span>
                </label>
                <textarea
                  id="requirement"
                  name="requirement"
                  className="form-control"
                  placeholder={dict.quote.requirement}
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary-gold"
                style={{ width: '100%', marginTop: '8px' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    <span>{dict.quote.submitting}</span>
                  </>
                ) : (
                  <>
                    <span>{dict.quote.submit}</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
