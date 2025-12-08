'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle2, X } from 'lucide-react'

export default function FreeConsultation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [blurred, setBlurred] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (email: string) => {
    // Comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email) && email.length <= 254
  }

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.length === 0) return ''
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length <= 10) {
        const formatted = formatPhoneNumber(cleaned)
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (fieldName: string) => {
    setBlurred(prev => ({ ...prev, [fieldName]: true }))
  }

  // Helper function to check if a field is valid
  const isFieldValid = (fieldName: string): boolean => {
    const value = formData[fieldName as keyof typeof formData]

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
      case 'goals':
        return value.trim().length > 0
      case 'email':
        return validateEmail(value)
      case 'phone':
        return validatePhone(value)
      default:
        return false
    }
  }

  // Helper function to determine if we should show validation indicator
  const shouldShowIndicator = (fieldName: string): boolean => {
    return blurred[fieldName] && formData[fieldName as keyof typeof formData].length > 0
  }

  // Validation indicator component
  const ValidationIndicator = ({ fieldName }: { fieldName: string }) => {
    if (!shouldShowIndicator(fieldName)) return null

    const isValid = isFieldValid(fieldName)

    return isValid ? (
      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 ml-2">
        <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-5 h-5 bg-red-500 ml-2">
        <X className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.goals.trim()) {
      newErrors.goals = 'Please tell us about your goals'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)

        // Redirect to Calendly after 3 seconds
        setTimeout(() => {
          const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/path-financial-coaching'
          window.location.href = calendlyUrl
        }, 3000)
      } else {
        alert('There was an error submitting your request. Please try again or email directly.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center section-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Request Submitted!
          </h1>
          <p className="text-xl text-gray-700">
            Thank you for reaching out. You'll be redirected to schedule your free consultation in a moment...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            BOOK YOUR COMPLIMENTARY FINANCIAL COACHING SESSION
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Don't let your dreams fade away, take control TODAY. Book a free meeting with me to find out how I can help you turn your dreams into reality.
          </p>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            START THE CONVERSATION TODAY!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="flex items-center text-base font-bold text-gray-900 mb-2 px-2 py-1 bg-white/70 rounded-md w-fit backdrop-blur-sm">
                First Name *
                <ValidationIndicator fieldName="firstName" />
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur('firstName')}
                className={`w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="flex items-center text-base font-bold text-gray-900 mb-2 px-2 py-1 bg-white/70 rounded-md w-fit backdrop-blur-sm">
                Last Name *
                <ValidationIndicator fieldName="lastName" />
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur('lastName')}
                className={`w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center text-base font-bold text-gray-900 mb-2 px-2 py-1 bg-white/70 rounded-md w-fit backdrop-blur-sm">
                Email *
                <ValidationIndicator fieldName="email" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="flex items-center text-base font-bold text-gray-900 mb-2 px-2 py-1 bg-white/70 rounded-md w-fit backdrop-blur-sm">
                Phone Number *
                <ValidationIndicator fieldName="phone" />
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                className={`w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Goals */}
            <div>
              <label htmlFor="goals" className="flex items-center text-base font-bold text-gray-900 mb-2 px-2 py-1 bg-white/70 rounded-md w-fit backdrop-blur-sm">
                What Goals Are You Looking To Achieve? *
                <ValidationIndicator fieldName="goals" />
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                onBlur={() => handleBlur('goals')}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm ${
                  errors.goals ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all resize-vertical`}
                placeholder="Give a detailed example"
              />
              {errors.goals && (
                <p className="mt-1 text-sm text-red-500">{errors.goals}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
