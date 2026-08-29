import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import { CalendarPlus, Clock3, MapPin, Pencil, Star } from "lucide-react";

export default function CompanyProfile() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex min-h-[1641px] w-full max-w-[1920px] flex-col lg:flex-row">
        <CareCompanySidebar activeHref="/care-company/company-profile" />

        <div className="min-w-0 flex-1">
          <header className="flex min-h-[100px] items-center bg-white px-6 py-[26px]">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">Company Profile</h1>
              <p className="mt-2 text-xs leading-4 text-[#667481]">Your public company profile on the platform</p>
            </div>
          </header>

          <div className="space-y-6 p-4 sm:p-6">
            <div className="flex justify-end">
              <Link
                href="/care-company/company-profile/edit"
                className="flex h-[54px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2b6ea6] px-6 py-4 text-base font-semibold leading-5 text-white transition-colors hover:bg-[#245e8f]"
              >
                <Pencil className="h-4 w-4" strokeWidth={1.8} />
                Edit Profile
              </Link>
            </div>

            <section className="rounded-t-2xl bg-white p-6">
              <h2 className="text-[32px] font-semibold leading-10 text-[#203746]">Sunrise Care Group</h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-1">
                <div className="flex gap-0.5" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-[#eab308] text-[#eab308]" strokeWidth={1.5} />)}
                </div>
                <span className="text-sm font-semibold leading-4">4.8</span>
                <span className="text-xs leading-4 text-[#667481]">(142 reviews)</span>
              </div>
            </section>

            <div className="space-y-4">
              <ProfileCard title="About">
                <p className="max-w-[999px] text-base leading-5 text-[#667481]">
                  Sunrise Care Group has built a strong reputation for providing professional, compassionate, and reliable care services throughout Greater Manchester. Our dedicated team specialises in elderly care, dementia support, personal care, and assisted living, ensuring every individual receives personalised support that enhances their quality of life. By combining experienced professionals with a person-centred approach, we strive to make a meaningful difference for every client and their family.
                </p>
              </ProfileCard>

              <ProfileCard title="Services">
                <div className="flex flex-wrap items-center gap-2">
                  {["Residential Care", "Dementia Care", "Respite Care", "Home Care", "Day Services"].map((service) => (
                    <span key={service} className="flex h-6 items-center justify-center rounded-full bg-[#eaf1f6] px-3 text-center text-xs font-semibold leading-4 text-[#2b6ea6]">{service}</span>
                  ))}
                </div>
              </ProfileCard>

              <ProfileCard title="Service Hours">
                <div className="flex items-start gap-2 text-base leading-5 text-[#667481]">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#2b6ea6]" strokeWidth={1.7} />
                  <span>Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7</span>
                </div>
              </ProfileCard>

              <ProfileCard title="Others Information's">
                <dl className="w-full space-y-2 text-base leading-5">
                  <InfoRow label="Staff" value="320+" />
                  <InfoRow label="Locations" value="8" />
                  <InfoRow label="Rating" value="Outstanding (CQC)" />
                </dl>
              </ProfileCard>

              <ProfileCard title="Founded">
                <div className="flex items-center gap-1 text-base leading-5 text-[#667481]">
                  <CalendarPlus className="h-4 w-4 text-[#2b6ea6]" strokeWidth={1.4} /><span>2008</span>
                </div>
              </ProfileCard>

              <ProfileCard title="Service Area">
                <div className="flex items-center gap-1 text-base leading-5 text-[#667481]">
                  <MapPin className="h-4 w-4 text-[#2b6ea6]" strokeWidth={1.7} /><span>Manchester, Greater Manchester</span>
                </div>
              </ProfileCard>

              <ProfileCard title="Jobs">
                <div className="w-full space-y-6">
                  <Job title="Senior Care Assistant" details="Full-time · £24,000–£28,000" />
                  <Job title="Registered Nurse – Dementia Ward" details="Full-time · £38,000–£44,000" />
                  <Job title="Live-In Carer" details="Live-In · £600–£750/week" />
                </div>
              </ProfileCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-start gap-3 rounded-xl border border-[#f0f1f2] bg-white p-5">
      <h2 className="text-2xl font-semibold leading-7 text-[#203746]">{title}</h2>
      {children}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="text-[#667481]">{label}</dt>
      <dd className="text-right font-semibold text-[#2b6ea6]">{value}</dd>
    </div>
  );
}

function Job({ title, details }: { title: string; details: string }) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.10)]">
      <h3 className="text-lg font-semibold leading-5 text-[#2b6ea6]">{title}</h3>
      <p className="mt-2 text-sm leading-4 text-[#667481]">{details}</p>
    </article>
  );
}
