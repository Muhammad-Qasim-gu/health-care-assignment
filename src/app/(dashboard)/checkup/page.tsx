"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkOutPage } from "../../_common/constant/constant";
import { useRouter } from "next/navigation";


interface Disease {
  _id: string;
  name: string;
}

interface Medicine {
  _id: string;
  name: string;
  price: number;
}

interface PersonFormValues {
  name: string;
  weight: number;
  height: number;
  age: number;
  disease: string;
  medicine: string;
  price: number;
}

const CreatePersonPage: React.FC = () => {
  const router = useRouter();

  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch(checkOutPage.diseaseApi);
        const data: Disease[] = await response.json();
        setDiseases(data);
      } catch (error) {
        console.error("Failed to fetch diseases", error);
      }
    };

    const fetchMedicines = async () => {
      try {
        const response = await fetch(checkOutPage.medApi);
        const data: Medicine[] = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Failed to fetch medicines", error);
      }
    };

    fetchDiseases();
    fetchMedicines();
  }, []);

  const fetchPrice = async (_id: string) => {
    if (_id) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/medicine-list?_id=${_id}`
        );
        const data: Medicine = await response.json();
        setPrice(data.price);
      } catch (error) {
        console.error("Failed to fetch price", error);
        setPrice(0);
      }
    } else {
      setPrice(0);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    weight: Yup.number()
      .positive("Weight must be positive")
      .required("Weight is required"),
    height: Yup.number()
      .positive("Height must be positive")
      .required("Height is required"),
    age: Yup.number()
      .integer("Age must be an integer")
      .positive("Age must be positive")
      .required("Age is required"),
    disease: Yup.string().required("Disease is required"),
    medicine: Yup.string().required("Medicine is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
  });

  const handleSubmit = async (
    values: PersonFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const selectedDisease = diseases.find(
        (disease) => disease._id === values.disease
      )?.name;
      const selectedMedicine = medicines.find(
        (medicine) => medicine._id === values.medicine
      )?.name;

      if (!selectedDisease || !selectedMedicine) {
        toast.error("Invalid disease or medicine selected.");
        return;
      }

      const updatedValues = {
        ...values,
        disease: selectedDisease,
        medicine: selectedMedicine,
      };

      const response = await fetch(checkOutPage.checkUpApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      if (!response.ok) {
        throw new Error("Failed to save person");
      }

      toast.success("Person successfully added!");
      setTimeout(() => {
        router.push("/home");
      }, 2000);

    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${checkOutPage.bgImage})`,
      }}
    >
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          {checkOutPage.addNewPatient}
        </h1>
        <Formik
          initialValues={{
            name: "",
            weight: 0,
            height: 0,
            age: 0,
            disease: "",
            medicine: "",
            price: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="max-w-md mx-auto p-6 bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                >
                  {checkOutPage.name}
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="age"
                >
                  {checkOutPage.age}
                </label>
                <Field
                  type="text"
                  id="age"
                  name="age"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="weight"
                >
                  {checkOutPage.weight}
                </label>
                <Field
                  type="text"
                  id="weight"
                  name="weight"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="height"
                >
                  {checkOutPage.height}
                </label>
                <Field
                  type="text"
                  id="height"
                  name="height"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="disease"
                >
                  {checkOutPage.disease}
                </label>
                <Field
                  as="select"
                  name="disease"
                  className="w-full p-2 border rounded"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const selectedDisease = e.target.value;
                    setFieldValue("disease", selectedDisease);
                  }}
                >
                  <option value="">{checkOutPage.selectDisease}</option>
                  {diseases.map((disease) => (
                    <option key={disease._id} value={disease._id}>
                      {disease.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="disease"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="medicine"
                >
                  {checkOutPage.medicine}
                </label>
                <Field
                  as="select"
                  name="medicine"
                  className="w-full p-2 border rounded"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const selectedMedicine = e.target.value;
                    setFieldValue("medicine", selectedMedicine);
                    fetchPrice(selectedMedicine);
                  }}
                >
                  <option value="">{checkOutPage.selectMedicine}</option>
                  {medicines.map((medicine) => (
                    <option key={medicine._id} value={medicine._id}>
                      {medicine.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="medicine"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="price"
                >
                  {checkOutPage.price}
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePersonPage;
