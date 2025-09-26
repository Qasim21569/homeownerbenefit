import { useMemo, useState } from 'react'
import { schema } from './schema'
import type { FieldDefinition, FormValues, ValidationError } from './types'
import AddressAutocomplete from './AddressAutocomplete'
import '../styles/form.css'

function validateField(field: FieldDefinition, value: string | boolean | undefined): string | null {
  if (field.required) {
    if (field.type === 'checkbox') {
      if (!value) return 'This field is required.'
    } else if (!value || String(value).trim() === '') {
      return 'This field is required.'
    }
  }
  if (typeof value === 'string') {
    if (field.minLength && value.trim().length < field.minLength) return `Minimum ${field.minLength} characters.`
    if (field.maxLength && value.trim().length > field.maxLength) return `Maximum ${field.maxLength} characters.`
    if (field.pattern && !field.pattern.test(value.trim())) return 'Please enter a valid value.'
  }
  return null
}

export default function Wizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const step = schema.steps[stepIndex]
  const isLast = stepIndex === schema.steps.length - 1

  const progress = useMemo(() => Math.round(((stepIndex + 1) / schema.steps.length) * 100), [stepIndex])

  function setValue(fieldId: string, value: string | boolean) {
    setValues((v) => ({ ...v, [fieldId]: value }))
  }

  function validateStep(): ValidationError[] {
    const stepErrors: ValidationError[] = []
    step.fields.forEach((field) => {
      const msg = validateField(field, values[field.id] as any)
      if (msg) stepErrors.push({ fieldId: field.id, message: msg })
    })
    const map: Record<string, string> = {}
    stepErrors.forEach((e) => (map[e.fieldId] = e.message))
    setErrors(map)
    return stepErrors
  }

  async function next() {
    const stepErrors = validateStep()
    if (stepErrors.length) return
    if (isLast) {
      // submit to Google Sheets
      try {
        const response = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            source: window.location.href,
            honeypot: '', // honeypot field for spam protection
          }),
        })
        const data = await response.json()
        if (response.ok && data.ok) {
          window.location.href = '/thank-you'
        } else {
          alert('Submission failed: ' + (data.error || 'Please try again'))
        }
      } catch (error) {
        alert('Network error. Please check your connection and try again.')
      }
      return
    }
    setErrors({})
    setStepIndex((i) => i + 1)
  }

  function back() {
    setErrors({})
    setStepIndex((i) => Math.max(0, i - 1))
  }

  function renderField(field: FieldDefinition) {
    const error = errors[field.id]
    const inputClass = `field-input ${error ? 'error' : ''}`
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
        return (
          <div className="field-group">
            <label className="field-label" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            {field.id === 'street' ? (
              <AddressAutocomplete
                inputId={field.id}
                value={(values[field.id] as string) || ''}
                onChange={(v) => setValue(field.id, v)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type === 'number' ? 'text' : field.type}
                inputMode={field.type === 'number' ? 'numeric' : undefined}
                placeholder={field.placeholder}
                className={inputClass}
                value={(values[field.id] as string) || ''}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {error && <p className="field-error">{error}</p>}
          </div>
        )
      case 'select':
        return (
          <div className="field-group">
            <label className="field-label" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            <select
              id={field.id}
              name={field.id}
              className={inputClass}
              value={(values[field.id] as string) || ''}
              onChange={(e) => setValue(field.id, e.target.value)}
            >
              <option value="">Select...</option>
              {field.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {error && <p className="field-error">{error}</p>}
          </div>
        )
      case 'radio':
        return (
          <div className="field-group">
            <label className="field-label">{field.label}{field.required ? ' *' : ''}</label>
            <div className="radio-group">
              {field.options?.map((option, idx) => (
                <label 
                  key={option.value} 
                  className={`radio-option ${values[field.id] === option.value ? 'selected' : ''}`}
                >
                  <div className="radio-number">{idx + 1}</div>
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={values[field.id] === option.value}
                    onChange={(e) => setValue(field.id, e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-label">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="field-error">{error}</p>}
          </div>
        )
      case 'checkbox':
        return (
          <div className="field-group">
            <div className="checkbox-group">
              <input
                id={field.id}
                name={field.id}
                type="checkbox"
                checked={Boolean(values[field.id])}
                onChange={(e) => setValue(field.id, e.target.checked)}
                className="checkbox-input"
              />
              <label className="checkbox-label" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            </div>
            {error && <p className="field-error">{error}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>{step.title}</h1>
          {step.description && <p>{step.description}</p>}
        </div>
        <div className="form-body">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="step-indicator">Step {stepIndex + 1} of {schema.steps.length}</div>
          
          <div>
            {step.fields.map((f) => (
              <div key={f.id}>{renderField(f)}</div>
            ))}
          </div>
          
          <div className="button-group">
            <button 
              className="btn btn-secondary" 
              onClick={back} 
              disabled={stepIndex === 0}
            >
              Back
            </button>
            <button 
              className={`btn ${isLast ? 'btn-submit' : 'btn-primary'}`} 
              onClick={next}
            >
              {isLast ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


