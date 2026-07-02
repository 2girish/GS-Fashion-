import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className="w-full min-h-screen md:min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center py-16 md:py-20">

      {/* Title */}
      <div className="w-full text-center px-4">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="mt-3 text-blue-100 text-sm md:text-xl">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="w-full max-w-7xl mx-auto mt-12 px-6 flex flex-wrap justify-center gap-10">

        {/* Exchange Policy */}
        <div className="w-full sm:w-[320px] flex flex-col items-center text-center gap-4">
          <RiExchangeFundsLine className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />
          <h2 className="text-[#a5e8f7] font-semibold text-xl md:text-2xl">
            Easy Exchange Policy
          </h2>
          <p className="text-white text-sm md:text-base">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Return Policy */}
        <div className="w-full sm:w-[320px] flex flex-col items-center text-center gap-4">
          <TbRosetteDiscountCheckFilled className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />
          <h2 className="text-[#a5e8f7] font-semibold text-xl md:text-2xl">
            7 Days Return Policy
          </h2>
          <p className="text-white text-sm md:text-base">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Customer Support */}
        <div className="w-full sm:w-[320px] flex flex-col items-center text-center gap-4">
          <BiSupport className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />
          <h2 className="text-[#a5e8f7] font-semibold text-xl md:text-2xl">
            Best Customer Support
          </h2>
          <p className="text-white text-sm md:text-base">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>

    </div>
  );
}

export default OurPolicy;