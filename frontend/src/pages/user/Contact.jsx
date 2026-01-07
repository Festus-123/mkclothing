import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import FooterMain from './Footer/FooterMain'
import EmailComp from './email/EmailComp'

const Contact = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <NavbarMain />

      {/* Header */}
      <section className="flex flex-col items-start p-4 w-full bg-linear-to-r from-red-500 via-orange-500 to-orange-600 py-24 text-white">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Contact Us</h1>
        <p className="max-w-xl mx-auto text-sm md:text-base opacity-90">
          We are excited to hear from you, know that we will get to you ASAP
        </p>
      </section>

      <div className='w-full'>

      {/* Tabs */}
      <div className="p-3 lg:p-4 mt-8 border-b border-amber-600">
        <div className="flex gap-4">
          <button className="cursor-pointer px-6 py-2 rounded-full bg-red-600 text-white text-sm">
            Email
          </button>
          <button className="cursor-pointer px-6 py-2 rounded-full border border-[#8b4a1f] text-[#8b4a1f] text-sm">
            Our Email: Others
          </button>
        </div>
      </div>

      {/* Description */}
      <section className="px-6 md:px-20 py-20 flex flex-col items-start justify-center gap-5">
        <h2 className="text-3xl md:text-4xl font-semibold  text-[#8b4a1f] mb-10">
          Description
        </h2>

        <div className="max-w-8xl mx-auto text-sm md:text-base text-[#8b4a1f] leading-relaxed space-y-6 ">
          <p>
            When any item you wish to purchase is clicked on you get redirected
            to the contact session where your item is displayed in the
            description tab below and then you enter your email as the company
            email is already set in then click send.
          

            Once you click send the email feature will open and you will be
            prompted to send email to the set email.
\
\            Within 24 hrs we will review your email and get back to you as soon
            as possible responding to your required feature or purchase.

            So as when there is any complaints.
            </p>
        </div>
      </section>

      <div className='w-full'>
        <EmailComp/>
      </div>

      {/* Footer Note */}
      <div className="mt-20 w-full p-4 lg:p-8 bg-linear-to-r from-orange-500 to-red-500 py-6 text-center text-white text-sm">
        Note if you dont recieve feedback after contacting us within 24hrs please wait a little more
      </div>
      </div>
      

      <FooterMain />
    </div>
  )
}

export default Contact