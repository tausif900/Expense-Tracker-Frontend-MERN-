import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="bg-body">
        {/* Navbar */}
        <nav className="py-3 border-bottom bg-white">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <a
                href="/"
                className="text-decoration-none fw-bold fs-4 fg-emphasis"
              >
                <span className="fg-primary">Expense</span>Track.
              </a>

              <div className="d-flex align-items-center flex-wrap gap-4">
                <a
                  href="#features"
                  className="text-decoration-none fg-secondary"
                >
                  Features
                </a>
                <a href="#about" className="text-decoration-none fg-secondary">
                  About
                </a>
                <a
                  href="#benefits"
                  className="text-decoration-none fg-secondary"
                >
                  Benefits
                </a>
              </div>

              <div className="d-flex gap-2">
                <Link
                  to={"/login"}
                  className="btn btn-outline theme-primary px-4"
                >
                  Login
                </Link>
                <Link
                  to={"/registration"}
                  className="btn btn-solid theme-primary px-4"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-5" style={{ background: "#f5f7ff" }}>
          <div className="container py-lg-5">
            <div className="row align-items-center g-5">
              <div className="col-12 lg:col-7">
                <span className="badge theme-primary badge-subtle rounded-pill px-3 py-2 mb-4">
                  PERSONAL FINANCE MANAGEMENT
                </span>

                <h1 className="fs-5xl fw-bold lh-sm mb-4">
                  Take Control of Your
                  <span className="fg-primary"> Financial Life.</span>
                </h1>

                <p
                  className="fs-5 fg-secondary mb-4"
                  style={{ maxWidth: "570px" }}
                >
                  Managing money doesn't have to be complicated. Track your
                  expenses, manage budgets, monitor income and achieve your
                  savings goals — all from one place.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to={"/registration"}
                    className="btn btn-solid theme-primary btn-lg px-4"
                  >
                    Get Started Free <span aria-hidden="true">→</span>
                  </Link>

                  <a
                    href="#features"
                    className="btn btn-outline theme-primary btn-lg px-4"
                  >
                    Explore Features
                  </a>
                </div>

                <p className="mt-4 fg-secondary">
                  Simple finance management. Better financial decisions.
                </p>
              </div>

              <div className="col-12 lg:col-5">
                <div className="bg-white rounded-5 shadow-lg p-4 p-lg-5">
                  <div className="text-center mb-4">
                    <div
                      className="mx-auto rounded-4 bg-subtle-primary d-flex align-items-center justify-content-center"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <span className="fg-primary" style={{ fontSize: "48px" }}>
                        ₹
                      </span>
                    </div>

                    <h3 className="fw-bold mt-4">Your Money, Organized.</h3>
                    <p className="fg-secondary mb-0">
                      Everything you need to manage your finances.
                    </p>
                  </div>

                  <div className="border rounded-4 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-3 bg-subtle-success p-3">
                        <span className="fs-4 fg-success">↗</span>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Track Transactions</h6>
                        <p className="fg-secondary small mb-0">
                          Keep income and expenses organized.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-4 p-3 mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-3 bg-subtle-primary p-3">
                        <span className="fs-4 fg-primary">◎</span>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Plan Your Budget</h6>
                        <p className="fg-secondary small mb-0">
                          Stay aware of your spending limits.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-4 p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-3 bg-subtle-warning p-3">
                        <span className="fs-4 fg-warning">✦</span>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Reach Your Goals</h6>
                        <p className="fg-secondary small mb-0">
                          Build better financial habits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-5" id="about">
          <div className="container py-lg-5 text-center">
            <span className="fg-primary fw-semibold">ABOUT EXPENSETRACK</span>

            <h2 className="fw-bold fs-3xl mt-3 mb-4">
              A Smarter Way to Manage Your Money
            </h2>

            <p
              className="fg-secondary fs-5 mx-auto"
              style={{ maxWidth: "780px" }}
            >
              ExpenseTrack is a personal finance management application designed
              to help you understand your spending, organize your finances and
              make informed financial decisions. From everyday transactions to
              long-term savings goals, manage everything in one convenient
              place.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5 bg-1" id="features">
          <div className="container py-lg-5">
            <div className="text-center mb-5">
              <span className="fg-primary fw-semibold">OUR FEATURES</span>
              <h2 className="fw-bold fs-3xl mt-3">
                Everything You Need. All in One Place.
              </h2>
              <p className="fg-secondary mt-3">
                Take control of your finances with simple and powerful tools.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-primary rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-primary">↔</span>
                  </div>
                  <h5 className="fw-bold">Income & Expense Tracking</h5>
                  <p className="fg-secondary mb-0">
                    Record your income and expenses, categorize transactions and
                    maintain a clear record of your financial activity.
                  </p>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-success rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-success">◔</span>
                  </div>
                  <h5 className="fw-bold">Financial Analytics</h5>
                  <p className="fg-secondary mb-0">
                    Understand your spending patterns through financial reports,
                    category breakdowns and monthly trends.
                  </p>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-warning rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-warning">◎</span>
                  </div>
                  <h5 className="fw-bold">Budget Management</h5>
                  <p className="fg-secondary mb-0">
                    Set monthly budgets, monitor your spending and receive
                    alerts when you approach your budget limits.
                  </p>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-info rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-info">▤</span>
                  </div>
                  <h5 className="fw-bold">Multiple Accounts</h5>
                  <p className="fg-secondary mb-0">
                    Manage your cash, bank accounts, credit cards and wallets
                    from a single application.
                  </p>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-danger rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-danger">☆</span>
                  </div>
                  <h5 className="fw-bold">Savings Goals</h5>
                  <p className="fg-secondary mb-0">
                    Set financial targets, track your savings progress and stay
                    focused on your goals.
                  </p>
                </div>
              </div>

              <div className="col-12 md:col-6 lg:col-4">
                <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
                  <div className="bg-subtle-primary rounded-3 p-3 d-inline-block mb-3">
                    <span className="fs-3 fg-primary">⟳</span>
                  </div>
                  <h5 className="fw-bold">Recurring Transactions</h5>
                  <p className="fg-secondary mb-0">
                    Keep track of regular payments and recurring income without
                    manually recording every occurrence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-5" id="benefits">
          <div className="container py-lg-5">
            <div className="row align-items-center g-5">
              <div className="col-12 lg:col-6">
                <span className="fg-primary fw-semibold">WHY CHOOSE US</span>
                <h2 className="fw-bold fs-3xl mt-3 mb-4">
                  Understand Your Money. Improve Your Future.
                </h2>

                <p className="fg-secondary fs-5">
                  Having control over your finances starts with understanding
                  where your money goes. ExpenseTrack helps you stay organized,
                  plan ahead and build healthier financial habits.
                </p>

                <Link
                  to={"/registration"}
                  className="btn btn-solid theme-primary px-4 mt-3"
                >
                  Start Your Journey →
                </Link>
              </div>

              <div className="col-12 lg:col-6">
                <div className="d-flex gap-3 mb-4">
                  <span className="fg-success fs-4">✓</span>
                  <div>
                    <h6 className="fw-bold">All Finances in One Place</h6>
                    <p className="fg-secondary mb-0">
                      Organize your accounts and transactions together.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                  <span className="fg-success fs-4">✓</span>
                  <div>
                    <h6 className="fw-bold">Better Spending Awareness</h6>
                    <p className="fg-secondary mb-0">
                      Understand your spending habits and identify savings
                      opportunities.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                  <span className="fg-success fs-4">✓</span>
                  <div>
                    <h6 className="fw-bold">Organized Budget Planning</h6>
                    <p className="fg-secondary mb-0">
                      Plan your expenses and keep track of your monthly budgets.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <span className="fg-success fs-4">✓</span>
                  <div>
                    <h6 className="fw-bold">Personal Financial Space</h6>
                    <p className="fg-secondary mb-0">
                      Access your own financial records through your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="container py-5">
          <div className="rounded-5 p-5 text-center theme-primary bg-primary">
            <h2 className="fw-bold fs-3xl mb-3 fg-contrast-primary">
              Your Financial Journey Starts Here.
            </h2>

            <p className="fs-5 mb-4 fg-contrast-primary">
              Take the first step towards smarter money management.
            </p>

            <Link
              to={"/registration"}
              className="btn btn-solid theme-inverse btn-lg px-5"
            >
              Create Your Free Account
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-4">
          <div className="container">
            <div className="row align-items-center g-3">
              <div className="col-12 md:col-6 text-center md:text-start">
                <h5 className="fw-bold fg-white mb-1">ExpenseTrack.</h5>
                <small className="fg-white">
                  Take control of your financial journey.
                </small>
              </div>

              <div className="col-12 md:col-6 text-center md:text-end">
                <small className="fg-white">
                  © 2026 ExpenseTrack. All rights reserved.
                </small>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
