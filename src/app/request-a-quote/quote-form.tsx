'use client'

import AddressFields from "@/components/address-autocomplete-fields"
import PageHeader from "@/components/page-header"
import Footer from "@/sections/footer"
import { Button } from "@/components/ui/button"
import { FieldError, Input, Label, PhoneInput, PillGroup, Textarea } from "@/components/ui/field"
import { FormError, FormSuccess } from "@/components/form-status"
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"

const STEP_FIELDS = [
  ['name', 'company', 'email', 'phone'],
  ['pickupStreet', 'pickupCity', 'pickupState', 'pickupZip', 'deliveryStreet', 'deliveryCity', 'deliveryState', 'deliveryZip', 'serviceDate', 'timeRequirements'],
  ['shipmentType', 'serviceFrequency', 'stopCount', 'shipmentSize', 'temperatureSensitive', 'specialHandling', 'stat', 'additionalInstructions'],
] as const

const STEP_TITLES = ['Contact Info', 'Shipment Route', 'Shipment Details'] as const

export default function QuoteForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      company: '',
      timeRequirements: '',
      stopCount: '',
      shipmentSize: '',
      additionalInstructions: '',
    },
  })

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step - 1])
    if (valid) setStep((s) => (s + 1) as 1 | 2 | 3)
  }

  const onSubmit = async (data: QuoteRequestInput) => {
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/request-a-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMessage(json.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      reset()
      setStep(1)
    } catch {
      setErrorMessage('Something went wrong. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Request a Quote"
        title="Request a Quote"
        description="Tell us about your delivery or route and we’ll follow up to confirm the details."
      />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div role="note" className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs text-amber-800">
          <AlertTriangle size={14} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
          <span>Please don’t include patient names, diagnoses, or other protected health information in this form.</span>
        </div>

        {status === 'success' ? (
          <FormSuccess
            title="Request received"
            description="Thanks! We've received your request and sent a confirmation to your email. Our team will follow up shortly."
          />
        ) : (
          <div className="rounded-2xl border border-border bg-white shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-teal rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-foreground/60 tracking-wide whitespace-nowrap">Step {step} of 3</span>
            </div>

            <h2 className="font-serif text-xl text-navy mb-6">
              {STEP_TITLES[step - 1]}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label="Request a quote">
              {step === 1 ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label required htmlFor="name">Name</Label>
                      <Input id="name" {...register('name')} placeholder="Jane Smith" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                      <FieldError id="name-error">{errors.name?.message}</FieldError>
                    </div>
                    <div>
                      <Label htmlFor="company">Company / Organization</Label>
                      <Input id="company" {...register('company')} placeholder="Acme Labs" />
                    </div>
                    <div>
                      <Label required htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} placeholder="jane@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                      <FieldError id="email-error">{errors.email?.message}</FieldError>
                    </div>
                    <div>
                      <Label required htmlFor="phone">Phone</Label>
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <PhoneInput id="phone" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                        )}
                      />
                      <FieldError id="phone-error">{errors.phone?.message}</FieldError>
                    </div>
                  </div>

                  <Button type="button" size="lg" className="w-full sm:w-fit" onClick={goNext}>
                    Continue
                    <ArrowRight strokeWidth={1.5} aria-hidden="true" />
                  </Button>
                </div>
              ) : step === 2 ? (
                <div className="space-y-5">
                  <AddressFields prefix="pickup" label="Pickup Location" register={register} setValue={setValue} errors={errors} />
                  <AddressFields prefix="delivery" label="Delivery Location" register={register} setValue={setValue} errors={errors} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label required htmlFor="serviceDate">Requested Service Date</Label>
                      <Input id="serviceDate" type="date" className="py-3 leading-normal" {...register('serviceDate')} aria-invalid={!!errors.serviceDate} aria-describedby={errors.serviceDate ? "serviceDate-error" : undefined} />
                      <FieldError id="serviceDate-error">{errors.serviceDate?.message}</FieldError>
                    </div>
                    <div>
                      <Label htmlFor="timeRequirements">Pickup/Delivery Time Requirements</Label>
                      <Input id="timeRequirements" {...register('timeRequirements')} placeholder="e.g. before 10am" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                      <ArrowLeft strokeWidth={1.5} aria-hidden="true" />
                      Back
                    </Button>
                    <Button type="button" size="lg" className="flex-1 sm:flex-none" onClick={goNext}>
                      Continue
                      <ArrowRight strokeWidth={1.5} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <Label htmlFor="stopCount">Number of Stops</Label>
                      <Input id="stopCount" {...register('stopCount')} placeholder="e.g. 3" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="shipmentSize">Approximate Shipment Size / Weight</Label>
                      <Input id="shipmentSize" {...register('shipmentSize')} placeholder="e.g. 2 coolers, ~15 lbs" />
                    </div>
                  </div>

                  <div>
                    <Label required>Shipment Type</Label>
                    <Controller
                      control={control}
                      name="shipmentType"
                      render={({ field }) => (
                        <PillGroup
                          name="shipmentType"
                          ariaLabel="Shipment type"
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            { label: 'Medical', value: 'medical' },
                            { label: 'Commercial', value: 'commercial' },
                            { label: 'Other', value: 'other' },
                          ]}
                        />
                      )}
                    />
                    <FieldError>{errors.shipmentType?.message}</FieldError>
                  </div>

                  <div>
                    <Label required>One-Time or Recurring Service</Label>
                    <Controller
                      control={control}
                      name="serviceFrequency"
                      render={({ field }) => (
                        <PillGroup
                          name="serviceFrequency"
                          ariaLabel="One-time or recurring service"
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            { label: 'One-Time', value: 'one-time' },
                            { label: 'Recurring', value: 'recurring' },
                          ]}
                        />
                      )}
                    />
                    <FieldError>{errors.serviceFrequency?.message}</FieldError>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <Label required>Temperature-Sensitive</Label>
                      <Controller
                        control={control}
                        name="temperatureSensitive"
                        render={({ field }) => (
                          <PillGroup name="temperatureSensitive" ariaLabel="Temperature-sensitive" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                        )}
                      />
                      <FieldError>{errors.temperatureSensitive?.message}</FieldError>
                    </div>
                    <div>
                      <Label required>Special Handling</Label>
                      <Controller
                        control={control}
                        name="specialHandling"
                        render={({ field }) => (
                          <PillGroup name="specialHandling" ariaLabel="Special handling" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                        )}
                      />
                      <FieldError>{errors.specialHandling?.message}</FieldError>
                    </div>
                    <div>
                      <Label required>STAT / Expedited</Label>
                      <Controller
                        control={control}
                        name="stat"
                        render={({ field }) => (
                          <PillGroup name="stat" ariaLabel="STAT or expedited" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                        )}
                      />
                      <FieldError>{errors.stat?.message}</FieldError>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInstructions">Additional Instructions</Label>
                    <Textarea id="additionalInstructions" {...register('additionalInstructions')} placeholder="Anything else we should know?" />
                  </div>

                  {status === 'error' && <FormError message={errorMessage} />}

                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>
                      <ArrowLeft strokeWidth={1.5} aria-hidden="true" />
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 sm:flex-none" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                      {status !== 'submitting' && <ArrowRight strokeWidth={1.5} aria-hidden="true" />}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
