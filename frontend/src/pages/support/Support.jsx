// frontend/src/pages/support/Support.jsx
import React, { useState } from "react";
import "../../styles/pages/support/Support.css";

function Support() {
  const [activeSection, setActiveSection] = useState(null);
  const [reportText, setReportText] = useState('');

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="support-page">
      <h1>Support</h1>

      <div className="support-options">
        {/* FAQ Section */}
        <div className="support-section">
          <button
            className="support-btn"
            onClick={() => handleClick("faq")}
          >
            FAQ
          </button>
          {activeSection === "faq" && (
            <div className="support-content">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-item">
                <strong>What is TradeBlazer?</strong>
                <p>
                  TradeBlazer is a school‑based marketplace where USTP students,faculty and staff can
                  buy and sell items with one another. Think of it as your
                  campus classified ads, tailored just for the USTP-CDO community.
                </p>
              </div>
              <div className="faq-item">
                <strong>Who can use the site?</strong>
                <p>Only currently enrolled USTP students, faculty and staff may create accounts and post listings.</p>
              </div>
              <div className="faq-item">
                <strong>How do I list an item for sale?</strong>
                <p>
                  Log in with your USTP credentials, go to "Add Post," provide
                  a title, description, price, and optionally photos, then submit.
                  Your listing will appear on the home page under the appropriate category.
                </p>
              </div>
              <div className="faq-item">
                <strong>Is there a fee?</strong>
                <p>
                  No, TradeBlazer is completely free for USTP students. We do not
                  charge commissions or listing fees.
                </p>
              </div>
              <div className="faq-item">
                <strong>How do I contact a seller?</strong>
                <p>
                  Each product card shows a "Chat" or "Contact" button (once chat is
                  implemented) that lets you message the seller directly. For now,
                  you can use the listing's description to look up the seller's
                  preferred contact method.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="support-section">
          <button
            className="support-btn"
            onClick={() => handleClick("contact")}
          >
            Contact Support
          </button>
          {activeSection === "contact" && (
            <div className="support-content">
              <h2>Contact Support</h2>
              <p>Please email us at support@tradeblazer.com</p>
            </div>
          )}
        </div>

        {/* Report a Problem Section */}
        <div className="support-section">
          <button
            className="support-btn"
            onClick={() => handleClick("report")}
          >
            Report a Problem
          </button>
          {activeSection === "report" && (
            <div className="support-content">
              <h2>Report a Problem</h2>
              <p>Describe the issue you're facing and we'll look into it.</p>
              <form
                className="report-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  // for now just log; backend hookup would go here
                  console.log('report submitted', reportText);
                  alert('Thank you for your report!');
                  setReportText('');
                }}
              >
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Type a description of the issue..."
                  required
                />
                <button type="submit" className="support-btn small-submit">
                  Submit Report
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="app-info">
        <h2>App Information</h2>
        <p>Version: 1.0.0</p>
        <p>Developed by: TradeBlazer Team</p>
      </div>
    </div>
  );
}

export default Support;
