'use client'

import PageHeader from "@/components/page-header"
import Footer from "@/sections/footer"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { CheckboxPillGroup, FieldError, Input, Label, PillGroup, Select, Textarea } from "@/components/ui/field"
import { FormError, FormSuccess } from "@/components/form-status"
import { driverApplicationSchema, type DriverApplicationInput } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"

export default function DriverForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverApplicationInput>({
    resolver: zodResolver(driverApplicationSchema),
    defaultValues: {
      availability: [],
      otherCertifications: '',
      additionalInfo: '',
    },
  })

  const onSubmit = async (data: DriverApplicationInput) => {
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/become-a-driver', {
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
        eyebrow="Become a Driver"
        title="Drive With Iron Bridge"
        description="Interested in driving or running your own vehicle with Iron Bridge? Tell us about yourself and we'll be in touch."
      />

      <div className="max-w-2xl mx-auto w-full space-y-8">
        <SlideEffect isSpring={false}>
          <div role="note" className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground">
            <ShieldCheck size={18} className="shrink-0 mt-0.5 text-teal" aria-hidden="true" />
            <span>We do not collect Social Security numbers, banking information, or other highly sensitive details through this form. That information, if needed, is handled through a secure onboarding process later.</span>
          </div>
        </SlideEffect>

        {status === 'success' ? (
          <FormSuccess
            title="Application received"
            description="Thanks for your interest — we've received your application and sent a confirmation to your email. We'll follow up if there's a fit."
          />
        ) : (
          <SlideEffect isSpring={false}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label="Become a driver application">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required htmlFor="d-name">Name</Label>
                  <Input id="d-name" {...register('name')} placeholder="Jane Smith" aria-invalid={!!errors.name} aria-describedby={errors.name ? "d-name-error" : undefined} />
                  <FieldError id="d-name-error">{errors.name?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-email">Email</Label>
                  <Input id="d-email" type="email" {...register('email')} placeholder="jane@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "d-email-error" : undefined} />
                  <FieldError id="d-email-error">{errors.email?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-phone">Phone</Label>
                  <Input id="d-phone" type="tel" {...register('phone')} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "d-phone-error" : undefined} />
                  <FieldError id="d-phone-error">{errors.phone?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-location">Location (City, State)</Label>
                  <Input id="d-location" {...register('location')} placeholder="Baltimore, MD" aria-invalid={!!errors.location} aria-describedby={errors.location ? "d-location-error" : undefined} />
                  <FieldError id="d-location-error">{errors.location?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-vehicleType">Vehicle Type</Label>
                  <Input id="d-vehicleType" {...register('vehicleType')} placeholder="Cargo van, sedan, SUV..." aria-invalid={!!errors.vehicleType} aria-describedby={errors.vehicleType ? "d-vehicleType-error" : undefined} />
                  <FieldError id="d-vehicleType-error">{errors.vehicleType?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-vehicleYMM">Vehicle Year / Make / Model</Label>
                  <Input id="d-vehicleYMM" {...register('vehicleYearMakeModel')} placeholder="2020 Ford Transit" aria-invalid={!!errors.vehicleYearMakeModel} aria-describedby={errors.vehicleYearMakeModel ? "d-vehicleYMM-error" : undefined} />
                  <FieldError id="d-vehicleYMM-error">{errors.vehicleYearMakeModel?.message}</FieldError>
                </div>
              </div>

              <div>
                <Label required>Availability</Label>
                <Controller
                  control={control}
                  name="availability"
                  render={({ field }) => (
                    <CheckboxPillGroup
                      name="availability"
                      ariaLabel="Availability"
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { label: 'Weekdays', value: 'weekdays' },
                        { label: 'Evenings', value: 'evenings' },
                        { label: 'Weekends', value: 'weekends' },
                        { label: 'On-Call / STAT', value: 'on-call' },
                      ]}
                    />
                  )}
                />
                <FieldError>{errors.availability?.message}</FieldError>
              </div>

              <div>
                <Label required htmlFor="d-serviceAreas">Service Areas You Can Cover</Label>
                <Input id="d-serviceAreas" {...register('serviceAreas')} placeholder="e.g. Baltimore, Columbia, Silver Spring" aria-invalid={!!errors.serviceAreas} aria-describedby={errors.serviceAreas ? "d-serviceAreas-error" : undefined} />
                <FieldError id="d-serviceAreas-error">{errors.serviceAreas?.message}</FieldError>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required>Medical Courier Experience</Label>
                  <Controller
                    control={control}
                    name="medicalCourierExperience"
                    render={({ field }) => (
                      <PillGroup name="medicalCourierExperience" ariaLabel="Medical courier experience" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                    )}
                  />
                  <FieldError>{errors.medicalCourierExperience?.message}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="d-hipaaStatus">HIPAA / BBP Training Status</Label>
                  <Select id="d-hipaaStatus" {...register('hipaaBbpStatus')} defaultValue="" aria-invalid={!!errors.hipaaBbpStatus} aria-describedby={errors.hipaaBbpStatus ? "d-hipaaStatus-error" : undefined}>
                    <option value="" disabled>Select status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In progress</option>
                    <option value="none">Not yet started</option>
                  </Select>
                  <FieldError id="d-hipaaStatus-error">{errors.hipaaBbpStatus?.message}</FieldError>
                </div>
              </div>

              <div>
                <Label htmlFor="d-otherCerts">Other Relevant Certifications</Label>
                <Input id="d-otherCerts" {...register('otherCertifications')} placeholder="e.g. defensive driving, DOT/PHMSA Category B" />
              </div>

              <div>
                <Label htmlFor="d-additionalInfo">Anything Else We Should Know?</Label>
                <Textarea id="d-additionalInfo" {...register('additionalInfo')} placeholder="Optional" />
              </div>

              {status === 'error' && <FormError message={errorMessage} />}

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit Application'}
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
