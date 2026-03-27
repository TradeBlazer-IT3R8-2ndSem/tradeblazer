import React, { useState, useEffect } from "react";
import "../../styles/pages/profile/ReportUser.css";
import api from "../../services/api";

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

  const handleSubmit = async () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    try {
      const reportData = {
        reporter: currentUser?.id,        // backend expects user IDs
        reported_user: product.seller_id, // seller ID from product
        reason: `${reason} - ${details}`, // combine reason + details
      };

      await api.post("/reports/", reportData); // ✅ call backend

      alert("Report submitted successfully!");
      onClose();

      // reset
      setReason("");
      setDetails("");
      setReportType("user");
    } catch (err) {
      console.error("Failed to submit report:", err);
      alert("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Report</h2>

        <div className="report-info">
          <p><strong>Seller:</strong> {product.seller}</p>
          <p><strong>Product:</strong> {product.title}</p>
        </div>

        <div className="report-group">
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="user">User</option>
            <option value="product">Product</option>
          </select>
        </div>

        <div className="report-group">
          <label>Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select reason</option>
            <option value="spam">Spam</option>
            <option value="scam">Scam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="fake">Fake Product</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="report-group">
          <label>Additional Details</label>
          <textarea
            placeholder="Explain the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="report-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>Submit Report</button>
        </div>
      </div>
    </div>
  );
};

export default ReportUser;