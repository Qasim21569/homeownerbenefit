import { useEffect, useRef } from 'react'

type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
  inputId?: string
}

declare global {
  interface Window {
    google?: any
  }
}

function loadPlaces(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) return resolve()
    const existing = document.querySelector("script[data-google-places]") as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Google Maps failed to load')))
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    script.setAttribute('data-google-places', 'true')
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(script)
  })
}

export default function AddressAutocomplete({ value, onChange, placeholder, className, inputId }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

  useEffect(() => {
    if (!apiKey) return
    let autocomplete: any
    loadPlaces(apiKey)
      .then(() => {
        if (!inputRef.current || !window.google) return
        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
          componentRestrictions: { country: ['us'] },
        })
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (place?.formatted_address) {
            onChange(place.formatted_address)
          }
        })
      })
      .catch(() => {})

    return () => {
      // google autocomplete instances are GC'd with input removal; nothing required
    }
  }, [apiKey, onChange])

  return (
    <input
      id={inputId}
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      type="text"
      autoComplete="street-address"
    />
  )
}


