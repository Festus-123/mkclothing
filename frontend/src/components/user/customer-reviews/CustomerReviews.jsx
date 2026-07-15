import React from "react";
import { Customer_Reviews } from "../../../data/customer_reviews";

const CustomerReviews = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="max-w-3xl mb-16">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-6xl font-light leading-tight">
            What Our
            <span className="italic font-semibold text-orange-500">
              {" "}Customers Say
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            Every review reflects the experience of customers who have
            trusted M&amp;K to deliver premium fashion with exceptional
            service.
          </p>

        </div>

        {/* Reviews */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {Customer_Reviews.map((customer, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300"
            >

              {/* Customer */}

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-500">
                  {customer.image}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Verified Customer
                  </p>
                </div>

              </div>

              {/* Review */}

              <p className="leading-8 text-gray-600 italic">
                "{customer.review}"
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;