import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  HeartPulse,
} from "lucide-react";

{/* Services Management component for admin to manage healthcare services*/}
const ServicesManagement = () => {
  // Default services list
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Home Health",
      description: "Nursing, therapy, medical care at home.",
    },
    {
      id: 2,
      name: "Palliative Care",
      description: "Comofort care for serious illness.",
    },
    {
      id: 3,
      name: "Hospice Care",
      description: "End-of-life care and support.",
    },
  ]);

  // Modal open/close state
  const [showModal, setShowModal] = useState(false);

  // Track which service is being edited
  const [editId, setEditId] = useState(null);

  // Form data for add/edit
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new service or Update existing service
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === editId
            ? {
                ...service,
                name: formData.name,
                description: formData.description,
              }
            : service
        )
      );
    } else {
      // Add new service
      const newService = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
      };
      setServices([...services, newService]);
    }
    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
    });
    setEditId(null);
    setShowModal(false);
  };

  // Open modal in edit mode
  const handleEdit = (service) => {
    setEditId(service.id);
    setFormData({
      name: service.name,
      description: service.description,
    });
    setShowModal(true);
  };

  // Delete service with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if(confirmDelete){
      setServices(
        services.filter(
          (service)=> service.id !== id
        )
      );
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Services Management
          </h1>
          <p className="text-gray-500 mt-1">
            Add, edit and manage healthcare services
          </p>
        </div>

        {/* Add Service Button */}
        <button
          onClick={()=>{
            setEditId(null);
            setFormData({
              name:"",
              description:"",
            });
            setShowModal(true);
          }}
          className="bg-[#B8860B] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={20}/>
          Add Service
        </button>
      </div>

      {/* Services Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service)=>(
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-5"
          >
            {/* Service Icon and Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <HeartPulse className="text-[#B8860B]" />
              </div>
              <h2 className="font-bold text-xl">
                {service.name}
              </h2>
            </div>

            {/* Service Description */}
            <p className="text-gray-600 mb-5">
              {service.description}
            </p>

            {/* Action Buttons (Edit & Delete) */}
            <div className="flex gap-3">
             {/* Edit Service Button */}
              <button
                onClick={()=>handleEdit(service)}
                className="flex-1 border border-blue-500 text-blue-600 py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <Edit size={18}/>
                Edit
              </button>

              {/* Delete Service Button */}
              <button
                onClick={()=>handleDelete(service.id)}
                className="flex-1 border border-red-500 text-red-600 py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <Trash2 size={18}/>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">
                {editId ? "Edit Service" : "Add Service"}
              </h2>
              <button onClick={()=>setShowModal(false)}>
                <X/>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Service Name"
                className="w-full border p-3 rounded-lg mb-4"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service Description"
                className="w-full border p-3 rounded-lg mb-4"
                rows="4"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#B8860B] text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <Save size={18}/>
                {editId ? "Update Service" : "Save Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;