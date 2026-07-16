import React, { useMemo, useState } from "react";
import { Search, Plus, Star, Mail, Phone, X, Stethoscope, Pencil, Trash2 } from "lucide-react";

const initialDoctors = [
  { id: 1, name: "Dr. Bilal Ahmed", specialty: "Child Specialist", email: "bilal.ahmed@hoku.com", phone: "+92 300 1234567", rating: 4.9, patients: 312, status: "Active" },
  { id: 2, name: "Dr. Sana Malik", specialty: "Gynecologist", email: "sana.malik@hoku.com", phone: "+92 301 2345678", rating: 4.7, patients: 208, status: "Active" },
  { id: 3, name: "Dr. Imran Shah", specialty: "Dental Specialist", email: "imran.shah@hoku.com", phone: "+92 302 3456789", rating: 4.8, patients: 265, status: "On Leave" },
  { id: 4, name: "Dr. Hina Raza", specialty: "Dermatologist", email: "hina.raza@hoku.com", phone: "+92 303 4567890", rating: 4.6, patients: 190, status: "Active" },
];

const specialties = ["All", "Child Specialist", "Gynecologist", "Dental Specialist", "Dermatologist"];

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", specialty: "", email: "", phone: "" });

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = specialty === "All" || d.specialty === specialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [doctors, query, specialty]);

  const addDoctor = () => {
    if (!form.name || !form.specialty) return;
    setDoctors((prev) => [
      ...prev,
      { id: Date.now(), name: form.name, specialty: form.specialty, email: form.email, phone: form.phone, rating: 0, patients: 0, status: "Active" },
    ]);
    setForm({ name: "", specialty: "", email: "", phone: "" });
    setShowModal(false);
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const startEdit = (doctor) => {
    setIsEditing(true);
    setEditingId(doctor.id);
    setForm({ name: doctor.name, specialty: doctor.specialty, email: doctor.email, phone: doctor.phone });
    setShowModal(true);
  };

  const updateDoctor = () => {
    if (!form.name || !form.specialty) return;
    setDoctors((prev) => prev.map((d) => d.id === editingId ? { ...d, ...form } : d));
    setForm({ name: "", specialty: "", email: "", phone: "" });
    setIsEditing(false);
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Staff</span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Doctor Management</h1>
          <p className="text-sm text-slate-500">{filtered.length} doctors on record</p>
        </div>
        <button
          onClick={() => { setIsEditing(false); setEditingId(null); setForm({ name: "", specialty: "", email: "", phone: "" }); setShowModal(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Doctor
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${specialty === s ? "bg-blue-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
            
            {/* Name + Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                  {d.name.split(" ").slice(-2).map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{d.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Stethoscope size={12} /> {d.specialty}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${
                  d.status === "Active"
                   ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-amber-50 text-amber-700 ring-amber-200"
                }`}>
                {d.status}
              </span>
            </div>

            {/* Email + Phone */}
            <div className="mt-4 space-y-1.5 text-xs text-slate-500">
              <p className="flex items-center gap-2"><Mail size={13} /> {d.email}</p>
              <p className="flex items-center gap-2"><Phone size={13} /> {d.phone}</p>
            </div>

            {/* Edit Delete Buttons - Active ke neeche */}
            <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button 
                onClick={() =>startEdit(d)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                    <Pencil size={14} />
                    Edit
                </button>
                <button
                onClick={() => deleteDoctor(d.id)} 
                className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">
                  <Trash2 size={14} />
                  Delete
                </button>
            </div>

            {/* Rating + Patients */}
            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
                <Star size={14} fill="currentColor" /> {d.rating || "—"}
              </span>
              <span className="text-xs text-slate-500">{d.patients} patients</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">{isEditing ? "Edit Doctor" : "Add Doctor"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={isEditing ? updateDoctor : addDoctor} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">{isEditing ? "Update Doctor" : "Add Doctor"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}