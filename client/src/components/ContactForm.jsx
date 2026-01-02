import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

const ContactForm = ({onSuccess}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onFormSubmit = async(data) => {
      await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
    onSuccess(data);
    setShowSuccess(true);
    reset();

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-gray-900 mb-6 text-lg font-semibold">
        Add New Contact
      </h2>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md transition-colors ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="Pratham Chaudhari"
            />
            {errors.name && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md transition-colors ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md transition-colors ${
                errors.phone
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="+91 9846578384"
            />
            {errors.phone && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-colors resize-none"
              placeholder="Optional message"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-2.5 rounded-md transition-all ${
              isValid
                ? showSuccess
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center gap-2">
              {showSuccess && <Check className="w-4 h-4" />}
              {showSuccess ? "Contact Added!" : "Add Contact"}
            </span>
          </button>

          {showSuccess && (
            <span className="text-green-600 text-md">
              Contact successfully added to the list below
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;