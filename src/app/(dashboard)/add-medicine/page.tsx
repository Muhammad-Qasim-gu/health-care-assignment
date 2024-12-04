"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMedicineText } from "../../_common/constant/constant";

const MedicineForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [useFor, setUseFor] = useState("");
  const [brandName, setBrandName] = useState("");
  const [dosageForm, setDosageForm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const medicineData = {
      name,
      price,
      useFor,
      brandName,
      dosageForm,
    };

    const resetForm = () => {
      setName("");
      setPrice(0);
      setUseFor("");
      setBrandName("");
      setDosageForm("");
    };

    try {
      const response = await fetch(addMedicineText.addMedicineApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineData),
      });

      if (response.ok) {
        toast.success("Medicine added successfully!");
        resetForm();
      } else {
        toast.error("Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      toast.error("Error adding medicine.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${addMedicineText.addMedBg})`,
      }}
    >
      <div className="bg-white p-6 max-w-lg mx-auto shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6">Add Medicine</h2>
        <form onSubmit={handleSubmit} className="space-y-4 min-w-96">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">
              {addMedicineText.medName}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold">
              {addMedicineText.price}
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="useFor" className="block text-sm font-semibold">
              {addMedicineText.useFor}
            </label>
            <input
              type="text"
              id="useFor"
              value={useFor}
              onChange={(e) => setUseFor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="brandName" className="block text-sm font-semibold">
              {addMedicineText.brandName}
            </label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="dosageForm" className="block text-sm font-semibold">
              {addMedicineText.dosageFornm}
            </label>
            <input
              type="text"
              id="dosageForm"
              value={dosageForm}
              onChange={(e) => setDosageForm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {addMedicineText.addMedicine}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
    </div>
  );
};

export default MedicineForm;
