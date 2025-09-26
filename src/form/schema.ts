import type { FormSchema } from './types'

export const schema: FormSchema = {
  steps: [
    {
      id: 'zip',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        {
          id: 'zip',
          label: 'Check If Your Zip Code Is Supported:',
          type: 'number',
          placeholder: '90210',
          required: true,
          pattern: /^\d{5}$/,
          maxLength: 5,
        },
      ],
    },
    {
      id: 'project-type',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        {
          id: 'project_type',
          label: 'Choose which applies to you',
          type: 'radio',
          required: true,
          options: [
            { label: 'Repair Roof', value: 'repair' },
            { label: 'Replace Roof', value: 'replace' },
          ],
        },
      ],
    },
    {
      id: 'roof-material',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        {
          id: 'roof_material',
          label: 'What is your current roof material?',
          type: 'radio',
          required: true,
          options: [
            { label: 'Asphalt Shingle', value: 'asphalt' },
            { label: 'Metal', value: 'metal' },
            { label: 'Aluminum', value: 'aluminum' },
            { label: 'Tile', value: 'tile' },
            { label: 'Flat', value: 'flat' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      id: 'address',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        { id: 'street', label: 'Street Address:', type: 'text', required: true, minLength: 3, placeholder: '123 Main St' },
      ],
    },
    {
      id: 'email',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        { id: 'email', label: 'Email Address:', type: 'email', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, placeholder: 'john@example.com' },
      ],
    },
    {
      id: 'name',
      title: 'All Americans Can Easily Get Their Roof Replaced!',
      description: 'Fill out the survey below, it only takes 30 seconds.',
      fields: [
        { id: 'firstName', label: 'First Name:', type: 'text', required: true, minLength: 2, placeholder: 'John' },
        { id: 'lastName', label: 'Last Name:', type: 'text', required: true, minLength: 2, placeholder: 'Doe' },
        { id: 'phone', label: 'Phone Number:', type: 'tel', required: true, pattern: /^\d{10}$/, placeholder: '5551234567' },
      ],
    },
    {
      id: 'submit',
      title: 'Almost Done!',
      description: 'By clicking submit, you agree to be contacted for a free quote.',
      fields: [
        { id: 'tcpa', label: 'I agree to receive calls, texts, and emails about my roofing project and understand these may be automated.', type: 'checkbox', required: true },
      ],
    },
  ],
}


