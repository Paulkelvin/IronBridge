'use client'

import { FieldError, Input, Label } from "@/components/ui/field"
import type { QuoteRequestInput } from "@/lib/validations"
import { importLibrary, setOptions } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from "react"
import type { FieldErrors, Path, UseFormRegister, UseFormSetValue } from "react-hook-form"

type Prefix = 'pickup' | 'delivery'

function fieldName(prefix: Prefix, suffix: 'Street' | 'Unit' | 'City' | 'State' | 'Zip') {
  return `${prefix}${suffix}` as Path<QuoteRequestInput>
}

function getComponent(components: google.maps.GeocoderAddressComponent[], type: string, useShort = false) {
  const match = components.find((c) => c.types.includes(type))
  if (!match) return ''
  return useShort ? match.short_name : match.long_name
}

export default function AddressFields({
  prefix,
  label,
  register,
  setValue,
  errors,
}: {
  prefix: Prefix
  label: string
  register: UseFormRegister<QuoteRequestInput>
  setValue: UseFormSetValue<QuoteRequestInput>
  errors: FieldErrors<QuoteRequestInput>
}) {
  const streetInputRef = useRef<HTMLInputElement | null>(null)
  const [placesReady, setPlacesReady] = useState(false)

  const streetField = fieldName(prefix, 'Street')
  const unitField = fieldName(prefix, 'Unit')
  const cityField = fieldName(prefix, 'City')
  const stateField = fieldName(prefix, 'State')
  const zipField = fieldName(prefix, 'Zip')

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) return
    let cancelled = false
    setOptions({ key: apiKey, v: 'weekly' })
    importLibrary('places')
      .then(() => { if (!cancelled) setPlacesReady(true) })
      .catch((err) => console.warn('Places library failed to load:', err))
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!placesReady || !streetInputRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(streetInputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['address_components'],
      types: ['address'],
    })

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      const components = place.address_components || []

      const streetNumber = getComponent(components, 'street_number')
      const route = getComponent(components, 'route')
      const city = getComponent(components, 'locality') || getComponent(components, 'sublocality') || getComponent(components, 'postal_town')
      const state = getComponent(components, 'administrative_area_level_1', true)
      const zip = getComponent(components, 'postal_code')
      const street = [streetNumber, route].filter(Boolean).join(' ')

      if (street) setValue(streetField, street, { shouldValidate: true })
      if (city) setValue(cityField, city, { shouldValidate: true })
      if (state) setValue(stateField, state, { shouldValidate: true })
      if (zip) setValue(zipField, zip, { shouldValidate: true })
    })

    return () => {
      google.maps.event.removeListener(listener)
    }
  }, [placesReady, cityField, stateField, streetField, setValue, zipField])

  const { ref: streetRhfRef, ...streetReg } = register(streetField)

  return (
    <div className="space-y-3">
      <Label required htmlFor={streetField}>{label}</Label>

      <div>
        <input
          id={streetField}
          {...streetReg}
          ref={(el) => { streetRhfRef(el); streetInputRef.current = el }}
          placeholder="Start typing a street address..."
          autoComplete="off"
          className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-[16px] text-foreground placeholder:text-foreground/40 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors"
          aria-invalid={!!errors[streetField]}
          aria-describedby={errors[streetField] ? `${streetField}-error` : undefined}
        />
        <FieldError id={`${streetField}-error`}>{errors[streetField]?.message as string | undefined}</FieldError>
      </div>

      <Input {...register(unitField)} placeholder="Apt, suite, unit (optional)" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2">
          <Input {...register(cityField)} placeholder="City" aria-invalid={!!errors[cityField]} aria-describedby={errors[cityField] ? `${cityField}-error` : undefined} />
          <FieldError id={`${cityField}-error`}>{errors[cityField]?.message as string | undefined}</FieldError>
        </div>
        <div>
          <Input {...register(stateField)} placeholder="State" maxLength={2} className="uppercase" aria-invalid={!!errors[stateField]} aria-describedby={errors[stateField] ? `${stateField}-error` : undefined} />
          <FieldError id={`${stateField}-error`}>{errors[stateField]?.message as string | undefined}</FieldError>
        </div>
        <div>
          <Input {...register(zipField)} placeholder="ZIP" aria-invalid={!!errors[zipField]} aria-describedby={errors[zipField] ? `${zipField}-error` : undefined} />
          <FieldError id={`${zipField}-error`}>{errors[zipField]?.message as string | undefined}</FieldError>
        </div>
      </div>
    </div>
  )
}
