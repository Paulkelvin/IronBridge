'use client'

import PageHeader from "@/components/page-header"
import Footer from "@/sections/footer"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { FieldError, Input, Label, PillGroup, Textarea } from "@/components/ui/field"
import { FormError, FormSuccess } from "@/components/form-status"
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    control,
    handleSubmit,
    reset,
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
    } catch {
      setErrorMessage('Something went wrong. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Request a Quote"
        title="Request a Quote"
        description="Tell us about your delivery or route and we’ll follow up to confirm the details."
      />

      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* PHI notice */}
        <SlideEffect isSpring={false}>
          <div role="note" className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>Please do not submit patient names, diagnoses, medical record numbers, or other protected health information through this form.</span>
          </div>
        </SlideEffect>

        {status === 'success' ? (
          <FormSuccess
            title="Request received"
            description="Thanks — we've received your request and sent a confirmation to your email. Our team will follow up shortly."
          />
        ) : (
          <SlideEffect isSpring={false}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label="Request a quote">
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
                  <Input id="phone" type="tel" {...register('phone')} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                  <FieldError id="phone-error">{errors.phone?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="pickupLocation">Pickup Location</Label>
                  <Input id="pickupLocation" {...register('pickupLocation')} placeholder="City, State" aria-invalid={!!errors.pickupLocation} aria-describedby={errors.pickupLocation ? "pickupLocation-error" : undefined} />
                  <FieldError id="pickupLocation-error">{errors.pickupLocation?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="deliveryLocation">Delivery Location</Label>
                  <Input id="deliveryLocation" {...register('deliveryLocation')} placeholder="City, State" aria-invalid={!!errors.deliveryLocation} aria-describedby={errors.deliveryLocation ? "deliveryLocation-error" : undefined} />
                  <FieldError id="deliveryLocation-error">{errors.deliveryLocation?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="serviceDate">Requested Service Date</Label>
                  <Input id="serviceDate" type="date" {...register('serviceDate')} aria-invalid={!!errors.serviceDate} aria-describedby={errors.serviceDate ? "serviceDate-error" : undefined} />
                  <FieldError id="serviceDate-error">{errors.serviceDate?.message}</FieldError>
                </div>
                <div>
                  <Label htmlFor="timeRequirements">Pickup/Delivery Time Requirements</Label>
                  <Input id="timeRequirements" {...register('timeRequirements')} placeholder="e.g. before 10am" />
                </div>
                <div>
                  <Label htmlFor="stopCount">Number of Stops</Label>
                  <Input id="stopCount" {...register('stopCount')} placeholder="e.g. 3" />
                </div>
                <div>
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

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                {status !== 'submitting' && <ArrowRight aria-hidden="true" />}
              </Button>
            </form>
          </SlideEffect>
        )}
      </div>

      <Footer />
    </div>
  )
}
