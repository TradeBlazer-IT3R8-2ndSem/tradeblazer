import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import "../../../styles/pages/admin/panels/ReportsPanel.css";

export default function ReportsPanel() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports/");
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="reports-panel">
      <div className="panel-header">
        <h1>Reports</h1>
        <p className="panel-description">View and manage user/product reports</p>
      </div>

      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reporter</th>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reporter}</td>
                <td>{report.reported_user}</td>
                <td>{report.reason}</td>
                <td>{new Date(report.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}