import React, { useState } from "react";
import DoctorManagement from './DoctorManagement'
import PatientManagement from './PatientManagement'
import AppointmentManagement from './AppointmentManagement'
import ServiceManagement from './ServiceManagement'
import ReviewManagement from './ReviewManagement'
import ReminderManagement from './ReminderManagement'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutGrid,
  Stethoscope,
  Users,
  CalendarCheck,
  HeartPulse,
  Star,
  Bell,
  UserPlus,
  BriefcaseMedical,
  CalendarDays,
  Users2,
  Menu,
  X,
  ChevronDown,
  Search,
  Cross,
  LogOut,
} from "lucide-react";

// ---- Sidebar navigation items ----
const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Doctor Management", icon: Stethoscope },
  { label: "Patient Management", icon: Users },
  { label: "Appointment Management", icon: CalendarCheck },
  { label: "Service Management", icon: HeartPulse },
  { label: "Review Management", icon: Star },
  {label: "Reminder Management", icon: Bell},
];

// ---- Stat cards mock data ----
const stats = [
  { label: "Total Doctors", value: "120", delta: "+12 this month", icon: Stethoscope, iconBg: "bg-blue-500", cardBg: "bg-blue-50", lineColor: "#3b82f6", spark: [10, 14, 12, 18, 16, 22, 20] },
  { label: "Total Patients", value: "850", delta: "+85 this month", icon: Users, iconBg: "bg-emerald-500", cardBg: "bg-emerald-50", lineColor: "#10b981", spark: [20, 18, 25, 22, 30, 28, 34] },
  { label: "Total Appointments", value: "240", delta: "+28 this week", icon: CalendarCheck, iconBg: "bg-violet-500", cardBg: "bg-violet-50", lineColor: "#8b5cf6", spark: [15, 22, 18, 26, 20, 24, 30] },
  { label: "Total Services", value: "35", delta: "+5 this month", icon: HeartPulse, iconBg: "bg-amber-500", cardBg: "bg-amber-50", lineColor: "#f59e0b", spark: [8, 12, 10, 14, 12, 16, 14] },
  { label: "Total Reviews", value: "180", delta: "+20 this month", icon: Star, iconBg: "bg-rose-500", cardBg: "bg-rose-50", lineColor: "#f43f5e", spark: [12, 16, 14, 10, 18, 16, 22] },
  { label: "Total Reminders", value: "95", delta: "+10 this week", icon: Bell, iconBg: "bg-teal-500", cardBg: "bg-teal-50", lineColor: "#14b8a6", spark: [6, 10, 8, 12, 10, 14, 12] },
];

// ---- Recent appointments mock data ----
const recentAppointments = [
  { id: 1, patient: "Ayesha Khan", doctor: "Dr. Sana Malik", date: "12 Jan 2026", time: "10:30 AM", status: "Approved" },
  { id: 2, patient: "Fatima Noor", doctor: "Dr. Bilal Ahmed", date: "13 Feb 2026", time: "11:00 AM", status: "Pending" },
  { id: 3, patient: "Hamza Tariq", doctor: "Dr. Imran Shah", date: "14 Mar 2025", time: "01:00 PM", status: "Cancelled" },
  { id: 4, patient: "Ayesha Khan", doctor: "Dr. Hina Raza", date: "14 Apr 2024", time: "04:30 PM", status: "Approved" },
  { id: 5, patient: "Usman Ali", doctor: "Dr. Bilal Ahmed", date: "15 Apr 2024", time: "09:00 AM", status: "Pending" },
];

// ---- Status badge styles ----
const statusStyles = { Approved: "bg-emerald-50 text-emerald-600", Pending: "bg-amber-50 text-amber-600", Cancelled: "bg-rose-50 text-rose-600" };

// ---- Quick actions buttons ----
const quickActions = [ { label: "Add Doctor", icon: UserPlus, tint: "bg-blue-100 text-blue-600" }, { label: "Add Service", icon: BriefcaseMedical, tint: "bg-emerald-100 text-emerald-600" }, { label: "View Appointments", icon: CalendarDays, tint: "bg-violet-100 text-violet-600" }, { label: "View Patients", icon: Users2, tint: "bg-amber-100 text-amber-600" } ];

// ---- Chart data ----
const overviewData = [ { date: "6 Jul", value: 30 }, { date: "7 Jul", value: 45 }, { date: "8 Jul", value: 42 }, { date: "9 Jul", value: 60 }, { date: "10 Jul", value: 52 }, { date: "11 Jul", value: 65 }, { date: "12 Jul", value: 85 } ];

const statusData = [ { name: "Approved", value: 120, color: "#10b981" }, { name: "Pending", value: 80, color: "#f59e0b" }, { name: "Cancelled", value: 40, color: "#ef4444" } ];

const totalAppointments = statusData.reduce((s, d) => s + d.value, 0);

