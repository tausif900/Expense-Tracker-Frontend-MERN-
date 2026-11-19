import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TRANSACTION_API = "http://localhost:3000/api/transaction";
const ACCOUNT_API = "http://localhost:3000/api/account";

const initialForm = {
  type: "Expense",
  amount: "",
  accountId: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

const categories = {
  Income: ["Salary", "Business", "Freelance", "Investment", "Gift", "Other"],
  Expense: [
    "Food",
    "Shopping",
    "Transport",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other",
  ],
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Fetch accounts
  const getAccounts = async () => {
    try {
      const response = await axios.get(`${ACCOUNT_API}/get-all-accounts`, {
        withCredentials: true,
      });

      const data = response.data;

      setAccounts(data.accounts || data.allAccounts || data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch accounts");
    }
  };

  // Fetch transactions
  const getTransactions = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${TRANSACTION_API}/get-all-transactions`,
        {
          params: {
            page: currentPage,
            limit,
          },
          withCredentials: true,
        },
      );

      const data = response.data;

      const list =
        data.transactions ||
        data.allTransactions ||
        data.data?.transactions ||
        data.data ||
        [];

      setTransactions(Array.isArray(list) ? list : []);

      setTotalPages(
        Number(
          data.totalPages ||
            data.pagination?.totalPages ||
            data.data?.totalPages,
        ) || 1,
      );

      setTotalTransactions(
        Number(
          data.totalTransactions ||
            data.totalCount ||
            data.pagination?.totalTransactions ||
            data.data?.totalTransactions,
        ) || 0,
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch transactions",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    getTransactions(page);
  }, [page]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }));
  };

  // Open create form
  const handleAdd = () => {
    if (accounts.length === 0) {
      toast.warning("Please create an account first");
      return;
    }

    setForm({
      ...initialForm,
      accountId: accounts[0]._id,
      date: new Date().toISOString().split("T")[0],
    });

    setEditingId(null);
    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (transaction) => {
    setForm({
      type: transaction.type || "Expense",
      amount: String(transaction.amount ?? ""),
      accountId: transaction.accountId?._id || transaction.accountId || "",
      category: transaction.category || "",
      date: transaction.date
        ? new Date(transaction.date).toISOString().split("T")[0]
        : "",
      note: transaction.note || "",
    });

    setEditingId(transaction._id);
    setShowForm(true);
  };

  // Create / Update transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.accountId) {
      toast.error("Please select an account");
      return;
    }

    if (
      form.amount.trim() === "" ||
      !Number.isFinite(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!form.category.trim()) {
      toast.error("Please select a category");
      return;
    }

    const payload = {
      type: form.type,
      amount: Number(form.amount),
      accountId: form.accountId,
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    };

    try {
      setSaving(true);

      if (editingId) {
        await axios.put(
          `${TRANSACTION_API}/update-transaction/${editingId}`,
          payload,
          { withCredentials: true },
        );

        toast.success("Transaction updated successfully");
      } else {
        await axios.post(`${TRANSACTION_API}/create-transaction`, payload, {
          withCredentials: true,
        });

        toast.success("Transaction added successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);

      await getTransactions(page);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${TRANSACTION_API}/delete-transaction/${id}`, {
        withCredentials: true,
      });

      toast.success("Transaction deleted successfully");

      // If last transaction on page was deleted, go to previous page
      if (transactions.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        getTransactions(page);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete transaction",
      );
    }
  };

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // Date formatter
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate page totals
  const pageIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const pageExpenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Transactions</h3>
          <p className="text-secondary mb-0">
            Track and manage your income and expenses.
          </p>
        </div>

        <button className="btn btn-primary px-4" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Transaction
        </button>
      </div>

      {/* Summary Cards - Current Page */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48 }}
                >
                  <i className="bi bi-arrow-down-left fs-4"></i>
                </div>

                <div>
                  <p className="text-secondary mb-1 small">
                    Income on this page
                  </p>
                  <h5 className="fw-bold mb-0 text-success">
                    {formatCurrency(pageIncome)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48 }}
                >
                  <i className="bi bi-arrow-up-right fs-4"></i>
                </div>

                <div>
                  <p className="text-secondary mb-1 small">
                    Expenses on this page
                  </p>
                  <h5 className="fw-bold mb-0 text-danger">
                    {formatCurrency(pageExpenses)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48 }}
                >
                  <i className="bi bi-receipt fs-4"></i>
                </div>

                <div>
                  <p className="text-secondary mb-1 small">
                    Total Transactions
                  </p>
                  <h5 className="fw-bold mb-0">
                    {totalTransactions || transactions.length}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {editingId ? "Edit Transaction" : "Add New Transaction"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={closeForm}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Type */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Transaction Type
                  </label>

                  <select
                    className="form-select"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>

                {/* Amount */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Amount (INR)</label>

                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    required
                  />
                </div>

                {/* Account */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Select Account
                  </label>

                  <select
                    className="form-select"
                    name="accountId"
                    value={form.accountId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose account</option>

                    {accounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.accountName} ({formatCurrency(account.balance)}
                        )
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>

                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose category</option>

                    {categories[form.type].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Transaction Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Note */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Note (Optional)
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="note"
                    placeholder="Add a description"
                    value={form.note}
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={saving}
                  >
                    {saving
                      ? "Please wait..."
                      : editingId
                        ? "Update Transaction"
                        : "Save Transaction"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">All Transactions</h5>

            <span className="text-secondary small">
              Page {page} of {totalPages}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="text-secondary mt-2">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-receipt display-4 text-secondary"></i>

              <h5 className="fw-bold mt-3">No Transactions Found</h5>

              <p className="text-secondary">
                Start by adding your first transaction.
              </p>

              <button className="btn btn-primary" onClick={handleAdd}>
                Add Transaction
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Account</th>
                    <th>Note</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="text-nowrap">
                        {formatDate(transaction.date)}
                      </td>

                      <td className="fw-semibold">{transaction.category}</td>

                      <td>{transaction.accountId?.accountName || "Account"}</td>

                      <td className="text-secondary">
                        {transaction.note || "-"}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            transaction.type === "Income"
                              ? "bg-success bg-opacity-10 text-success"
                              : "bg-danger bg-opacity-10 text-danger"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td
                        className={`fw-semibold text-nowrap ${
                          transaction.type === "Income"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {transaction.type === "Income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                            onClick={() => handleEdit(transaction)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                            onClick={() => handleDelete(transaction._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
              <p className="text-secondary small mb-0">
                Showing page {page} of {totalPages}
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <i className="bi bi-chevron-left me-1"></i>
                  Previous
                </button>

                <button
                  className="btn btn-outline-primary btn-sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                  <i className="bi bi-chevron-right ms-1"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
