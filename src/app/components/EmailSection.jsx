"use client"
import React, { useState } from 'react'
import GithubIcon from "/public/github-icon.svg"
import LinkedinIcon from "/public/linkedin-icon.svg"
import Link from "next/link"
import Image from "next/image"

const EmailSection = () => {
  
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSuccessFading, setIsSuccessFading] = useState(false)
  const [placeholderOpacity, setPlaceholderOpacity] = useState(100)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const data = {
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      }
      
      const response = await fetch("/api/send", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setEmailSubmitted(true)
        setIsSuccessFading(false)
        
        // Show success message with pulse and fade placeholders
        setPlaceholderOpacity(10)
        
        // Reset form immediately (no values showing)
        e.target.reset()
        
        // Gradually fade back to full opacity over 2 seconds
        const steps = 20
        const increment = 90 / steps // from 10 to 100
        const stepDelay = 100 // 100ms per step = 2 seconds total
        
        for (let i = 1; i <= steps; i++) {
          setTimeout(() => {
            setPlaceholderOpacity(10 + (increment * i))
          }, stepDelay * i)
        }
        
        // Start fade-out after 6 seconds
        setTimeout(() => {
          setIsSuccessFading(true)
        }, 6000)
        
        // Remove after fade animation completes
        setTimeout(() => {
          setEmailSubmitted(false)
          setIsSuccessFading(false)
        }, 7600)
      } else {
        const errorData = await response.json()
        setError(errorData.error?.message || 'Failed to send email. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
  <section id="contact" className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
    <div className="z-10">
    <h5 className="text-xl font-bold text-white my-2">
        Let&apos;s Connect
    </h5>
    <p className="text-[#ADB7BE] mb-4 max-w-md"> 
        I&apos;m currently looking for new opportunities, my inbox is always open. 
        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
    </p>
    <div className="socials flex flex-row gap-2">
        <Link href="https://github.com/jakobdubeau" target="_blank" rel="noopener noreferrer">
          <Image src={GithubIcon} alt="Github Icon" />
        </Link>
        <Link href="https://www.linkedin.com/in/jakobdubeau/" target="_blank" rel="noopener noreferrer">
          <Image src={LinkedinIcon} alt="Linkedin Icon" />
        </Link>
    </div>
    </div>
    <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="email" 
              className="text-white block mb-2 text-sm font-medium"
            >
              Your email
            </label>
            <input 
              name="email"
              type="email" 
              id="email" 
              required 
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-all duration-200"
              style={{ 
                '--placeholder-opacity': placeholderOpacity / 100
              }}
              placeholder="email@domain.com"
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="subject" 
              className="text-white block mb-2 text-sm font-medium"
            >
              Subject
            </label>
            <input 
              name="subject"
              type="text" 
              id="subject" 
              required 
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-all duration-200"
              style={{ 
                '--placeholder-opacity': placeholderOpacity / 100
              }}
              placeholder="Just saying hi!"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block mb-2 text-sm font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-all duration-200"
              style={{ 
                '--placeholder-opacity': placeholderOpacity / 100
              }}
              placeholder="Leave your message here"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-400 hover:bg-primary-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          <div className="mt-4 h-16">
            {emailSubmitted && (
              <div className={`p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center space-x-3 h-full ${
                isSuccessFading 
                  ? 'opacity-0 transition-opacity duration-[1500ms] ease-out' 
                  : 'opacity-100'
              }`}
              style={{
                animation: isSuccessFading ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 2'
              }}>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-400 font-medium">Message sent successfully!</p>
                  <p className="text-green-300/70 text-sm">I'll get back to you soon.</p>
                </div>
              </div>
            )}
          </div>
          {
            error && (
              <p className="text-red-500 text-sm mt-2">
                {error}
              </p>
            )
          }

        </form>
    </div>
  </section>
  )
}

export default EmailSection