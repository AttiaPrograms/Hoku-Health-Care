import React, { useState } from "react";
import { Bell, Plus, Trash2, X } from "lucide-react";

// Initial dummy reminders data
const initialReminders = [
  { id: 1, patient: "Ayesha Khan", doctor: "Dr. Bilal Ahmed", time: "2026-07-15 10:00 AM", type: "Appointment" },
  { id: 2, patient: "Hamza Tariq", doctor: "Dr. Sana Malik", time: "2026-07-15 02:30 PM", type: "Medicine" },
  { id: 3, patient: "Zainab Malik", doctor: "Dr. Hina Raza", time: "2026-07-16 09:00 AM", type: "Follow-up" },
];

export default function ReminderManagement() {
  // State to store all reminders list
  const [reminders, setReminders] = useState(initialReminders);
  // State to control Add Reminder modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to store form input values
  const [form, setForm] = useState({ patient: "", doctor: "", time: "", type: "Appointment" });

  // Function to delete a reminder by id
  const removeReminder = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  // Function to add new reminder to the list
  const handleAddReminder = () => {
    // Validation: check if all required fields are filled
    if (!form.patient || !form.doctor || !form.time) return alert("All fields required");
    
    // Create new reminder object with unique id
    const newReminder = {
      id: Date.now(), // using timestamp as unique id
      ...form
    };
    // Add new reminder at the top of the list
    setReminders([newReminder, ...reminders]);
    // Reset form fields after adding
    setForm({ patient: "", doctor: "", time: "", type: "Appointment" });
    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      {/* Page Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Alerts</span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Reminder Management</h1>
          <p className="text-sm text-slate-500">Manage patient appointments and medicine reminders</p>
        </div>
        {/* Button to open Add Reminder modal */}
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={16} /> Add Reminder
        </button>
      </div>

      {/* Reminders List Section */}
      <div className="space-y-3">
        {reminders.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Reminder icon */}
              <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                {/* Patient and Doctor info */}
                <p className="text-sm font-semibold text-slate-800">{r.patient} <span className="text-xs text-slate-400">→ {r.doctor}</span></p>
                {/* Reminder type and time */}
                <p className="text-xs text-slate-500">{r.type} • {r.time}</p>
              </div>
            </div>
            {/* Delete button */}
            <button onClick={() => removeReminder(r.id)} className="p-2 rounded-lg text-rose-500 hover:bg-rose-50">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Reminder Modal - only shows when showModal is true */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Add New Reminder</h2>
              {/* Close modal button */}
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              {/* Patient name input */}
              <input 
                type="text" 
                placeholder="Patient Name"
                value={form.patient}
                onChange={(e) => setForm({...form, patient: e.target.value})}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Doctor name input */}
              <input 
                type="text" 
                placeholder="Doctor Name"
                value={form.doctor}
                onChange={(e) => setForm({...form, doctor: e.target.value})}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Date and time picker */}
              <input 
                type="datetime-local" 
                value={form.time}
                onChange={(e) => setForm({...form, time: e.target.value})}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Reminder type dropdown */}
              <select 
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Appointment</option>
                <option>Medicine</option>
                <option>Follow-up</option>
              </select>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex gap-2 mt-5">
              {/* Save button - adds reminder */}
              <button 
                onClick={handleAddReminder}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700"
              >
                Save Reminder
              </button>
              {/* Cancel button - closes modal */}
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}