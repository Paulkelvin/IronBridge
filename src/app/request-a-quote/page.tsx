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

export default function RequestAQuotePage() {
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
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 scroll-smooth">
      <PageHeader
        eyebrow="Request a Quote"
        title="Request a Quote"
        description="Tell us about your delivery or route and we’ll follow up to confirm the details."
      />

      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* PHI notice */}
        <SlideEffect isSpring={false}>
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required>Name</Label>
                  <Input {...register('name')} placeholder="Jane Smith" />
                  <FieldError>{errors.name?.message}</FieldError>
                </div>
                <div>
                  <Label>Company / Organization</Label>
                  <Input {...register('company')} placeholder="Acme Labs" />
                </div>
                <div>
                  <Label required>Email</Label>
                  <Input type="email" {...register('email')} placeholder="jane@company.com" />
                  <FieldError>{errors.email?.message}</FieldError>
                </div>
                <div>
                  <Label required>Phone</Label>
                  <Input type="tel" {...register('phone')} placeholder="(555) 555-5555" />
                  <FieldError>{errors.phone?.message}</FieldError>
                </div>
                <div>
                  <Label required>Pickup Location</Label>
                  <Input {...register('pickupLocation')} placeholder="City, State" />
                  <FieldError>{errors.pickupLocation?.message}</FieldError>
                </div>
                <div>
                  <Label required>Delivery Location</Label>
                  <Input {...register('deliveryLocation')} placeholder="City, State" />
                  <FieldError>{errors.deliveryLocation?.message}</FieldError>
                </div>
                <div>
                  <Label required>Requested Service Date</Label>
                  <Input type="date" {...register('serviceDate')} />
                  <FieldError>{errors.serviceDate?.message}</FieldError>
                </div>
                <div>
                  <Label>Pickup/Delivery Time Requirements</Label>
                  <Input {...register('timeRequirements')} placeholder="e.g. before 10am" />
                </div>
                <div>
                  <Label>Number of Stops</Label>
                  <Input {...register('stopCount')} placeholder="e.g. 3" />
                </div>
                <div>
                  <Label>Approximate Shipment Size / Weight</Label>
                  <Input {...register('shipmentSize')} placeholder="e.g. 2 coolers, ~15 lbs" />
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
                      <PillGroup name="temperatureSensitive" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
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
                      <PillGroup name="specialHandling" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
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
                      <PillGroup name="stat" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                    )}
                  />
                  <FieldError>{errors.stat?.message}</FieldError>
                </div>
              </div>

              <div>
                <Label>Additional Instructions</Label>
                <Textarea {...register('additionalInstructions')} placeholder="Anything else we should know?" />
              </div>

              {status === 'error' && <FormError message={errorMessage} />}

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                {status !== 'submitting' && <ArrowRight />}
              </Button>
            </form>
          </SlideEffect>
        )}
      </div>

      <Footer />
    </div>
  )
}
