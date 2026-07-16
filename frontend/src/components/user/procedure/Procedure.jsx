import React from 'react';
import { motion } from 'motion/react';
import {
  FiShoppingBag,
  FiClipboard,
  FiUser,
  FiMail,
  FiPackage,
  FiTruck,
  FiCheckCircle,
} from 'react-icons/fi';

const Procedure = () => {
  const steps = [
    {
      icon: <FiShoppingBag size={28} />,
      title: 'Choose Your Favorites',
      description:
        'Browse our collections and add the pieces you love to your shopping bag before proceeding to checkout.',
    },
    {
      icon: <FiClipboard size={28} />,
      title: 'Place Your Order',
      description:
        'Review your selected items and confirm your order securely with just a few clicks.',
    },
    {
      icon: <FiUser size={28} />,
      title: 'Provide Your Details',
      description:
        'Enter your contact information so we can process your order, provide updates, and ensure a smooth delivery experience.',
    },
    {
      icon: <FiMail size={28} />,
      title: 'Receive Your Confirmation',
      description:
        'A confirmation email containing your unique Order ID will be sent immediately. Please keep this Order ID, as it may be requested during processing and delivery.',
    },
    {
      icon: <FiPackage size={28} />,
      title: 'Packaging & Processing',
      description:
        'Our team carefully prepares your order, verifies every item, and packages it securely before dispatch.',
    },
    {
      icon: <FiTruck size={28} />,
      title: 'Out for Delivery',
      description:
        'Your package is dispatched, and you will receive timely notifications so you can follow its journey to your doorstep.',
    },
    {
      icon: <FiCheckCircle size={28} />,
      title: 'Delivered Successfully',
      description:
        'Your order arrives safely. We hope every piece exceeds your expectations and becomes part of your signature style.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 ">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            How It Works
          </p>

          <h2 className="text-4xl md:text-6xl font-light leading-tight">
            From your cart
            <span className="font-semibold italic text-orange-500">
              {' '}to your doorstep.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            We've designed our ordering process to be simple, transparent,
            and reliable—keeping you informed every step of the way until
            your order arrives safely.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative">

          <div className="absolute left-7 top-0 h-full w-px bg-gray-200 hidden md:block"></div>

          <div className="space-y-10 grid grid-cols-1 md:grid-cols-2 gap-4">

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .45,
                  delay: index * .08,
                }}
                className="flex gap-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm">
                  {step.icon}
                </div>

                <div className="pb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Procedure;