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

export default function BecomeADriverPage() {
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
          <div className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground">
            <ShieldCheck size={18} className="shrink-0 mt-0.5 text-teal" />
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required>Name</Label>
                  <Input {...register('name')} placeholder="Jane Smith" />
                  <FieldError>{errors.name?.message}</FieldError>
                </div>
                <div>
                  <Label required>Email</Label>
                  <Input type="email" {...register('email')} placeholder="jane@email.com" />
                  <FieldError>{errors.email?.message}</FieldError>
                </div>
                <div>
                  <Label required>Phone</Label>
                  <Input type="tel" {...register('phone')} placeholder="(555) 555-5555" />
                  <FieldError>{errors.phone?.message}</FieldError>
                </div>
                <div>
                  <Label required>Location (City, State)</Label>
                  <Input {...register('location')} placeholder="Baltimore, MD" />
                  <FieldError>{errors.location?.message}</FieldError>
                </div>
                <div>
                  <Label required>Vehicle Type</Label>
                  <Input {...register('vehicleType')} placeholder="Cargo van, sedan, SUV..." />
                  <FieldError>{errors.vehicleType?.message}</FieldError>
                </div>
                <div>
                  <Label required>Vehicle Year / Make / Model</Label>
                  <Input {...register('vehicleYearMakeModel')} placeholder="2020 Ford Transit" />
                  <FieldError>{errors.vehicleYearMakeModel?.message}</FieldError>
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
                <Label required>Service Areas You Can Cover</Label>
                <Input {...register('serviceAreas')} placeholder="e.g. Baltimore, Columbia, Silver Spring" />
                <FieldError>{errors.serviceAreas?.message}</FieldError>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required>Medical Courier Experience</Label>
                  <Controller
                    control={control}
                    name="medicalCourierExperience"
                    render={({ field }) => (
                      <PillGroup name="medicalCourierExperience" value={field.value} onChange={field.onChange} options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                    )}
                  />
                  <FieldError>{errors.medicalCourierExperience?.message}</FieldError>
                </div>
                <div>
                  <Label required>HIPAA / BBP Training Status</Label>
                  <Select {...register('hipaaBbpStatus')} defaultValue="">
                    <option value="" disabled>Select status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In progress</option>
                    <option value="none">Not yet started</option>
                  </Select>
                  <FieldError>{errors.hipaaBbpStatus?.message}</FieldError>
                </div>
              </div>

              <div>
                <Label>Other Relevant Certifications</Label>
                <Input {...register('otherCertifications')} placeholder="e.g. defensive driving, DOT/PHMSA Category B" />
              </div>

              <div>
                <Label>Anything Else We Should Know?</Label>
                <Textarea {...register('additionalInfo')} placeholder="Optional" />
              </div>

              {status === 'error' && <FormError message={errorMessage} />}

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit Application'}
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
