"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";

import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loinText } from "../../_common/constant/constant";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      console.log("Submitting login values:", values);

      const response = await fetch(loinText.loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        const token = data.content.token;
        cookie.set("token", token, { secure: true});


        // logoutTime(6000);

        toast.success("Login successful! Redirecting to home...");
        setTimeout(() => {
          router.push("/home");
        }, 2000);

      } else {
        const error = await response.json();
        console.error("Login failed:", error);
        toast.error(error.message || "Login failed");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // const logoutTime = (delay: number) => {
  //   setTimeout(() => {
  //     cookie.remove("token");
  //     window.location.replace("/login"); 
  //   }, delay);
  // };
  

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${loinText.loginPageBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            {loinText.login}
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {loinText.doNOtHaveAccount}{" "}
              <Link href="/sign-up">{loinText.signUp}</Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
