import React, { useState } from "react";
import DoctorManagement from './DoctorManagement';
import PatientManagement from './PatientManagement';
import AppointmentManagement from './AppointmentManagement';
import ServiceManagement from './ServiceManagement';
import ReviewManagement from './ReviewManagement';
import ReminderManagement from './ReminderManagement';

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
  Plus, // Cross nahi hota lucide me, Plus use kiya
  LogOut,
} from "lucide-react";

// ---- HOKU Brand Colors ----
const COLORS = {
  primary: "#2E7D32", // Health Green
  secondary: "#1565C0", // Trust Blue
  dark: "#1A1A2E", // Dark Text
  light: "#6B7280", // Light Text
  bg: "#F5F5F5",
  danger: "#D32F2F"
};

// ---- Sidebar navigation items ----
const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Doctor Management", icon: Stethoscope },
  { label: "Patient Management", icon: Users },
  { label: "Appointment Management", icon: CalendarCheck },
  { label: "Service Management", icon: HeartPulse },
  { label: "Review Management", icon: Star },
  { label: "Reminder Management", icon: Bell },
];

// ---- Stat cards mock data ----
const stats = [
  { label: "Total Doctors", value: "120", delta: "+12 this month", icon: Stethoscope, iconBg: "bg-[#1565C0]/10 text-[#1565C0]", lineColor: COLORS.secondary, spark: [10, 14, 12, 18, 16, 22, 20] },
  { label: "Total Patients", value: "850", delta: "+85 this month", icon: Users, iconBg: "bg-[#2E7D32]/10 text-[#2E7D32]", lineColor: COLORS.primary, spark: [20, 18, 25, 22, 30, 28, 34] },
  { label: "Total Appointments", value: "240", delta: "+28 this week", icon: CalendarCheck, iconBg: "bg-[#1565C0]/10 text-[#1565C0]", lineColor: COLORS.secondary, spark: [15, 22, 18, 26, 20, 24, 30] },
  { label: "Total Services", value: "35", delta: "+5 this month", icon: HeartPulse, iconBg: "bg-[#2E7D32]/10 text-[#2E7D32]", lineColor: COLORS.primary, spark: [8, 12, 10, 14, 12, 16, 14] },
  { label: "Total Reviews", value: "180", delta: "+20 this month", icon: Star, iconBg: "bg-[#1565C0]/10 text-[#1565C0]", lineColor: COLORS.secondary, spark: [12, 16, 14, 10, 18, 16, 22] },
  { label: "Total Reminders", value: "95", delta: "+10 this week", icon: Bell, iconBg: "bg-[#2E7D32]/10 text-[#2E7D32]", lineColor: COLORS.primary, spark: [6, 10, 8, 12, 10, 14, 12] },
];

// ---- Recent appointments mock data ----
const recentAppointments = [
  { id: 1, patient: "Ayesha Khan", doctor: "Dr. Sana Malik", date: "18 July 2026", time: "10:30 AM", status: "Confirmed" },
  { id: 2, patient: "Fatima Noor", doctor: "Dr. Bilal Ahmed", date: "19 July 2026", time: "11:00 AM", status: "Pending" },
  { id: 3, patient: "Hamza Tariq", doctor: "Dr. Imran Shah", date: "19 July 2026", time: "01:00 PM", status: "Cancelled" },
  { id: 4, patient: "Ayesha Khan", doctor: "Dr. Hina Raza", date: "20 July 2026", time: "04:30 PM", status: "Confirmed" },
  { id: 5, patient: "Usman Ali", doctor: "Dr. Bilal Ahmed", date: "21 July 2026", time: "09:00 AM", status: "Pending" },
];

// ---- Status badge styles ----
const statusStyles = {
  Confirmed: "bg-[#2E7D32]/10 text-[#2E7D32]",
  Pending: "bg-[#6B7280]/10 text-[#6B7280]",
  Cancelled: "bg-[#D32F2F]/10 text-[#D32F2F]"
};

