"use client";
import React, { useEffect, useState } from "react";
import { patientlistText } from "../../_common/constant/constant";

interface Person {
  _id: string;
  name: string;
  weight: number;
  height: number;
  age: number;
  disease: string;
  medicine: string;
  price: number;
}

const PersonList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = async () => {
    try {
      const response = await fetch(patientlistText.patientListApi);
      if (!response.ok) {
        throw new Error("Failed to fetch people data");
      }
      const data: Person[] = await response.json();
      setPeople(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deletePerson = async (_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-checkup/?_id=${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete person");
      }
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person._id !== _id)
      );
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {patientlistText.pesronList}
      </h1>

      {loading ? (
        <p className="text-gray-600">{patientlistText.loading}</p>
      ) : error ? (
        <p className="text-red-500">
          {patientlistText.error} {error}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-2 px-4">{patientlistText.name}</th>
                <th className="py-2 px-4">{patientlistText.weight}</th>
                <th className="py-2 px-4">{patientlistText.height}</th>
                <th className="py-2 px-4">{patientlistText.age}</th>
                <th className="py-2 px-4">{patientlistText.disease}</th>
                <th className="py-2 px-4">{patientlistText.medicine}</th>
                <th className="py-2 px-4">{patientlistText.price}</th>
                <th className="py-2 px-4">{patientlistText.delete}</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person._id} className="border-b text-gray-700">
                  <td className="py-2 px-4">{person.name}</td>
                  <td className="py-2 px-4">{person.weight}</td>
                  <td className="py-2 px-4">{person.height}</td>
                  <td className="py-2 px-4">{person.age}</td>
                  <td className="py-2 px-4">{person.disease}</td>
                  <td className="py-2 px-4">{person.medicine}</td>
                  <td className="py-2 px-4">${person.price}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deletePerson(person._id)}
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonList;
