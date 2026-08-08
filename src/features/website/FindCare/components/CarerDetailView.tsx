"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, CheckCircle, Award, Calendar, MessageCircle } from "lucide-react";

export const CarerDetailView = () => {
  const params = useParams();
  const id = params.id as string;

  // Decode ID from slug
  const decodedId = id ? decodeURIComponent(id).toLowerCase().replace(/-/g, " ") : "";

  const carersData = [
    {
      name: "Matthew Warkentin",
      rating: "4.9",
      reviews: 67,
      location: "London, N1",
      experience: "8 years experience",
      available: "Available Immediately",
      rate: "$150/hrs",
      image: "",
      bio: "Matthew Warkentin is a compassionate and dedicated professional carer with over 8 years of experience supporting older adults and individuals with complex care needs. He specialises in residential care, dementia support, personal care, respite care, and medication assistance. Known for his patient-centred approach, Matthew is committed to promoting dignity, independence, and well-being while building trusted relationships with clients and their families. His goal is to deliver high-quality, compassionate care tailored to each individual's unique needs.",
      skills: ["Dementia Care", "Medication Admin", "Palliative Care", "Mental Health", "Night Shifts"],
      qualifications: [
        "NVQ Level 3 Health & Social Care",
        "First Aid Certificate (2023)",
        "Dementia Care Training"
      ],
      serviceArea: "London, Greater London",
      availabilityText: "Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7 · Weekends · Day Shifts · Night Shifts · Live-In"
    },
    {
      name: "Sarah Palmer",
      rating: "4.7",
      reviews: 55,
      location: "Birmingham, B2",
      experience: "5 years experience",
      available: "Available Immediately",
      rate: "$120/hrs",
      image: "/images/carer-female.png",
      bio: "Sarah Palmer is a dedicated and enthusiastic Support Worker with a focus on mental health, emotional well-being, and crisis intervention. She has over 5 years of experience assisting clients in outpatient and residential settings, offering empathetic listening, personal care support, and guidance to help individuals achieve their goals.",
      skills: ["Mental Health Support", "Crisis Intervention", "Companionship", "Personal Care", "Respite Care"],
      qualifications: [
        "NVQ Level 2 Health & Social Care",
        "Crisis Intervention Specialist Certificate",
        "First Aid & CPR Certified"
      ],
      serviceArea: "Birmingham, West Midlands",
      availabilityText: "Mon–Fri 8am–5pm · Weekends · Day Shifts"
    },
    {
      name: "John Smith",
      rating: "4.8",
      reviews: 80,
      location: "Manchester, M1",
      experience: "6 years experience",
      available: "Available Immediately",
      rate: "$140/hrs",
      image: "/images/carer-male.png",
      bio: "John Smith is an experienced and caring Home Carer specialized in personal care, companionship, and support for individuals with mobility challenges. He is dedicated to helping seniors live independently at home, assisting with daily activities, nutrition, and light housekeeping with a warm and positive attitude.",
      skills: ["Personal Care", "Companionship", "Respite Care", "Dementia Care", "Meal Preparation"],
      qualifications: [
        "Care Certificate (UK Standard)",
        "Safe Handling of Medication",
        "Moving & Handling Certification"
      ],
      serviceArea: "Manchester, Greater Manchester",
      availabilityText: "Mon–Fri 9am–7pm · Sat 10am–4pm · Day Shifts · Weekends"
    }
  ];

  // Find carer matching path or default to first
  const carer = carersData.find(c => c.name.toLowerCase() === decodedId) || carersData[0];

  return (
    <main className="w-full bg-[#F4F7FC] min-h-screen pb-16 font-['Wix_Madefor_Text']">
      
      {/* Hero Banner */}
      <section
        className="w-full bg-cover bg-center py-16 md:py-24 px-6 text-center text-white relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('/images/services_hero.jpg')`
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold leading-tight font-['Wix_Madefor_Text']">
            Meet Your Trusted Care Professional
          </h1>
          <p className="text-sm md:text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore the profile of a verified care professional, including their experience, skills, certifications, and areas of expertise.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header info profile card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              
              {/* Profile Image/Placeholder */}
              {carer.image ? (
                <div className="size-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                  <img src={carer.image} alt={carer.name} className="w-full h-full object-cover object-top" />
                </div>
              ) : (
                <div className="size-32 rounded-2xl bg-[#BCC4CD] flex flex-col justify-center items-center p-3 relative shrink-0 border border-slate-100/60">
                  <p className="text-white text-[10px] font-bold text-center leading-relaxed font-['Poppins']">
                    Individual chose not to show their photo
                  </p>
                </div>
              )}

              {/* Text Info */}
              <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1B2C54]">
                    {carer.name}
                  </h2>
                  
                  {/* Badges */}
                  <div className="flex justify-center sm:justify-start items-center gap-2">
                    <span className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Premium
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Rating & Location line */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-500 text-sm mt-1">
                  <div className="flex items-center gap-1 font-semibold">
                    <MapPin className="size-4 text-slate-400" />
                    <span>{carer.location}</span>
                  </div>
                  
                  <span className="hidden sm:inline text-slate-200">•</span>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-transparent" />
                      ))}
                    </div>
                    <span className="text-slate-700 font-bold ml-1">{carer.rating}</span>
                    <span className="text-slate-400">({carer.reviews} reviews)</span>
                  </div>
                </div>

                {/* Extra Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-500 text-sm mt-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Award className="size-4 text-[#0A66C2]" />
                    <span>{carer.experience}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-200">•</span>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle className="size-4 text-emerald-600" />
                    <span>{carer.available}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* About Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                About
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                {carer.bio}
              </p>
            </div>

            {/* Skills & Specialisms Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                Skills & Specialisms
              </h3>
              <div className="flex flex-wrap gap-2">
                {carer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-4 py-2 rounded-xl border border-blue-100/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                Availability
              </h3>
              <div className="flex gap-3 items-start text-slate-500 text-sm md:text-base font-medium">
                <Calendar className="size-5 text-[#0A66C2] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {carer.availabilityText}
                </p>
              </div>
            </div>

            {/* Qualifications Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                Qualifications
              </h3>
              <div className="flex flex-col gap-3">
                {carer.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-slate-600 text-sm font-medium">
                    <CheckCircle className="size-4.5 text-emerald-600 shrink-0" />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Area Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                Service Area
              </h3>
              <div className="flex gap-3 items-center text-slate-500 text-sm md:text-base font-medium">
                <MapPin className="size-5 text-[#0A66C2] shrink-0" />
                <span>{carer.serviceArea}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Contact Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <h4 className="text-base font-bold text-slate-800">
                Contact Carer
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Send a message directly via WhatsApp to discuss care services and bookings.
              </p>
              
              <a
                href="https://wa.me/#"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA56] text-white py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98]"
              >
                <MessageCircle className="size-5 fill-current" />
                Contact
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};
