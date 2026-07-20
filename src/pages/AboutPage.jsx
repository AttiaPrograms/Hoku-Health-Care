import React from "react";

const icons = {
  compassion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </svg>
  ),
  trust: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  accessibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="4" r="2" />
      <path d="M19 8h-5.5l-2 3-2-3H4M9 11l-3 9M15 11l3 9M9 11l3 3 3-3" />
    </svg>
  ),
};

const values = [
  {
    key: "compassion",
    title: "Compassion",
    text: "We care for every patient with kindness, empathy, and respect.",
  },
  {
    key: "quality",
    title: "Quality",
    text: "We are committed to providing professional and high-quality care.",
  },
  {
    key: "trust",
    title: "Trust",
    text: "We build strong relationships through reliable and transparent healthcare.",
  },
  {
    key: "accessibility",
    title: "Accessibility",
    text: "We make healthcare services easier and more convenient for patients and families.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-[#F5F5F5] font-['Inter']">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-sm tracking-widest font-semibold text-white/80 mb-3 uppercase">
            About Us
          </span>
          <h1 className="font-['Poppins'] text-5xl font-bold mb-4">
            About HOKU Health Care
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-white/90">
            Delivering compassionate, reliable, and professional healthcare
            services at home for every patient.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h2 className="font-['Poppins'] text-3xl font-bold text-[#1A1A2E] mb-6">
              Our Story
            </h2>
            <p className="text-[#374151] leading-8 text-justify">
              Hoku Health Care is a trusted home healthcare platform dedicated to providing compassionate and professional healthcare services in the comfort of patients' homes. We connect patients and families with reliable healthcare support, making quality care more accessible and convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h2 className="font-['Poppins'] text-3xl font-bold text-[#1A1A2E] mb-6">
              Our Mission
            </h2>
            <p className="text-[#374151] leading-8 text-justify">
              Our mission is to provide high-quality, accessible, and compassionate healthcare services to every patient. Through Home Health, Palliative Care, and Hospice Care, we aim to support patients and their families with professional care whenever they need it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Poppins'] text-3xl font-bold text-[#1A1A2E] mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.key}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-5">
                  {icons[v.key]}
                </div>
                <h3 className="font-['Poppins'] text-lg font-bold text-[#1565C0] mb-3">
                  {v.title}
                </h3>
                <p className="text-[#374151] leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;