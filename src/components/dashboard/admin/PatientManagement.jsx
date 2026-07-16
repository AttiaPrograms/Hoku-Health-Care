import React, { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  X,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
} from "lucide-react";

// Initial Patients Data
const initialPatients = [
  {
    id: "PT-001",
    name: "Ayesha Khan",
    age: 29,
    gender: "Female",
    blood: "O+",
    email: "ayesha.khan@mail.com",
    phone: "+92 300 1112233",
    address: "Gulshan, Karachi",
    lastVisit: "2026-07-10",
    condition: "Stable",
    status: "Active",
  },
  {
    id: "PT-002",
    name: "Hamza Tariq",
    age: 10,
    gender: "Male",
    blood: "A+",
    email: "hamza.tariq@mail.com",
    phone: "+92 301 2223344",
    address: "DHA, Lahore",
    lastVisit: "2026-07-08",
    condition: "Under Observation",
    status: "Active",
  },
  {
    id: "PT-003",
    name: "Fatima Noor",
    age: 41,
    gender: "Female",
    blood: "B-",
    email: "fatima.noor@mail.com",
    phone: "+92 302 3334455",
    address: "F-10, Islamabad",
    lastVisit: "2026-07-12",
    condition: "Stable",
    status: "Blocked",
  },
  {
    id: "PT-004",
    name: "Usman Ali",
    age: 22,
    gender: "Male",
    blood: "AB+",
    email: "usman.ali@mail.com",
    phone: "+92 303 4445566",
    address: "Clifton, Karachi",
    lastVisit: "2026-07-05",
    condition: "Critical",
    status: "Active",
  },
];

// Condition Badge Colors
const conditionStyles = {
  Stable: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Under Observation":
    "bg-amber-50 text-amber-700 ring-amber-200",
  Critical: "bg-rose-50 text-rose-700 ring-rose-200",
};

// Main Component
export default function PatientManagement() {

  // Store all patients
  const [patients, setPatients] = useState(initialPatients);

  // Search input
  const [query, setQuery] = useState("");

  // Selected patient for profile drawer
  const [selected, setSelected] = useState(null);

  
  // Search Filter
  const filtered = useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase())
    );
  }, [patients, query]);

  // Block / Unblock Patient
  const toggleStatus = (id) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status:
                patient.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : patient
      )
    );
  };

  return (
    <div className="p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Management
          </h1>

          <p className="text-gray-500 mt-1">
            View, search and manage all registered patients.
          </p>
        </div>

      </div>

      {/* Search Box */}
      <div className="relative mb-6">

        {/* Search Icon */}
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Patient Name or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-gray-100 text-left">

            <tr>

              <th className="px-5 py-4 font-semibold">
                Patient ID
              </th>

              <th className="px-5 py-4 font-semibold">
                Name
              </th>

              <th className="px-5 py-4 font-semibold">
                Age
              </th>

              <th className="px-5 py-4 font-semibold">
                Gender
              </th>

              <th className="px-5 py-4 font-semibold">
                Blood
              </th>

              <th className="px-5 py-4 font-semibold">
                Condition
              </th>

              <th className="px-5 py-4 font-semibold">
                Status
              </th>

              <th className="px-5 py-4 font-semibold text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {filtered.map((patient) => (

              <tr
                key={patient.id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* Patient ID */}
                <td className="px-5 py-4 font-medium">
                  {patient.id}
                </td>

                {/* Name */}
                <td className="px-5 py-4">
                  {patient.name}
                </td>

                {/* Age */}
                <td className="px-5 py-4">
                  {patient.age}
                </td>

                {/* Gender */}
                <td className="px-5 py-4">
                  {patient.gender}
                </td>

                {/* Blood Group */}
                <td className="px-5 py-4">
                  {patient.blood}
                </td>

                {/* Condition Badge */}
                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ring-1 ${
                      conditionStyles[patient.condition]
                    }`}
                  >
                    {patient.condition}
                  </span>

                </td>

                {/* Status Badge */}
                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {patient.status}
                  </span>

                </td>

                {/* Action Buttons */}
                <td className="px-5 py-4 text-center">

                  <button
                     onClick={() => setSelected(patient)}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                     View
                  </button>

                  <button
                    onClick={() => toggleStatus(patient.id)}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                      patient.status === "Active"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {patient.status === "Active"
                      ? "Block"
                      : "Unblock"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        </div>

      {/* Patient Profile Drawer */}
      
      {selected && (
        <>

          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelected(null)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Patient Profile
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Complete patient information
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>

            </div>

            {/* Patient Details */}
            <div className="p-6 space-y-6">

              {/* Basic Info */}
              <div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {selected.name}
                </h3>

                <p className="text-gray-500">
                  {selected.id}
                </p>

              </div>

              {/* Email */}
              <div className="flex items-start gap-3">

                <Mail className="text-blue-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-medium">
                    {selected.email}
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">

                <Phone className="text-green-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-medium">
                    {selected.phone}
                  </p>
                </div>

              </div>

              {/* Address */}
              <div className="flex items-start gap-3">

                <MapPin className="text-red-500 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Address
                  </p>

                  <p className="font-medium">
                    {selected.address}
                  </p>
                </div>

              </div>

              {/* Age */}
              <div className="flex items-start gap-3">

                <Calendar className="text-purple-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Age
                  </p>

                  <p className="font-medium">
                    {selected.age} Years
                  </p>
                </div>

              </div>

              {/* Blood Group */}
              <div className="flex items-start gap-3">

                <Droplet className="text-rose-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Blood Group
                  </p>

                  <p className="font-medium">
                    {selected.blood}
                  </p>
                </div>

              </div>

              {/* Gender */}
              <div className="flex items-start gap-3">

                <UserPlus className="text-indigo-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Gender
                  </p>

                  <p className="font-medium">
                    {selected.gender}
                  </p>
                </div>

              </div>

              {/* Last Visit */}
              <div className="flex items-start gap-3">

                <Calendar className="text-orange-600 mt-1" size={18} />

                <div>
                  <p className="text-sm text-gray-500">
                    Last Visit
                  </p>

                  <p className="font-medium">
                    {selected.lastVisit}
                  </p>
                </div>

              </div>

              {/* Condition */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Condition
                </p>

                <span
                  className={`px-3 py-2 rounded-full text-sm ring-1 ${
                    conditionStyles[selected.condition]
                  }`}
                >
                  {selected.condition}
                </span>

              </div>

              {/* Status */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Status
                </p>

                <span
                  className={`px-3 py-2 rounded-full text-sm ${
                    selected.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selected.status}
                </span>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}


