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
        e.target.reset()
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
          {
            emailSubmitted && (
              <p className="text-green-500 text-sm mt-2">
                Email sent successfully!
              </p>
            )
          }
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