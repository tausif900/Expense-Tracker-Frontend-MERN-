import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardRes, analyticsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/dashboard/dashboard-data", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3000/api/analytics", {
          withCredentials: true,
        }),
      ]);

      setDashboard(dashboardRes.data.dashboard);
      setAnalytics(analyticsRes.data.analytics);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const monthlyIncome = dashboard?.monthlyIncome || 0;
  const monthlyExpenses = dashboard?.monthlyExpenses || 0;
  const monthlyBudget = dashboard?.monthlyBudget || 0;
  const remainingBudget = dashboard?.remainingBudget || 0;

  const budgetUsed =
    monthlyBudget > 0 ? (monthlyExpenses / monthlyBudget) * 100 : 0;

  const chartData = analytics?.monthlyTrends?.slice(-4) || [];

  const maxChartValue = Math.max(
    1,
    ...chartData.flatMap((item) => [item.income, item.expenses]),
  );

  return (
    <>
      <div
        className="container-fluid min-vh-100 p-0"
        style={{ backgroundColor: "#f5f7fb" }}
      >
        <div className="row g-0">
          {/* Sidebar */}
          <aside
            className="col-12 lg:col-2 p-4 text-white"
            style={{
              backgroundColor: "#17243a",
              minHeight: "100vh",
            }}
          >
            <h4 className="fw-bold mb-5">
              Expense
              <span style={{ color: "#54c5a8" }}>Track</span>
            </h4>

            <p className="small text-white-50 mb-3">MENU</p>

            <nav className="d-flex flex-column gap-2">
              <Link
                to={"/dashboard"}
                className="text-decoration-none text-white rounded-3 p-3"
                style={{ backgroundColor: "#30425f" }}
              >
                ▦ &nbsp; Dashboard
              </Link>

              <Link
                to={"/transaction"}
                className="text-decoration-none text-white-50 p-3"
              >
                ⇄ &nbsp; Transactions
              </Link>

              <Link
                to={"/account"}
                className="text-decoration-none text-white-50 p-3"
              >
                ◫ &nbsp; Accounts
              </Link>

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
            {loading && (
              <div className="text-center py-3">Loading dashboard...</div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

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
              {/* Current Balance */}
              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">
                        Current Balance
                      </span>
                      <span style={{ color: "#4169cf" }}>◈</span>
                    </div>

                    <h3 className="fw-bold mt-3 mb-1">
                      {formatCurrency(dashboard?.currentBalance)}
                    </h3>

                    <small className="text-body-secondary">
                      Available balance
                    </small>
                  </div>
                </div>
              </div>

              {/* Total Income */}
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
                      {formatCurrency(monthlyIncome)}
                    </h3>

                    <small className="text-body-secondary">This month</small>
                  </div>
                </div>
              </div>

              {/* Total Expenses */}
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
                      {formatCurrency(monthlyExpenses)}
                    </h3>

                    <small className="text-body-secondary">This month</small>
                  </div>
                </div>
              </div>

              {/* Monthly Budget */}
              <div className="col-12 sm:col-6 xl:col-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
                      <span className="text-body-secondary">
                        Monthly Budget
                      </span>
                      <span style={{ color: "#d99a29" }}>▣</span>
                    </div>

                    <h3 className="fw-bold mt-3 mb-1">
                      {formatCurrency(monthlyBudget)}
                    </h3>

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

                      <strong>{budgetUsed.toFixed(1)}%</strong>
                    </div>

                    <div
                      className="rounded-pill overflow-hidden mb-4"
                      style={{
                        height: "12px",
                        backgroundColor: "#e9edf3",
                      }}
                    >
                      <div
                        className="h-100 rounded-pill"
                        style={{
                          width: `${Math.min(budgetUsed, 100)}%`,
                          backgroundColor: "#4169cf",
                        }}
                      />
                    </div>

                    <div className="row g-3">
                      <div className="col-6">
                        <small className="text-body-secondary">
                          Total Spent
                        </small>

                        <h5 className="fw-bold mt-1">
                          {formatCurrency(monthlyExpenses)}
                        </h5>
                      </div>

                      <div className="col-6 text-end">
                        <small className="text-body-secondary">Remaining</small>

                        <h5
                          className="fw-bold mt-1"
                          style={{ color: "#159b72" }}
                        >
                          {formatCurrency(remainingBudget)}
                        </h5>
                      </div>
                    </div>

                    <div
                      className="rounded-3 p-3 mt-4"
                      style={{ backgroundColor: "#eaf7f1" }}
                    >
                      <small style={{ color: "#16845f" }}>
                        {monthlyBudget === 0
                          ? "Set a monthly budget to track your spending."
                          : budgetUsed >= 100
                            ? "You have reached or exceeded your monthly budget."
                            : "✓ You are within your monthly budget. Keep it up!"}
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
                        style={{
                          backgroundColor: "#edf1f7",
                          color: "#536176",
                        }}
                      >
                        Last 4 Months
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
                        />
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
                        />
                        Expenses
                      </small>
                    </div>

                    <div
                      className="d-flex align-items-end justify-content-around"
                      style={{ height: "190px" }}
                    >
                      {chartData.length > 0 ? (
                        chartData.map((item) => (
                          <div
                            key={item.month}
                            className="d-flex flex-column align-items-center justify-content-end h-100"
                          >
                            <div
                              className="d-flex align-items-end gap-2"
                              style={{ height: "150px" }}
                            >
                              <div
                                className="rounded-top"
                                style={{
                                  width: "22px",
                                  height: `${(item.income / maxChartValue) * 100}%`,
                                  minHeight: item.income > 0 ? "2px" : "0",
                                  backgroundColor: "#159b72",
                                }}
                              />

                              <div
                                className="rounded-top"
                                style={{
                                  width: "22px",
                                  height: `${(item.expenses / maxChartValue) * 100}%`,
                                  minHeight: item.expenses > 0 ? "2px" : "0",
                                  backgroundColor: "#e05a63",
                                }}
                              />
                            </div>

                            <small className="text-body-secondary mt-2">
                              {new Date(
                                `${item.month}-01T00:00:00`,
                              ).toLocaleDateString("en-IN", {
                                month: "short",
                              })}
                            </small>
                          </div>
                        ))
                      ) : (
                        <p className="text-body-secondary">
                          No chart data available.
                        </p>
                      )}
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
                      {dashboard?.recentTransactions?.length > 0 ? (
                        dashboard.recentTransactions.map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="fw-semibold">
                              {transaction.note || transaction.category}
                            </td>

                            <td>{transaction.category}</td>

                            <td>{formatDate(transaction.date)}</td>

                            <td>
                              {transaction.accountId?.accountName || "N/A"}
                            </td>

                            <td
                              className="text-end fw-bold"
                              style={{
                                color:
                                  transaction.type === "Income"
                                    ? "#159b72"
                                    : "#e05a63",
                              }}
                            >
                              {transaction.type === "Income" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No transactions found.
                          </td>
                        </tr>
                      )}
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
