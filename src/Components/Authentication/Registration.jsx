import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  // React hook form is a hook to handle form submit using react
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  // Function for submit the form
  const userRegistration = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user-registration",
        data,
        { withCredentials: true },
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Checking if the confirm password is correct or not
  const password = watch("password");

  return (
    <>
      <div className="min-vh-100 bg-body">
        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Left Section */}
            <div className="col-12 lg:col-5 bg-primary text-white d-flex flex-column justify-content-between p-4 p-lg-5">
              <a
                href="/"
                className="text-white text-decoration-none fw-bold fs-3"
              >
                ExpenseTrack.
              </a>

              <div className="mx-auto my-5" style={{ maxWidth: "430px" }}>
                <span className="badge rounded-pill bg-white fg-primary px-3 py-2 mb-4">
                  START YOUR JOURNEY
                </span>

                <h1 className="display-4 fw-bold mb-4">
                  Take Control of Your Finances.
                </h1>

                <p className="fs-5 opacity-75 mb-5">
                  Create your personal account and start building better
                  financial habits today.
                </p>

                <div className="d-flex gap-3 align-items-center mb-4">
                  <div className="rounded-circle bg-white bg-opacity-10 p-3">
                    <span className="fs-4">↔</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Organize Your Money</h6>
                    <small className="opacity-75">
                      Manage all your transactions.
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-center mb-4">
                  <div className="rounded-circle bg-white bg-opacity-10 p-3">
                    <span className="fs-4">◎</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Plan Your Budget</h6>
                    <small className="opacity-75">
                      Keep your spending on track.
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-center">
                  <div className="rounded-circle bg-white bg-opacity-10 p-3">
                    <span className="fs-4">☆</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Reach Your Goals</h6>
                    <small className="opacity-75">
                      Build a better financial future.
                    </small>
                  </div>
                </div>
              </div>

              <small className="opacity-75">
                © 2026 ExpenseTrack. All rights reserved.
              </small>
            </div>

            {/* Right Section */}
            <div className="col-12 lg:col-7 d-flex align-items-center justify-content-center p-4 p-lg-5">
              <div className="w-100" style={{ maxWidth: "500px" }}>
                <div className="mb-4">
                  <h2 className="fw-bold mb-2">Create Your Account</h2>
                  <p className="fg-secondary">
                    Join ExpenseTrack and start managing your finances.
                  </p>
                </div>

                <form onSubmit={handleSubmit(userRegistration)}>
                  <div className="form-field mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your full name"
                      {...register("name", { required: "name is required" })}
                    />
                    {errors.name && (
                      <p className="fg-danger small">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-field mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="fg-danger small">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-field mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Create a password"
                      {...register("password", {
                        required: "password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must contain at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!]).*$/,
                          message:
                            "Password must contain uppercase, lowercase, number and special character",
                        },
                      })}
                    />
                    <div className="form-text">
                      Use at least 8 characters with uppercase, lowercase and a
                      number.
                    </div>
                    {errors.password && (
                      <p className="fg-danger small">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      {...register("confirmPassword", {
                        required: "please confirm the password",
                        validate: (value) => {
                          return (
                            value == password ||
                            "Confirm Password don't match with the password"
                          );
                        },
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="fg-danger small">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field mb-4">
                    <input type="checkbox" className="check" id="terms" />
                    <label htmlFor="terms" className="small">
                      I agree to the Terms of Service and Privacy Policy.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-solid theme-primary w-100 py-3"
                  >
                    Create Account
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="fg-secondary">
                    Already have an account?
                    <a
                      href="/login"
                      className="text-decoration-none fg-primary fw-semibold ms-1"
                    >
                      Sign In
                    </a>
                  </p>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="/"
                    className="text-decoration-none fg-secondary small"
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
