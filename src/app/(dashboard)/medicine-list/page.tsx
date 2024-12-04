"use client";
import React, { useEffect, useState } from "react";
import { medicineListText } from "../../_common/constant/constant";

interface Medicine {
  _id: string;
  name: string;
  price: number;
  useFor: string;
  brandName: string;
  dosageForm: string;
}

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(medicineListText.medListLink);
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        const data: Medicine[] = await response.json();
        setMedicines(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error: ${err.message}`);
        } else {
          setError("Failed to fetch medicines");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl">{medicineListText.loading}</div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">{medicineListText.title}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">
                {medicineListText.name}
              </th>
              <th className="px-4 py-2 text-left border-b">
                {medicineListText.price}
              </th>
              <th className="px-4 py-2 text-left border-b">
                {medicineListText.useFor}
              </th>
              <th className="px-4 py-2 text-left border-b">
                {medicineListText.brand}
              </th>
              <th className="px-4 py-2 text-left border-b">
                {medicineListText.dosageForm}
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{medicine.name}</td>
                <td className="px-4 py-2 border-b">{medicine.price} </td>
                <td className="px-4 py-2 border-b">{medicine.useFor}</td>
                <td className="px-4 py-2 border-b">{medicine.brandName}</td>
                <td className="px-4 py-2 border-b">{medicine.dosageForm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineList;
