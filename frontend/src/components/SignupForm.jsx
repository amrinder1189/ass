import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-red-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fas fa-exclamation-circle"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <form className="m-auto my-16 max-w-[500px] p-8 bg-gray-100 border border-gray-300 shadow-md rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-4 text-xl font-semibold">
            Welcome user, please sign up here
          </h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-gray-800">
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Your name"
              onChange={handleChange}
            />
            {fieldError("name")}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-800">
              Email
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="youremail@domain.com"
              onChange={handleChange}
            />
            {fieldError("email")}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-gray-800">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password.."
              onChange={handleChange}
            />
            {fieldError("password")}
          </div>
          <button
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default SignupForm;
