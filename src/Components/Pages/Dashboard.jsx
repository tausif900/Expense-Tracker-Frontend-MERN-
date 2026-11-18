import React from "react";

const Dashboard = () => {
  return (
    <>
      {" "}
      <div
        className="container-fluid min-vh-100 p-0"
        style={{ backgroundColor: "#f5f7fb" }}
      >
        <div className="row g-0">
          {/* Sidebar */}
          <aside
            className="col-12 lg:col-2 p-4 text-white"
            style={{ backgroundColor: "#17243a", minHeight: "100vh" }}
          >
            <h4 className="fw-bold mb-5">
              Expense<span style={{ color: "#54c5a8" }}>Track</span>
            </h4>

            <p className="small text-white-50 mb-3">MENU</p>

            <nav className="d-flex flex-column gap-2">
              <a
                href="#"
                className="text-decoration-none text-white rounded-3 p-3"
                style={{ backgroundColor: "#30425f" }}
              >
                ▦ &nbsp; Dashboard
              </a>

              <a href="#" className="text-decoration-none text-white-50 p-3">
                ⇄ &nbsp; Transactions
              </a>

              <a href="#" className="text-decoration-none text-white-50 p-3">
                ◫ &nbsp; Accounts
              </a>

              <a href="#" className="text-decoration-none text-white-50 p-3">
                ◉ &nbsp; Analytics
              </a>

              <a href="#" className="text-decoration-none text-white-50 p-3">
                ◎ &nbsp; Budgets
              </a>

              <a href="#" className="text-decoration-none text-white-50 p-3">
                ⚙ &nbsp; Settings
              </a>
            </nav>

            <div className="mt-5 pt-4">
              <a
                href="#"
                className="text-decoration-none text-white-50 p-3 d-block"
              >
                ↪ &nbsp; Logout
              </a>
            </div>
          </aside>

          {/* Main Dashboard */}
          <main className="col-12 lg:col-10 p-3 p-md-4">
            {/* Header */}
            <header className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <h3 className="fw-bold mb-1">Dashboard</h3>
                <p className="text-body-secondary mb-0">
                  Welcome back! Here's your financial overview.
                </p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <button className="btn-solid theme-primary rounded-3 px-4 py-3 fw-semibold">
                  + Add Transaction
                </button>
                <div className="text-end">
                  <div className="fw-semibold">Tausif Ansari</div>
                  <small className="text-body-secondary">User Account</small>
                </div>

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center fw-bold"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#dce9ff",
                    color: "#2856a5",
                  }}
                >
                  TA
                </div>
              </div>
            </header>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">
                        Current Balance
                      </span>
                      <span style={{ color: "#4169cf" }}>◈</span>
                    </div>
                    <h3 className="fw-bold mt-3 mb-1">₹45,850.00</h3>
                    <small className="text-body-secondary">
                      Available balance
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">Total Income</span>
                      <span style={{ color: "#159b72" }}>↙</span>
                    </div>
                    <h3
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#159b72" }}
                    >
                      ₹65,000.00
                    </h3>
                    <small className="text-body-secondary">This month</small>
                  </div>
                </div>
              </div>

              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">
                        Total Expenses
                      </span>
                      <span style={{ color: "#e05a63" }}>↗</span>
                    </div>
                    <h3
                      className="fw-bold mt-3 mb-1"
                      style={{ color: "#e05a63" }}
                    >
                      ₹19,150.00
                    </h3>
                    <small className="text-body-secondary">This month</small>
                  </div>
                </div>
              </div>

              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">
                        Monthly Budget
                      </span>
                      <span style={{ color: "#d99a29" }}>▣</span>
                    </div>
                    <h3 className="fw-bold mt-3 mb-1">₹30,000.00</h3>
                    <small className="text-body-secondary">
                      Your monthly limit
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget and Chart */}
            <div className="row g-3 mb-4">
              {/* Budget Card */}
              <div className="col-12 lg:col-5">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-4">Monthly Budget</h5>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-body-secondary">Budget Used</span>
                      <strong>63.8%</strong>
                    </div>

                    <div
                      className="rounded-pill overflow-hidden mb-4"
                      style={{ height: "12px", backgroundColor: "#e9edf3" }}
                    >
                      <div
                        className="h-100 rounded-pill"
                        style={{ width: "63.8%", backgroundColor: "#4169cf" }}
                      ></div>
                    </div>

                    <div className="row g-3">
                      <div className="col-6">
                        <small className="text-body-secondary">
                          Total Spent
                        </small>
                        <h5 className="fw-bold mt-1">₹19,150</h5>
                      </div>

                      <div className="col-6 text-end">
                        <small className="text-body-secondary">Remaining</small>
                        <h5
                          className="fw-bold mt-1"
                          style={{ color: "#159b72" }}
                        >
                          ₹10,850
                        </h5>
                      </div>
                    </div>

                    <div
                      className="rounded-3 p-3 mt-4"
                      style={{ backgroundColor: "#eaf7f1" }}
                    >
                      <small style={{ color: "#16845f" }}>
                        ✓ You are within your monthly budget. Keep it up!
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Income vs Expense Chart */}
              <div className="col-12 lg:col-7">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                      <h5 className="fw-bold mb-0">Income vs Expenses</h5>
                      <span
                        className="badge rounded-pill p-2"
                        style={{ backgroundColor: "#edf1f7", color: "#536176" }}
                      >
                        This Month
                      </span>
                    </div>

                    <div className="d-flex gap-4 mb-3">
                      <small>
                        <span
                          className="d-inline-block rounded-circle me-2"
                          style={{
                            width: "9px",
                            height: "9px",
                            backgroundColor: "#159b72",
                          }}
                        ></span>
                        Income
                      </small>

                      <small>
                        <span
                          className="d-inline-block rounded-circle me-2"
                          style={{
                            width: "9px",
                            height: "9px",
                            backgroundColor: "#e05a63",
                          }}
                        ></span>
                        Expenses
                      </small>
                    </div>

                    <div
                      className="d-flex align-items-end justify-content-around"
                      style={{ height: "190px" }}
                    >
                      <div className="d-flex flex-column align-items-center justify-content-end h-100">
                        <div
                          className="d-flex align-items-end gap-2"
                          style={{ height: "150px" }}
                        >
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "85%",
                              backgroundColor: "#159b72",
                            }}
                          ></div>
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "45%",
                              backgroundColor: "#e05a63",
                            }}
                          ></div>
                        </div>
                        <small className="text-body-secondary mt-2">
                          Week 1
                        </small>
                      </div>

                      <div className="d-flex flex-column align-items-center justify-content-end h-100">
                        <div
                          className="d-flex align-items-end gap-2"
                          style={{ height: "150px" }}
                        >
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "65%",
                              backgroundColor: "#159b72",
                            }}
                          ></div>
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "35%",
                              backgroundColor: "#e05a63",
                            }}
                          ></div>
                        </div>
                        <small className="text-body-secondary mt-2">
                          Week 2
                        </small>
                      </div>

                      <div className="d-flex flex-column align-items-center justify-content-end h-100">
                        <div
                          className="d-flex align-items-end gap-2"
                          style={{ height: "150px" }}
                        >
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "95%",
                              backgroundColor: "#159b72",
                            }}
                          ></div>
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "55%",
                              backgroundColor: "#e05a63",
                            }}
                          ></div>
                        </div>
                        <small className="text-body-secondary mt-2">
                          Week 3
                        </small>
                      </div>

                      <div className="d-flex flex-column align-items-center justify-content-end h-100">
                        <div
                          className="d-flex align-items-end gap-2"
                          style={{ height: "150px" }}
                        >
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "75%",
                              backgroundColor: "#159b72",
                            }}
                          ></div>
                          <div
                            className="rounded-top"
                            style={{
                              width: "22px",
                              height: "40%",
                              backgroundColor: "#e05a63",
                            }}
                          ></div>
                        </div>
                        <small className="text-body-secondary mt-2">
                          Week 4
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <div>
                    <h5 className="fw-bold mb-1">Recent Transactions</h5>
                    <small className="text-body-secondary">
                      Your latest financial activities
                    </small>
                  </div>

                  <a
                    href="#"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#4169cf" }}
                  >
                    View All →
                  </a>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr className="text-body-secondary">
                        <th>Transaction</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Account</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="fw-semibold">Monthly Salary</td>
                        <td>Salary</td>
                        <td>18 Nov 2026</td>
                        <td>Bank</td>
                        <td
                          className="text-end fw-bold"
                          style={{ color: "#159b72" }}
                        >
                          +₹50,000
                        </td>
                      </tr>

                      <tr>
                        <td className="fw-semibold">Grocery Shopping</td>
                        <td>Food</td>
                        <td>17 Nov 2026</td>
                        <td>Cash</td>
                        <td
                          className="text-end fw-bold"
                          style={{ color: "#e05a63" }}
                        >
                          -₹2,500
                        </td>
                      </tr>

                      <tr>
                        <td className="fw-semibold">Electricity Bill</td>
                        <td>Bills</td>
                        <td>16 Nov 2026</td>
                        <td>Bank</td>
                        <td
                          className="text-end fw-bold"
                          style={{ color: "#e05a63" }}
                        >
                          -₹1,800
                        </td>
                      </tr>

                      <tr>
                        <td className="fw-semibold">Freelance Project</td>
                        <td>Freelance</td>
                        <td>15 Nov 2026</td>
                        <td>Bank</td>
                        <td
                          className="text-end fw-bold"
                          style={{ color: "#159b72" }}
                        >
                          +₹15,000
                        </td>
                      </tr>

                      <tr>
                        <td className="fw-semibold">Movie Night</td>
                        <td>Entertainment</td>
                        <td>14 Nov 2026</td>
                        <td>Wallet</td>
                        <td
                          className="text-end fw-bold"
                          style={{ color: "#e05a63" }}
                        >
                          -₹850
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
