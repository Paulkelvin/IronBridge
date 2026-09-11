'use client'

import BlobShape from "@/components/graphics/blob-shape"
import DotGrid from "@/components/graphics/dot-grid"
import RouteLine from "@/components/graphics/route-line"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"
import Footer from "@/sections/footer"
import { Button } from "@/components/ui/button"
import { CheckboxPillGroup, FieldError, Input, Label, PhoneInput, PillGroup, Select, Textarea } from "@/components/ui/field"
import { FormError, FormSuccess } from "@/components/form-status"
import { driverApplicationSchema, type DriverApplicationInput } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"

const STEP_FIELDS = [
  ['name', 'email', 'phone', 'location', 'vehicleType', 'vehicleYearMakeModel'],
  ['availability', 'serviceAreas', 'medicalCourierExperience', 'hipaaBbpStatus', 'otherCertifications', 'additionalInfo'],
] as const

const SERVICE_AREA_OPTIONS = [
  'Baltimore', 'Bowie', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Hyattsville',
  'Washington, DC',
  'Arlington', 'Alexandria', 'Fairfax', 'Reston', 'Sterling', 'Ashburn',
].map(city => ({ label: city, value: city }))

// Suggestion only — a driver's home base doesn't have to be one of the
// cities we already list as served.
const LOCATION_SUGGESTIONS = [
  'Baltimore, MD', 'Bowie, MD', 'Annapolis, MD', 'Columbia, MD', 'Silver Spring, MD', 'Rockville, MD', 'Bethesda, MD', 'Hyattsville, MD',
  'Washington, DC',
  'Arlington, VA', 'Alexandria, VA', 'Fairfax, VA', 'Reston, VA', 'Sterling, VA', 'Ashburn, VA',
]

export default function DriverForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const cardRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<DriverApplicationInput>({
    resolver: zodResolver(driverApplicationSchema),
    defaultValues: {
      availability: [],
      serviceAreas: [],
      otherCertifications: '',
      additionalInfo: '',
    },
  })

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[0])
    if (valid) setStep(2)
  }

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
      setStep(1)
    } catch {
      setErrorMessage('Something went wrong. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-56 scroll-smooth">
      <div className="relative">
        {/* Decorative background — breaks out to the full viewport width */}
        <div
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(70% 90% at 90% 0%, rgba(18,130,98,0.08) 0%, transparent 65%), radial-gradient(70% 90% at 5% 100%, rgba(27,42,74,0.06) 0%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          }}
        >
          <RouteLine className="absolute inset-x-0 top-1/4 w-full h-[160px] md:h-[220px] text-navy/[0.07]" />
        </div>

        <section className="relative overflow-hidden pt-4 pb-4 md:pt-8 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left: text content */}
            <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left">
              <SlideEffect>
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.14em] text-navy uppercase">
                  Become a Driver
                </span>
              </SlideEffect>

              <h1 className="font-serif text-navy text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-xl">
                <TextBlurEffect>Drive With Iron Bridge</TextBlurEffect>
              </h1>

              <SlideEffect delay={0.15} className="text-sm lg:text-lg px-4 sm:px-10 lg:px-0 max-w-2xl mx-auto lg:max-w-none lg:mx-0 text-foreground">
                Interested in driving or running your own vehicle with Iron Bridge? Tell us about yourself and we&apos;ll be in touch.
              </SlideEffect>
            </div>

            {/* Right: image */}
            <SlideEffect
              direction="left"
              isSpring={false}
              className="relative w-full max-w-[19rem] mx-auto lg:max-w-[26rem] aspect-[1000/784]"
            >
              {/* Decorative backdrop behind the illustration */}
              <div className="absolute -inset-8 md:-inset-12 -z-10 pointer-events-none" aria-hidden="true">
                <BlobShape className="absolute inset-0 h-full w-full text-teal-tint" />
                <div className="absolute top-3 right-6 md:top-4 md:right-10 size-3.5 md:size-4 rounded-full bg-gold" />
                <div className="absolute bottom-10 right-2 md:bottom-14 md:right-4 size-2.5 md:size-3 rotate-45 bg-teal-light/70" />
                <div className="absolute bottom-4 left-8 md:bottom-6 md:left-12 size-3 md:size-3.5 rounded-full border-2 border-navy/30" />
                <DotGrid id="driver-hero-dots-tr" className="absolute -top-3 -right-3 w-20 h-20 md:w-24 md:h-24 text-teal/40" />
                <DotGrid id="driver-hero-dots-bl" className="absolute -bottom-3 -left-3 w-16 h-16 md:w-20 md:h-20 text-navy/25" />
              </div>

              <Image
                src="/brand/become-a-driver-hero.png"
                alt="Driver joining the Iron Bridge team beside a delivery van"
                fill
                className="object-contain"
                priority
              />
            </SlideEffect>
          </div>
        </section>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div role="note" className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3.5 py-2 text-xs text-foreground">
          <ShieldCheck size={14} strokeWidth={1.5} className="shrink-0 text-teal" aria-hidden="true" />
          <span>We do not collect Social Security numbers, banking information, or other highly sensitive details through this form.</span>
        </div>

        {status === 'success' ? (
          <FormSuccess
            title="Application received"
            description="Thanks for your interest. We've received your application and sent a confirmation to your email. We'll follow up if there's a fit."
          />
        ) : (
          <div ref={cardRef} className="rounded-2xl border border-border bg-white shadow-sm p-6 md:p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-teal rounded-full transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
              </div>
              <span className="text-xs font-medium text-foreground/60 tracking-wide whitespace-nowrap">Step {step} of 2</span>
            </div>

            <h2 className="font-serif text-xl text-navy mb-6">
              {step === 1 ? 'Your Information' : 'Availability & Experience'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label="Become a driver application">
              {step === 1 ? (
                <div className="space-y-5">
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
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <PhoneInput id="d-phone" value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "d-phone-error" : undefined} />
                        )}
                      />
                      <FieldError id="d-phone-error">{errors.phone?.message}</FieldError>
                    </div>
                    <div>
                      <Label required htmlFor="d-location">Location (City, State)</Label>
                      <Input id="d-location" list="d-location-suggestions" {...register('location')} placeholder="Baltimore, MD" aria-invalid={!!errors.location} aria-describedby={errors.location ? "d-location-error" : undefined} />
                      <FieldError id="d-location-error">{errors.location?.message}</FieldError>
                      <datalist id="d-location-suggestions">
                        {LOCATION_SUGGESTIONS.map(city => <option key={city} value={city} />)}
                      </datalist>
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

                  <Button type="button" size="lg" className="w-full sm:w-fit" onClick={goNext}>
                    Continue
                    <ArrowRight strokeWidth={1.5} aria-hidden="true" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
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
                    <Label required>Service Areas You Can Cover</Label>
                    <Controller
                      control={control}
                      name="serviceAreas"
                      render={({ field }) => (
                        <CheckboxPillGroup
                          name="serviceAreas"
                          ariaLabel="Service areas you can cover"
                          value={field.value}
                          onChange={field.onChange}
                          options={SERVICE_AREA_OPTIONS}
                        />
                      )}
                    />
                    <FieldError>{errors.serviceAreas?.message}</FieldError>
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

                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                      <ArrowLeft strokeWidth={1.5} aria-hidden="true" />
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 sm:flex-none" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : 'Submit Application'}
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
