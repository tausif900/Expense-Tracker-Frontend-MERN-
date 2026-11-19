import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:3000/api/account";

const initialForm = {
  accountName: "",
  accountType: "Cash",
  balance: "",
};

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all accounts
  const getAccounts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/get-all-accounts`, {
        withCredentials: true,
      });

      const data = response.data;

      setAccounts(data.accounts || data.allAccounts || data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value} = e.target;
    console.log(name, value);

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open add form
  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (account) => {
    setForm({
      accountName: account.accountName || "",
      accountType: account.accountType || "Cash",
      balance: String(account.balance ?? ""),
    });

    setEditingId(account._id);
    setShowForm(true);
  };

  // Create or update account
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.accountName.trim()) {
      toast.error("Account name is required");
      return;
    }

    if (
      form.balance.trim() === "" ||
      !Number.isFinite(Number(form.balance)) ||
      Number(form.balance) < 0
    ) {
      toast.error("Enter a valid balance");
      return;
    }

    const payload = {
      accountName: form.accountName.trim(),
      accountType: form.accountType,
      balance: Number(form.balance),
    };

    try {
      setSaving(true);

      if (editingId) {
        await axios.put(`${API}/update-account/${editingId}`, payload, {
          withCredentials: true,
        });

        toast.success("Account updated successfully");
      } else {
        await axios.post(`${API}/create-account`, payload, {
          withCredentials: true,
        });

        toast.success("Account created successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);

      await getAccounts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Delete account
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) {
      return;
    }

    try {
      await axios.delete(`${API}/delete-account/${id}`, {
        withCredentials: true,
      });

      toast.success("Account deleted successfully");
      await getAccounts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete account");
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // Total balance
  const totalBalance = accounts.reduce(
    (total, account) => total + Number(account.balance || 0),
    0,
  );

  // Account icons
  const getIcon = (type) => {
    const icons = {
      Cash: "bi-cash-stack",
      "Bank Account": "bi-bank",
      "Credit Card": "bi-credit-card",
      Wallet: "bi-wallet2",
      Savings: "bi-piggy-bank",
    };

    return icons[type] || "bi-wallet";
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">My Accounts</h3>
          <p className="text-secondary mb-0">
            Manage your financial accounts and balances.
          </p>
        </div>

        <button className="btn btn-primary px-4" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Account
        </button>
      </div>

      {/* Total Balance Card */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: "55px", height: "55px" }}
            >
              <i className="bi bi-wallet2 fs-3"></i>
            </div>

            <div>
              <p className="text-secondary mb-1">Total Account Balance</p>

              <h3 className="fw-bold mb-0">{formatCurrency(totalBalance)}</h3>
            </div>
          </div>

          <p className="text-secondary small mt-3 mb-0">
            {accounts.length} accounts available
          </p>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {editingId ? "Edit Account" : "Add New Account"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(initialForm);
                }}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Account Name */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Account Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="accountName"
                    placeholder="e.g. HDFC Bank"
                    value={form.accountName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Account Type */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Account Type</label>

                  <select
                    className="form-select"
                    name="accountType"
                    value={form.accountType}
                    onChange={handleChange}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Savings">Savings</option>
                  </select>
                </div>

                {/* Balance */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Initial Balance (INR)
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="balance"
                    placeholder="Enter amount"
                    value={form.balance}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm(initialForm);
                    }}
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
                        ? "Update Account"
                        : "Create Account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accounts Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">All Accounts</h5>

        <span className="text-secondary small">{accounts.length} accounts</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-secondary mt-2">Loading accounts...</p>
        </div>
      ) : accounts.length === 0 ? (
        /* Empty State */
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5">
            <i className="bi bi-wallet2 display-4 text-secondary"></i>

            <h5 className="fw-bold mt-3">No Accounts Found</h5>

            <p className="text-secondary">
              Add your first account to get started.
            </p>

            <button className="btn btn-primary" onClick={handleAdd}>
              Add Account
            </button>
          </div>
        </div>
      ) : (
        /* Account Cards */
        <div className="row g-3">
          {accounts.map((account) => (
            <div className="col-12 col-md-6 col-xl-4" key={account._id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <i className={`${getIcon(account.accountType)} fs-4`}></i>
                    </div>

                    <div className="dropdown">
                      <button
                        className="btn btn-light btn-sm"
                        data-bs-toggle="dropdown"
                        type="button"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleEdit(account)}
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Edit
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(account._id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h5 className="fw-bold mt-3 mb-1">{account.accountName}</h5>

                  <span className="badge bg-light text-secondary border">
                    {account.accountType}
                  </span>

                  <div className="mt-4">
                    <p className="text-secondary small mb-1">
                      Available Balance
                    </p>

                    <h4 className="fw-bold mb-0">
                      {formatCurrency(account.balance)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accounts;
