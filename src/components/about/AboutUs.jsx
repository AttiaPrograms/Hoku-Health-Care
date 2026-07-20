import React from "react";
import {Link} from "react-router-dom";
const AboutUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE - 3 IMAGES */}
          <div className="relative grid grid-cols-2 gap-4">

            {/* Large Image */}
            <div className="row-span-2">
              <img
                src="src/assets/images/photo1.jpg"
                alt="Healthcare"
                className="w-full h-[430px] object-cover rounded-2xl"
              />
            </div>

            {/* Top Right Image */}
            <div>
              <img
                src="src/assets/images/photo2.jpg"
                alt="Doctors"
                className="w-full h-[205px] object-cover rounded-2xl"
              />
            </div>

            {/* Bottom Right Image */}
            <div>
              <img
                src="src/assets/images/photo3.jpg"
                alt="Patient Care"
                className="w-full h-[205px] object-cover rounded-2xl"
              />
            </div>

            {/* HOKU HEALTH CARE CIRCLE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-32 h-32 bg-white rounded-full shadow-xl 
                            flex items-center justify-center z-10">

           

                <span className="font-bold text-[15px] leading-4 text-center">
  <span className="text-green-600">HOKU</span>
  <br />
  <span className="text-blue-600">HEALTH CARE</span>
</span>

        
            </div>

          </div>


          {/* RIGHT SIDE - TEXT */}
          <div>

            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">
              About Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Nourishing Lives, One
              <br />
              Home at a Time
            </h2>

            <p className="text-[#1A1A2E] text-base leading-8 mb-5 text-justify">
              ACCESS TO QUALITY HEALTHCARE IS A FUNDAMENTAL RIGHTTHAT EVERY 
              INDIVIDUAL DESERVES. ON TODAY'S SOCIETY HEALTHCARE SYSTEM PALY A
              CRUCIAL ROLE IN ENSURING THE WELL-BEING OF COMMUNITIES. HOWEVER
              DISPARITIES IN HEALTHCARE ACCESS AND OUTCOMES PRESIST,OFTEN DNS-
              PROPORTIONATELY AFFECTING MARGINALIZED POPULATIONS. EFFORTS TO
              ADDRESS THESE DISPARITIES MUST INCLUDE INITIATIVES TO IMPROVE
              ACCESS TO HEALTHCARE SERVICES.
            </p>

            <Link
              to ="/aboutpage"
              className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Learn More
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;