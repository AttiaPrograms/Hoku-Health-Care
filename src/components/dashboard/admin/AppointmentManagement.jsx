import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  Stethoscope,
} from "lucide-react";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Ayesha Khan",
      doctor: "Dr. Sana Malik",
      date: "12 Jan 2026",
      time: "10:30 PM",
      status: "Approved",
    },
    {
      id: 2,
      patient: "fatima Noor",
      doctor: "Dr. Bilal Ahmed",
      date: "13 Feb 2026",
      time: "11:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Hamza Tariq",
      doctor: "Dr. Imran Shah",
      date: "14 Mar 2025",
      time: "01:00 PM",
      status: "Cancelled",
    },
    {
      id: 4,
      patient: "Ayesha Khan",
      doctor: "Dr. Hina Raza",
      date: "14 Apr 2024",
      time: "04:30 PM",
      status: "Approved",
    },
    {
      id: 5,
      patient: "Usman Malik",
      doctor: "Dr. Bilal Ahmed",
      date: "15 Apr 2024",
      time: "09:00 AM",
      status: "Pending",
    },
    {
      id: 6,
      patient: "Usman Malik",
      doctor: "Dr. Sana Malik",
      date: "15 Apr 2019",
      time: "12:45 AM",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");

  // Approve Appointment
  const approveAppointment = (id) => {
    setAppointments(
      appointments.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  // Cancel Appointment
  const cancelAppointment = (id) => {
    setAppointments(
      appointments.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item
      )
    );
  };

  // Search Patient
  const filteredAppointments = appointments.filter((item) =>
    item.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Appointment Management
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage all patient appointments
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>
      </div>

      {/* Appointment Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full table-fixed">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left w-[18%]">Patient</th>
              <th className="p-4 text-left w-[18%]">Doctor</th>
              <th className="p-4 text-left w-[15%]">Date</th>
              <th className="p-4 text-left w-[12%]">Time</th>
              <th className="p-4 text-left w-[15%]">Status</th>
              <th className="p-4 text-left w-[22%]">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                {/* Patient Name */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-gray-500" />
                    <span>{appointment.patient}</span>
                  </div>
                </td>

                {/* Doctor Name */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Stethoscope size={18} className="text-gray-500" />
                    <span>{appointment.doctor}</span>
                  </div>
                </td>

                {/* Appointment Date */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {appointment.date}
                  </div>
                </td>

                {/* Appointment Time */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {appointment.time}
                  </div>
                </td>

                {/* Status */}
                <td className="p-4">
                  {appointment.status === "Approved" && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Approved
                    </span>
                  )}
                  {appointment.status === "Pending" && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  )}
                  {appointment.status === "Cancelled" && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Cancelled
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveAppointment(appointment.id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;