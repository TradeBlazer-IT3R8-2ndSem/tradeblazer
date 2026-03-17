import React from 'react';
import '../../../styles/pages/admin/panels/ProductManagement.css';

export default function ViewReport({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product.title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-product-info">
            <strong>Seller:</strong> {product.seller} | <strong>Date:</strong> {product.date}
          </p>

          {product.reportDetails.length > 0 ? (
            <div className="reports-container">
              <h3>Report Details ({product.reportDetails.length})</h3>
              {product.reportDetails.map((report, index) => (
                <div key={index} className="report-item">
                  <div className="report-image">
                    <img src={report.image} alt="Evidence" />
                  </div>
                  <div className="report-explanation">
                    <p>{report.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reports">No reports for this product</p>
          )}
        </div>
      </div>
    </div>
  );
}
