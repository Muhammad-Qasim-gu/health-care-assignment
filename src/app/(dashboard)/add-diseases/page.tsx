"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDiseaseText } from "../../_common/constant/constant";

interface FormValues {
  name: string;
  description: string;
}

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const AddDisease: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Disease name is required")
      .min(3, "Name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
  });

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    try {
      const response = await fetch(addDiseaseText.addDiseaseApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save disease");
      }

      toast.success("Disease saved successfully!");
      resetForm();
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${addDiseaseText.addDiseaseBgImahge})`,
      }}
    >
      <ToastContainer />

      <div className="max-w-md  mx-auto p-6 bg-white bg-opacity-90 border rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {addDiseaseText.title}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4 w-96">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {addDiseaseText.diseaseName}
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {addDiseaseText.discription}
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows="4"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-blue-500 text-white rounded ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddDisease;