export default function Dashboard() {
  // State for mobile sidebar toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for active page
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Mobile overlay when sidebar is open */}
      {mobileOpen && ( <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" /> )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-64 h-screen bg-[#0B1220] flex-col z-40 transition-transform duration-300 ${ mobileOpen? "translate-x-0" : "-translate-x-full " } lg:translate-x-0`}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-5 h-20 border-b border-white/5">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0"><Cross size={20} strokeWidth={2.5} /></div>
          <div className="leading-tight"><p className="text-white font-bold text-[15px]">HealthCare</p><p className="text-slate-400 text-xs">Admin Panel</p></div>
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-slate-400 lg:hidden"><X size={20} /></button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => { setActive(label); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${ active === label? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white" }`}>
              <Icon size={18} strokeWidth={2} />{label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-3 py-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-rose-400 transition-colors"><LogOut size={18} />Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex-col ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="text-slate-500 lg:hidden"><Menu size={24} /></button>
            <h1 className="text-xl font-bold text-slate-900">{active}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input placeholder="Search..." className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <button className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-500"><Bell size={19} /><span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">3</span></button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">A</div>
              <div className="hidden sm:block leading-tight"><p className="text-sm font-semibold text-slate-800">Admin</p><p className="text-xs text-slate-400">Super Admin</p></div>
              <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 bg-slate-50 p-4 md:p-8">

          {/* Dashboard Page */}
          {active === "Dashboard" && (
            <>
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
                {stats.map(({ label, value, delta, icon: Icon, iconBg, cardBg, lineColor, spark }) => (
                  <div key={label} className={`rounded-2xl ${cardBg} p-5 flex items-center gap-4`}>
                    <div className={`h-14 w-14 shrink-0 rounded-2xl ${iconBg} text-white flex items-center justify-center`}><Icon size={24} /></div>
                    <div className="flex-1 min-w-0"><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p><p className="text-xs font-medium text-emerald-600">{delta}</p></div>
                    <div className="w-20 h-12 shrink-0 hidden sm:block"><ResponsiveContainer width="100%" height="100%"><LineChart data={spark.map((v) => ({ v }))}><Line type="monotone" dataKey="v" stroke={lineColor} strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
                  </div>
                ))}
              </div>

              {/* Recent Appointments and Quick Actions */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-2 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-slate-900">Recent Appointments</h2><button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">View All</button></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100"><th className="py-2.5 pr-3 font-semibold">#</th><th className="py-2.5 pr-3 font-semibold">Patient</th><th className="py-2.5 pr-3 font-semibold">Doctor</th><th className="py-2.5 pr-3 font-semibold">Date</th><th className="py-2.5 pr-3 font-semibold">Time</th><th className="py-2.5 pr-3 font-semibold">Status</th></tr></thead>
                      <tbody>{recentAppointments.map((a, i) => (<tr key={a.id} className="border-b border-slate-50 last:border-0"><td className="py-3 pr-3 text-slate-400">{i + 1}</td><td className="py-3 pr-3"><div className="flex items-center gap-2.5"><div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold">{a.patient.split(" ").map((n) => n[0]).join("")}</div><span className="font-medium text-slate-800">{a.patient}</span></div></td><td className="py-3 pr-3 text-slate-600">{a.doctor}</td><td className="py-3 pr-3 text-slate-600">{a.date}</td><td className="py-3 pr-3 text-slate-600">{a.time}</td><td className="py-3 pr-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${statusStyles[a.status]}`}>{a.status}</span></td></tr>))}</tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2><div className="grid grid-cols-2 gap-3">{quickActions.map(({ label, icon: Icon, tint }) => (<button key={label} className="flex flex-col items-center justify-center gap-2 rounded-xl border-slate-100 py-5 hover:bg-slate-50 transition-colors"><div className={`h-11 w-11 rounded-full ${tint} flex items-center justify-center`}><Icon size={20} /></div><span className="text-xs font-medium text-slate-700 text-center px-1">{label}</span></button>))}</div></div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h2 className="font-bold text-slate-900 mb-4">Appointments Overview</h2><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={overviewData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}><defs><linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} /><XAxis dataKey="date" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#overviewFill)" dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} /></AreaChart></ResponsiveContainer></div></div>
                <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h2 className="font-bold text-slate-900 mb-4">Appointments by Status</h2><div className="h-40 relative"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={75} paddingAngle={3} stroke="none">{statusData.map((d) => (<Cell key={d.name} fill={d.color} />))}</Pie></PieChart></ResponsiveContainer></div><div className="space-y-2.5 mt-4">{statusData.map((d) => (<div key={d.name} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />{d.name}</span><span className="font-medium text-slate-800">{d.value} ({Math.round((d.value / totalAppointments) * 100)}%)</span></div>))}</div></div>
              </div>
            </>
          )}

          {/* Other Pages */}
          {active === "Doctor Management" && <DoctorManagement />}
          {active === "Patient Management" && <PatientManagement />}
          {active === "Appointment Management" && <AppointmentManagement/>}
          {active === "Service Management" && <ServiceManagement/>}
          {active === "Review Management" && <ReviewManagement/>}
          {active == "Reminder Management" && <ReminderManagement/>}

        </main>
      </div>
    </div>
  );
}