"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUPText } from "../../_common/constant/constant";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("Sign-up data:", values);

    try {
      const response = await fetch(
        signUPText.signUpApi,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      console.log("Response Status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("Error response:", error);
        toast.error(error.message || "Sign-up failed. Please try again.");
      } else {
        const data = await response.json();
        console.log("Sign-up successful:", data);

        toast.success("Sign-up successful! Redirecting to login..."); 
        setTimeout(() => {
          router.push("/login"); 
        }, 2000); 
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again."); 
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${signUPText.signUpBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            {signUPText.signUp}
          </h2>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {signUPText.alreadyAccount}<Link href="/login ">{signUPText.logIn}</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default SignUpPage;
