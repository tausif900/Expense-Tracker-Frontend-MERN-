import React from "react";

const Login = () => {
  return (
    <>
      <div className="min-vh-100 bg-body">
        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Left Section */}
            <div className="col-12 lg:col-6 bg-primary text-white d-flex flex-column justify-content-between p-4 p-lg-5">
              <a
                href="/"
                className="text-white text-decoration-none fw-bold fs-3"
              >
                ExpenseTrack.
              </a>

              <div className="mx-auto my-5" style={{ maxWidth: "480px" }}>
                <span className="badge rounded-pill bg-white fg-primary px-3 py-2 mb-4">
                  PERSONAL FINANCE MANAGEMENT
                </span>

                <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>

                <p className="fs-5 opacity-75 mb-5">
                  Your financial journey continues here. Stay on top of your
                  spending, manage your budgets and keep moving towards your
                  financial goals.
                </p>

                <div className="d-flex gap-3 align-items-center mb-4">
                  <div className="rounded-circle bg-white bg-opacity-10 p-3">
                    <span className="fs-4">↗</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Track Your Expenses</h6>
                    <small className="opacity-75">
                      Know where your money goes.
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-center">
                  <div className="rounded-circle bg-white bg-opacity-10 p-3">
                    <span className="fs-4">◎</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Achieve Your Goals</h6>
                    <small className="opacity-75">
                      Make smarter financial decisions.
                    </small>
                  </div>
                </div>
              </div>

              <small className="opacity-75">
                © 2026 ExpenseTrack. All rights reserved.
              </small>
            </div>

            {/* Right Section */}
            <div className="col-12 lg:col-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
              <div className="w-100" style={{ maxWidth: "430px" }}>
                <div className="mb-5">
                  <h2 className="fw-bold mb-2">Sign In</h2>
                  <p className="fg-secondary">
                    Enter your credentials to access your account.
                  </p>
                </div>

                <form>
                  <div className="form-field mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                    />
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
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-field">
                      <input type="checkbox" className="check" id="remember" />
                      <label htmlFor="remember">Remember me</label>
                    </div>

                    <a
                      href="/forgot-password"
                      className="text-decoration-none fg-primary small fw-semibold"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-solid theme-primary w-100 py-3"
                  >
                    Sign In
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="fg-secondary">
                    Don't have an account?
                    <a
                      href="/register"
                      className="text-decoration-none fg-primary fw-semibold ms-1"
                    >
                      Create Account
                    </a>
                  </p>
                </div>

                <div className="text-center mt-5">
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

export default Login;
