import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { company } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Contact.css'

const initialForm = { name: '', email: '', company: '', topic: '', message: '' }

export default function Contact() {
  const { t, lang } = useI18n()
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const seo = {
    title: 'Contact',
    description:
      'Talk to Korrente about developing a project, power offtake, corporate decarbonisation, press, or careers. We respond within two business days.'
  }

  const topics = t('contact.topics')

  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = t('contact.errName')
    if (!v.email.trim()) {
      e.email = t('contact.errEmailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      e.email = t('contact.errEmailInvalid')
    }
    if (!v.topic) e.topic = t('contact.errTopic')
    if (!v.message.trim()) {
      e.message = t('contact.errMessageRequired')
    } else if (v.message.trim().length < 10) {
      e.message = t('contact.errMessageShort')
    }
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((tt) => ({ ...tt, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, company: true, topic: true, message: true })
    if (Object.keys(nextErrors).length === 0) {
      // Front-end demo: no backend. Replace with a POST to your endpoint.
      setSubmitted(true)
    } else {
      document.getElementById(`field-${Object.keys(nextErrors)[0]}`)?.focus()
    }
  }

  const fieldClass = (name) => `field ${touched[name] && errors[name] ? 'field--error' : ''}`.trim()

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/contact" />

      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('contact.lead')} />

      <section className="surface-light section">
        <div className="container contact-grid">
          {/* Details */}
          <Reveal className="contact-info">
            <h2 className="h4">{t('contact.infoTitle')}</h2>
            <ul className="contact-info__list" role="list">
              <li>
                <span className="contact-info__icon"><Icon name="mail" size={20} /></span>
                <div>
                  <span className="contact-info__label">{t('contact.labelEmail')}</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><Icon name="phone" size={20} /></span>
                <div>
                  <span className="contact-info__label">{t('contact.labelPhone')}</span>
                  <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>{company.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><Icon name="pin" size={20} /></span>
                <div>
                  <span className="contact-info__label">{t('contact.labelHq')}</span>
                  <address>
                    {company.address.line1}<br />
                    {company.address.line2}<br />
                    {company.address.country}
                  </address>
                </div>
              </li>
              <li>
                <span className="contact-info__icon"><Icon name="clock" size={20} /></span>
                <div>
                  <span className="contact-info__label">{t('contact.labelHours')}</span>
                  <span>{t('contact.hours')}</span>
                </div>
              </li>
            </ul>

            <div className="contact-info__note">
              <Icon name="spark" size={18} />
              <p>{t('contact.note')}</p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="contact-form-wrap" delay={100}>
            {submitted ? (
              <div className="contact-success" role="status" aria-live="polite">
                <span className="contact-success__icon">
                  <Icon name="check" size={30} />
                </span>
                <h2 className="h3">{t('contact.successTitle')}</h2>
                <p className="text-muted">
                  {t('contact.successBody')
                    .replace('{name}', values.name.split(' ')[0] || '')
                    .replace('{email}', values.email)}
                </p>
                <button
                  type="button"
                  className="btn btn--outline btn--md"
                  onClick={() => {
                    setSubmitted(false)
                    setValues(initialForm)
                    setTouched({})
                    setErrors({})
                  }}
                >
                  <span className="btn__label">{t('common.sendAnother')}</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className={fieldClass('name')}>
                    <label htmlFor="field-name">{t('contact.fieldName')} <span aria-hidden="true">*</span></label>
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={Boolean(touched.name && errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                    />
                    {touched.name && errors.name && (
                      <span className="field__error" id="error-name">{errors.name}</span>
                    )}
                  </div>

                  <div className={fieldClass('email')}>
                    <label htmlFor="field-email">{t('contact.fieldEmail')} <span aria-hidden="true">*</span></label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {touched.email && errors.email && (
                      <span className="field__error" id="error-email">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className={fieldClass('company')}>
                    <label htmlFor="field-company">
                      {t('contact.fieldCompany')} <span className="field__optional">{t('common.optional')}</span>
                    </label>
                    <input
                      id="field-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className={fieldClass('topic')}>
                    <label htmlFor="field-topic">{t('contact.fieldTopic')} <span aria-hidden="true">*</span></label>
                    <select
                      id="field-topic"
                      name="topic"
                      value={values.topic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={Boolean(touched.topic && errors.topic)}
                      aria-describedby={errors.topic ? 'error-topic' : undefined}
                    >
                      <option value="" disabled>{t('contact.topicPlaceholder')}</option>
                      {topics.map((topic, i) => (
                        <option key={i} value={topic}>{topic}</option>
                      ))}
                    </select>
                    {touched.topic && errors.topic && (
                      <span className="field__error" id="error-topic">{errors.topic}</span>
                    )}
                  </div>
                </div>

                <div className={fieldClass('message')}>
                  <label htmlFor="field-message">{t('contact.fieldMessage')} <span aria-hidden="true">*</span></label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows="5"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                  />
                  {touched.message && errors.message && (
                    <span className="field__error" id="error-message">{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                  <span className="btn__label">{t('common.sendMessage')}</span>
                  <Icon name="arrowUpRight" size={18} className="btn__icon" />
                </button>
                <p className="contact-form__legal text-muted">{t('contact.legal')}</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
