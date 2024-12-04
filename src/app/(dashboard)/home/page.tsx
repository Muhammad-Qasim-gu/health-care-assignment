"use client";
import React from "react";
import Link from "next/link";
import { homeText } from "../../_common/constant/constant";

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${homeText.homeBgImage})`,
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center py-8">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 text-center">
          {homeText.welcome}
        </h1>

        <p className="text-white text-lg max-w-xl text-center mb-10">
          {homeText.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8">
          <Link href={homeText.medicineLink} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {homeText.medicineList}
              </h3>
              <p className="text-gray-700">{homeText.medDescription}</p>
            </div>
          </Link>

          <Link href={homeText.diseaseLink} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {homeText.diseaseList}
              </h3>
              <p className="text-gray-700">{homeText.diseaseDescription}</p>
            </div>
          </Link>

          <Link href={homeText.patientLink} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {homeText.patientList}
              </h3>
              <p className="text-gray-700">{homeText.patientDiscription}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
