import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import FooterMain from './Footer/FooterMain'
import EmailComp from './email/EmailComp'

const Contact = () => {
  return (
    <div>
      <NavbarMain />

      {/* Header */}
      <section className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Contact Us</h1>
        <p className="max-w-xl mx-auto text-sm md:text-base opacity-90">
          We are excited to hear from you, know that we will get to you ASAP
        </p>
      </section>

      {/* Tabs */}
      <div className="px-6 md:px-20 mt-8">
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-full bg-red-600 text-white text-sm">
            Email
          </button>
          <button className="px-6 py-2 rounded-full border border-[#8b4a1f] text-[#8b4a1f] text-sm">
            Our Email: Others
          </button>
        </div>
      </div>

      {/* Description */}
      <section className="px-6 md:px-20 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#8b4a1f] mb-10">
          Description
        </h2>

        <div className="max-w-4xl mx-auto text-sm md:text-base text-[#8b4a1f] leading-relaxed space-y-6">
          <p>
            When any item you wish to purchase is clicked on you get redirected
            to the contact session where your item is displayed in the
            description tab below and then you enter your email as the company
            email is already set in then click send.
          </p>

          <p>
            Once you click send the email feature will open and you will be
            prompted to send email to the set email.
          </p>

          <p>
            Within 24 hrs we will review your email and get back to you as soon
            as possible responding to your required feature or purchase.
          </p>

          <p>So as when there is any complaints.</p>
        </div>
      </section>
      <div>
        <EmailComp/>
      </div>

      <FooterMain />
    </div>
  )
}

export default Contact