"use client";
import React, { useEffect, useState } from "react";
import { diseaseListText } from "../../_common/constant/constant";

interface Disease {
  _id: string;
  name: string;
  description: string;
}

const DiseaseList: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch(diseaseListText.diseaseListLink);
        if (!response.ok) {
          throw new Error("Failed to fetch diseases");
        }
        const data: Disease[] = await response.json();
        setDiseases(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error: ${err.message}`);
        } else {
          setError("Failed to fetch diseases");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">{diseaseListText.loading}</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">{diseaseListText.title}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">
                {diseaseListText.name}
              </th>
              <th className="px-4 py-2 text-left border-b">
                {diseaseListText.description}
              </th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((disease) => (
              <tr key={disease._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{disease.name}</td>
                <td className="px-4 py-2 border-b">{disease.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiseaseList;
