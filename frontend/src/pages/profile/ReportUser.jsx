import React, { useState, useEffect } from "react";
import "../../styles/pages/profile/ReportUser.css";

const ReportUser = ({ isOpen, onClose, product }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reportType, setReportType] = useState("user"); 
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setCurrentUser(userData);
  }, []);

  if (!isOpen || !product) return null;

  const handleSubmit = () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    const reportData = {
      reporter: currentUser?.name,
      reportedUser: product.seller,
      productId: product.id,
      productName: product.name,
      type: reportType,
      reason,
      details,
      createdAt: new Date().toISOString(),
    };

    // Save locally (you can replace with API)
    const existingReports = JSON.parse(localStorage.getItem("reports")) || [];
    const updatedReports = [...existingReports, reportData];
    localStorage.setItem("reports", JSON.stringify(updatedReports));

    alert("Report submitted successfully!");
    onClose();

    // reset
    setReason("");
    setDetails("");
    setReportType("user");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="report-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Report</h2>

        <div className="report-info">
          <p><strong>Seller:</strong> {product.seller}</p>
          <p><strong>Product:</strong> {product.name}</p>
        </div>

        {/* TYPE */}
        <div className="report-group">
          <label>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="product">Product</option>
          </select>
        </div>

        {/* REASON */}
        <div className="report-group">
          <label>Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="spam">Spam</option>
            <option value="scam">Scam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="fake">Fake Product</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DETAILS */}
        <div className="report-group">
          <label>Additional Details</label>
          <textarea
            placeholder="Explain the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* ACTIONS */}
        <div className="report-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportUser;