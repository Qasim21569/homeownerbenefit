import { useMemo, useState } from 'react'
import { schema } from './schema'
import type { FieldDefinition, FormValues, ValidationError } from './types'
import AddressAutocomplete from './AddressAutocomplete'

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
    const commonClass = `w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
        return (
          <div>
            <label className="block text-sm mb-1" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            {field.id === 'street' ? (
              <AddressAutocomplete
                inputId={field.id}
                value={(values[field.id] as string) || ''}
                onChange={(v) => setValue(field.id, v)}
                placeholder={field.placeholder}
                className={commonClass}
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type === 'number' ? 'text' : field.type}
                inputMode={field.type === 'number' ? 'numeric' : undefined}
                placeholder={field.placeholder}
                className={commonClass}
                value={(values[field.id] as string) || ''}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        )
      case 'select':
        return (
          <div>
            <label className="block text-sm mb-1" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            <select
              id={field.id}
              name={field.id}
              className={commonClass}
              value={(values[field.id] as string) || ''}
              onChange={(e) => setValue(field.id, e.target.value)}
            >
              <option value="">Select...</option>
              {field.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        )
      case 'radio':
        return (
          <div>
            <label className="block text-sm mb-3 font-medium">{field.label}{field.required ? ' *' : ''}</label>
            <div className="grid grid-cols-1 gap-2">
              {field.options?.map((option, idx) => (
                <label key={option.value} className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <div className="text-lg font-bold text-gray-500">{idx + 1}</div>
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={values[field.id] === option.value}
                    onChange={(e) => setValue(field.id, e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="flex-1">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        )
      case 'checkbox':
        return (
          <div className="flex items-start gap-2">
            <input
              id={field.id}
              name={field.id}
              type="checkbox"
              checked={Boolean(values[field.id])}
              onChange={(e) => setValue(field.id, e.target.checked)}
              className={`mt-1 ${error ? 'outline outline-1 outline-red-500' : ''}`}
            />
            <label className="text-sm" htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</label>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-green-600 rounded" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-sm text-gray-600 mt-1">Step {stepIndex + 1} of {schema.steps.length}</div>
        </div>
        <h1 className="text-2xl font-semibold mb-1">{step.title}</h1>
        {step.description && <p className="text-gray-600 mb-4">{step.description}</p>}
        <div className="grid grid-cols-1 gap-4">
          {step.fields.map((f) => (
            <div key={f.id}>{renderField(f)}</div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button className="px-4 py-2 rounded border" onClick={back} disabled={stepIndex === 0}>Back</button>
          <button className="px-4 py-2 rounded bg-pink-600 text-white" onClick={next}>{isLast ? 'Submit' : 'Next'}</button>
        </div>
      </div>
    </div>
  )
}


