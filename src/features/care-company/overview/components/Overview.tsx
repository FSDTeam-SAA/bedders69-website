import Link from "next/link";
import {
  BriefcaseBusiness, CircleHelp, Files, UserRoundSearch, Wrench,
} from "lucide-react";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";

const metrics = [
  { value: "620", label: "Profile Views", icon: Files },
  { value: "8", label: "Active Jobs", icon: BriefcaseBusiness },
  { value: "47", label: "New Applicants", icon: Wrench },
  { value: "6", label: "Contact Requests", icon: UserRoundSearch },
];

const applicants = [
  { name: "James Okafor", role: "Senior Care Assistant", time: "10m ago" },
  { name: "Emma Williams", role: "Registered Nurse", time: "2h ago" },
  { name: "Priya Patel", role: "Support Worker", time: "Yesterday" },
  { name: "Michael Thompson", role: "Care Manager", time: "Yesterday" },
];

function PerformanceChart() {
  return (
    <section className="rounded-xl border border-[#e6e6e8] bg-white p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold leading-5 text-[#203746]">Profile Performance</h2>
        <CircleHelp className="h-5 w-5 text-[#525252]" strokeWidth={1.7} />
      </div>
      <p className="mt-2 text-sm leading-4 text-[#667481]">Last 6 weeks</p>
      <div className="mt-6 flex h-[288px] min-w-0">
        <div className="flex w-8 shrink-0 flex-col justify-between pb-5 text-xs leading-4 text-[#667481]">
          <span>800</span><span>600</span><span>400</span><span>200</span><span>0</span>
        </div>
        <div className="relative min-w-0 flex-1">
          <div className="absolute inset-x-0 top-2 border-t border-[#f4f4f5]" />
          <div className="absolute inset-x-0 top-[80px] border-t border-[#f4f4f5]" />
          <div className="absolute inset-x-0 top-[152px] border-t border-[#f4f4f5]" />
          <div className="absolute inset-x-0 top-[224px] border-t border-[#f4f4f5]" />
          <svg viewBox="0 0 1200 245" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[245px] w-full overflow-visible" aria-label="Profile performance over six weeks">
            <defs><linearGradient id="views-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2b6ea6" stopOpacity="0.20" /><stop offset="100%" stopColor="#ffffff" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 91 C75 90 78 125 162 119 S271 61 340 59 S426 117 510 117 S588 152 680 158 S778 160 846 156 S934 112 1004 119 S1090 166 1200 163" fill="none" stroke="#e4e7e8" strokeWidth="4" />
            <path d="M0 155 C73 135 107 101 169 101 S274 139 347 133 S425 72 491 70 S557 23 620 27 S676 24 720 47 S792 24 852 11 S929 6 981 45 S1037 76 1072 108 S1144 87 1200 86 L1200 245 L0 245 Z" fill="url(#views-fill)" />
            <path d="M0 155 C73 135 107 101 169 101 S274 139 347 133 S425 72 491 70 S557 23 620 27 S676 24 720 47 S792 24 852 11 S929 6 981 45 S1037 76 1072 108 S1144 87 1200 86" fill="none" stroke="#2b6ea6" strokeWidth="4" strokeLinecap="round" />
            <line x1="900" y1="35" x2="900" y2="223" stroke="#2b6ea6" strokeOpacity=".45" strokeDasharray="5 5" /><circle cx="900" cy="35" r="9" fill="#2b6ea6" stroke="white" strokeWidth="5" />
          </svg>
          <div className="absolute left-[66%] top-[-20px] z-10 hidden w-40 rounded-lg border border-[#e6e6e8] bg-white px-4 py-3 text-xs leading-4 shadow-[0_8px_16px_rgba(50,50,71,0.06),0_8px_8px_rgba(50,50,71,0.08)] sm:block">
            <p className="text-[#203746]">W5</p><p className="mt-1 text-[#667481]">Views : 512</p><p className="text-[#ceab52]">Clicks : 78</p><p className="text-[#308055]">Contacts : 16</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs leading-4 text-[#667481]">{["W1", "W2", "W3", "W4", "W5", "W6"].map((week) => <span key={week}>{week}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function RecentApplicants() {
  return (
    <section className="rounded-xl border border-[#e6e6e8] bg-white p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div><h2 className="text-lg font-semibold leading-5 text-[#203746]">Recent Applicants</h2><p className="mt-2 text-sm leading-4 text-[#667481]">Latest leads from customers</p></div>
        <Link href="/care-company/applicants" className="text-lg font-semibold leading-5 text-[#2b6ea6] underline underline-offset-2">View All</Link>
      </div>
      <div className="mt-4">
        {applicants.map((applicant, index) => (
          <div key={applicant.name} className={`grid min-h-[72px] grid-cols-[1.25fr_1fr_auto] items-center gap-3 px-4 py-2 ${index < applicants.length - 1 ? "border-b border-[#e6e6e8]" : ""}`}>
            <p className="text-base font-medium leading-5 text-[#203746]">{applicant.name}</p><p className="truncate text-center text-xs leading-4 text-[#667481]">{applicant.role}</p><p className="text-right text-xs leading-4 text-[#667481]">{applicant.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Overview() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col lg:flex-row">
        <CareCompanySidebar activeHref="/care-company/dashboard-overview" />
        <div className="min-w-0 flex-1">
          <header className="flex min-h-[100px] items-center bg-white px-6 py-[26px]">
            <div><h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">Good morning, Sarah!</h1><p className="mt-2 text-xs leading-4 text-[#667481]">Here&apos;s what&apos;s happening with Sunrise Care Services today</p></div>
          </header>
          <div className="space-y-6 p-4 sm:p-6">
            <section className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
              {metrics.map(({ value, label, icon: Icon }) => (
                <article key={label} className="flex h-[139px] items-center justify-between rounded-lg bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.10)]">
                  <div><p className="text-[32px] font-bold leading-10 text-[#2b6ea6]">{value}</p><p className="mt-1 text-sm leading-4 text-[#616161]">{label}</p></div>
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#e8ebec] text-[#2b6ea6]"><Icon className="h-6 w-6" strokeWidth={1.8} /></div>
                </article>
              ))}
            </section>
            <PerformanceChart />
            <RecentApplicants />
          </div>
        </div>
      </div>
    </main>
  );
}