// ---- Quick actions buttons ----
const quickActions = [
  { label: "Add Doctor", icon: UserPlus, tint: "bg-[#1565C0]/10 text-[#1565C0]", page: "Doctor Management" },
  { label: "Add Service", icon: BriefcaseMedical, tint: "bg-[#2E7D32]/10 text-[#2E7D32]", page: "Service Management" },
  { label: "View Appointments", icon: CalendarDays, tint: "bg-[#1565C0]/10 text-[#1565C0]", page: "Appointment Management" },
  { label: "View Patients", icon: Users2, tint: "bg-[#2E7D32]/10 text-[#2E7D32]", page: "Patient Management" },
];

// ---- Chart data ----
const overviewData = [
  { date: "6 Jul", value: 30 },
  { date: "7 Jul", value: 45 },
  { date: "8 Jul", value: 42 },
  { date: "9 Jul", value: 60 },
  { date: "10 Jul", value: 52 },
  { date: "11 Jul", value: 65 },
  { date: "12 Jul", value: 85 }
];

const statusData = [
  { name: "Confirmed", value: 120, color: COLORS.primary },
  { name: "Pending", value: 80, color: COLORS.light },
  { name: "Cancelled", value: 40, color: COLORS.danger }
];

const totalAppointments = statusData.reduce((s, d) => s + d.value, 0);

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">

      {/* Mobile overlay - sirf mobile me dikhega */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
        />
      )}

      {/* Sidebar - Mobile: slide, Desktop: fixed */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-[#1A1A2E] flex flex-col z-40 transition-transform duration-300 ${
          mobileOpen? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`} // lg pe hamesha open
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-5 h-20 border-b border-white/5 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-[15px]">HealthCare</p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-slate-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links - scrollable */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActive(label); // active page change
                setMobileOpen(false); // mobile me sidebar band
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[8px] text-sm font-medium transition-colors ${
                active === label
                ? "bg-[#2E7D32] text-white shadow-lg" // Active = Green
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="px-3 py-4 border-t border-white/5 shrink-0">
          <button
            onClick={() => {
              const confirmLogout = window.confirm("Are you sure you want to logout?");
              if (confirmLogout) {
                setMobileOpen(false); // mobile sidebar band
                // Router nahi hai isliye direct login page pe bhej do
                window.location.href = "/login"; // <-- Yahan login page ka URL daalo
                // Example: window.location.href = "/login.html";
              }
            }}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-[8px] text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-rose-400 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col lg:ml-64 w-full">

        {/* Header - Sticky */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-5 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="text-slate-500 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-[#1A1A2E] truncate">{active}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Tablet+ */}
            <div className="relative hidden md:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search..."
                className="w-40 lg:w-56 rounded-[8px] border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#2E7D32] text-[10px] text-white flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-slate-200 cursor-pointer">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center text-sm font-semibold">
                A
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-[#1A1A2E]">Admin</p>
                <p className="text-xs text-[#6B7280]">Super Admin</p>
              </div>
              <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main Page Content - Responsive Padding */}
        <main className="flex-1 bg-[#F5F5F5] p-3 sm:p-4 md:p-6 lg:p-8">

          {/* Dashboard Page */}
          {active === "Dashboard" && (
            <>
              {/* Stat Cards Grid - Mobile:1, Tablet:2, Desktop:3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">
                {stats.map(({ label, value, delta, icon: Icon, iconBg, lineColor, spark }) => (
                  <div
                    key={label}
                    className="rounded-[12px] bg-white p-4 sm:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center gap-4"
                  >
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-[12px] ${iconBg} flex items-center justify-center`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[#6B7280]">{label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-[#1A1A2E]">{value}</p>
                      <p className="text-xs font-medium text-[#2E7D32]">{delta}</p>
                    </div>
                    {/* Spark chart - Tablet+ */}
                    <div className="w-16 h-10 sm:w-20 sm:h-12 shrink-0 hidden sm:block">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={spark.map((v) => ({ v }))}>
                          <Line type="monotone" dataKey="v" stroke={lineColor} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Appointments + Quick Actions */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">

                {/* Recent Appointments */}
                <div className="xl:col-span-2 rounded-[12px] bg-white p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-[#1A1A2E] text-base sm:text-lg">Recent Appointments</h2>
                    <button className="text-xs font-semibold text-[#1565C0] bg-[#1565C0]/10 px-3 py-1.5 rounded-[8px] hover:bg-[#1565C0]/20">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-[#6B7280] border-b border-slate-100">
                          <th className="py-2.5 pr-3 font-semibold">#</th>
                          <th className="py-2.5 pr-3 font-semibold">Patient</th>
                          <th className="py-2.5 pr-3 font-semibold hidden sm:table-cell">Doctor</th>
                          <th className="py-2.5 pr-3 font-semibold hidden md:table-cell">Date</th>
                          <th className="py-2.5 pr-3 font-semibold">Time</th>
                          <th className="py-2.5 pr-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAppointments.map((a, i) => (
                          <tr key={a.id} className="border-b border-slate-50 last:border-0">
                            <td className="py-3 pr-3 text-[#6B7280]">{i + 1}</td>
                            <td className="py-3 pr-3">
                              <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-full bg-slate-100 text-[#1A1A2E] flex items-center justify-center text-xs font-semibold">
                                  {a.patient.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <span className="font-medium text-[#1A1A2E] truncate">{a.patient}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-3 text-[#1A1A2E] hidden sm:table-cell">{a.doctor}</td>
                            <td className="py-3 pr-3 text-[#1A1A2E] hidden md:table-cell">{a.date}</td>
                            <td className="py-3 pr-3 text-[#1A1A2E]">{a.time}</td>
                            <td className="py-3 pr-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-[8px] ${statusStyles[a.status]}`}>
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-[12px] bg-white p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <h2 className="font-bold text-[#1A1A2E] mb-4 text-base sm:text-lg">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map(({ label, icon: Icon, tint, page }) => (
                      <button
                        key={label}
                        onClick={() => setActive(page)}
                        className="flex flex-col items-center justify-center gap-2 rounded-[8px] border border-slate-100 py-4 sm:py-5 hover:bg-slate-50 hover:shadow-md transition-all duration-200"
                      >
                        <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full ${tint} flex items-center justify-center`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-medium text-[#1A1A2E] text-center px-1">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">

                {/* Appointments Overview */}
                <div className="xl:col-span-2 rounded-[12px] bg-white p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <h2 className="font-bold text-[#1A1A2E] mb-4 text-base sm:text-lg">Appointments Overview</h2>
                  <div className="h-56 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={overviewData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.25} />
                            <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={COLORS.primary}
                          strokeWidth={2.5}
                          fill="url(#overviewFill)"
                          dot={{ r: 3, fill: COLORS.primary, strokeWidth: 2, stroke: "#fff" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Appointments by Status */}
                <div className="rounded-[12px] bg-white p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <h2 className="font-bold text-[#1A1A2E] mb-4 text-base sm:text-lg">Appointments by Status</h2>
                  <div className="h-36 sm:h-40 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={3}
                          stroke="none"
                        >
                          {statusData.map((d) => (
                            <Cell key={d.name} fill={d.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-3">
                    {statusData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="flex items-center gap-2 text-[#1A1A2E]">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          {d.name}
                        </span>
                        <span className="font-medium text-[#1A1A2E]">
                          {d.value} ({Math.round((d.value / totalAppointments) * 100)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {active === "Doctor Management" && <DoctorManagement />}
          {active === "Patient Management" && <PatientManagement />}
          {active === "Appointment Management" && <AppointmentManagement />}
          {active === "Service Management" && <ServiceManagement />}
          {active === "Review Management" && <ReviewManagement />}
          {active === "Reminder Management" && <ReminderManagement />}

        </main>
      </div>
    </div>
  );
}          