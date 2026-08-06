import React from "react";
import { Calendar, Clock, DollarSign, Star, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/button";

export function CarersPage() {
  const stats = [
    { label: "Completed Jobs", value: "38", icon: Briefcase, color: "text-emerald-400 bg-emerald-950/30 border-emerald-900/30" },
    { label: "Hours Worked", value: "142h", icon: Clock, color: "text-blue-400 bg-blue-950/30 border-blue-900/30" },
    { label: "Earnings This Month", value: "$3,450", icon: DollarSign, color: "text-amber-400 bg-amber-950/30 border-amber-900/30" },
    { label: "Average Rating", value: "4.9", icon: Star, color: "text-purple-400 bg-purple-950/30 border-purple-900/30" },
  ];

  const upcomingVisits = [
    { id: 1, client: "Alice Smith", time: "Tomorrow, 09:00 AM - 12:00 PM", task: "Elderly Care & Companion", address: "123 Elm St, NY" },
    { id: 2, client: "Robert Johnson", time: "Aug 8, 02:00 PM - 05:00 PM", task: "Physical Therapy Assistant", address: "456 Oak Ave, NJ" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-emerald-600/5 blur-[80px] pointer-events-none" />
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">John!</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md">
            You have 2 scheduled visits this week. Keep up the excellent work! Your current performance rating is top-tier.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" className="shadow-lg shadow-emerald-500/10 !bg-gradient-to-r !from-emerald-600 !to-teal-600 !hover:from-emerald-500 !hover:to-teal-500">
            Find New Jobs
          </Button>
          <Button variant="secondary" className="border border-zinc-800">
            View Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-zinc-100">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" /> Upcoming Visits
            </h3>
            <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-900 hover:border-zinc-800 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-zinc-200">{visit.client}</h4>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-zinc-500">{visit.task}</span>
                  </div>
                  <p className="text-sm text-zinc-400 font-mono">{visit.time}</p>
                  <p className="text-xs text-zinc-500">{visit.address}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full md:w-auto border-zinc-800">
                  Manage Visit
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tips & Performance */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Checklist & Guidelines
          </h3>
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900" />
              <div>
                <p className="text-sm text-zinc-300 font-medium">Verify credentials upload</p>
                <p className="text-xs text-zinc-500">Your background screening will expire in 60 days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900" />
              <div>
                <p className="text-sm text-zinc-300 font-medium">Check messages from Alice</p>
                <p className="text-xs text-zinc-500">She left a note regarding tomorrow's medication times.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900" />
              <div>
                <p className="text-sm text-zinc-300 font-medium">Set weekly availability</p>
                <p className="text-xs text-zinc-500">Update your calendar slots for August 10th - 17th.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
