import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from "../redux/actions/authActions";
import Loader from "./utils/Loader";

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
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
    <form className="m-auto my-16 max-w-[500px] bg-gray-100 p-8 border border-gray-300 shadow-md rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-4 text-xl font-semibold">
            Welcome user, please login here
          </h2>
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
            <Link to="/signup" className="text-blue-600 hover:underline">
              Don't have an account? Signup here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
