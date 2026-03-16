import React, { useState } from "react";
import "../../styles/pages/support/Support.css";

const FAQ_DATA = [
  {
    q: "What is TradeBlazer?",
    a: "TradeBlazer is a school-based marketplace where USTP students, faculty, and staff can buy and sell items. It's tailored specifically for the USTP-CDO community."
  },
  {
    q: "Who can use the site?",
    a: "Only currently enrolled USTP students, faculty, and staff with valid credentials may create accounts."
  },
  {
    q: "How do I list an item for sale?",
    a: "Log in with your USTP credentials, go to <strong>Add Post</strong>, provide a title, description, price, and optionally photos, then submit."
  },
  {
    q: "Is there a fee?",
    a: "No, TradeBlazer is completely free for USTP students. We do not charge commissions or listing fees."
  },
  {
    q: "How do I contact a seller?",
    a: "Each product card shows a <strong>Chat</strong> or <strong>Contact</strong> button (once chat is implemented) that lets you message the seller directly. For now, you can use the listing's description to look up the seller's preferred contact method."
  },
];

function Support() {
  const [activeSection, setActiveSection] = useState(null);
  const [reportText, setReportText] = useState('');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', reportText);
    alert('Thank you! Your report has been sent to the TradeBlazer team.');
    setReportText('');
    setActiveSection(null);
  };

  return (
    <div className="support-page">
      <header className="support-header">
        <h1>Support Center</h1>
        <p>How can the TradeBlazer team help you today?</p>
      </header>

      <div className="support-options">
        <div className={`support-section ${activeSection === "faq" ? "active" : ""}`}>
          <button className="support-btn" onClick={() => toggleSection("faq")}>
            FAQ
          </button>
          {activeSection === "faq" && (
            <div className="support-content animate-fade-in">
              <h2>Frequently Asked Questions</h2>
              {FAQ_DATA.map((item, index) => (
                <div key={index} className="faq-item">
                  <strong>{item.q}</strong>
                  <p dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`support-section ${activeSection === "contact" ? "active" : ""}`}>
          <button className="support-btn" onClick={() => toggleSection("contact")}>
            Contact Support
          </button>
          {activeSection === "contact" && (
            <div className="support-content">
              <h2>Contact Support</h2>
              <p>Email us directly at: <a href="mailto:ustptradeblazer@gmail.com">ustptradeblazer@gmail.com</a></p>
              <p>Typical response time: 24-48 hours.</p>
            </div>
          )}
        </div>

        <div className={`support-section ${activeSection === "report" ? "active" : ""}`}>
          <button className="support-btn" onClick={() => toggleSection("report")}>
            Report a Problem
          </button>
          {activeSection === "report" && (
            <div className="support-content">
              <h2>Report a Problem</h2>
              <form className="report-form" onSubmit={handleReportSubmit}>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Tell us what went wrong..."
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

      <footer className="app-info">
        <h3>App Information</h3>
        <p>Version 1.0.0</p>
        <p>Developed by TradeBlazer Team</p>
      </footer>
    </div>
  );
}

export default Support;