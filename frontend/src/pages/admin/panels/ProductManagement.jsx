import React, { useState } from 'react';
import '../../../styles/pages/admin/panels/ProductManagement.css';
import ViewReport from './ViewReport';

export default function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, title: 'Vintage Camera', seller: 'John D', reports: 0, date: '2025-03-01', reportDetails: [] },
    { id: 2, title: 'Fake Designer Bag', seller: 'Shandie B', reports: 3, date: '2025-03-05', reportDetails: [
      { image: 'meme.jpg', reason: 'gisi gisi na mani oie' },
      { image: 'meme.jpg', reason: 'jusq ang seller late ug 5hrs sa meet up' },
      { image: 'meme.jpg', reason: 'mura manig sa panahon pa ni Rizal kaulaw ba igamit' }
    ] },
    { id: 3, title: 'Used Textbook', seller: 'Cypress B', reports: 0, date: '2025-03-10', reportDetails: [] },
    { id: 4, title: 'Counterfeit Electronics', seller: 'Syntyche C', reports: 5, date: '2025-03-12', reportDetails: [
      { image: 'meme.jpg', reason: 'black screen ra mani' },
      { image: 'meme.jpg', reason: 'pagka ugma guba na' },
      { image: 'meme.jpg', reason: 'maypa sa cogon ko nag palit' },
      { image: 'meme.jpg', reason: 'walay charger' },
      { image: 'meme.jpg', reason: 'overpriced kaayo mahulog na man lcd ani' }
    ] },
    { id: 5, title: 'Handmade Jewelry', seller: 'Jomar A', reports: 1, date: '2025-03-15', reportDetails: [
      { image: 'meme.jpg', reason: 'pag suot nabugto daritso' }
    ] },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRemove = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const getRiskLevel = (reports) => {
    if (reports === 0) return 'low';
    if (reports <= 2) return 'medium';
    return 'high';
  };

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.reports - a.reports);

  return (
    <div className="product-management-panel">

      <div className="panel-header">
        <h1>Product & Service Management</h1>
        <p className="panel-description">
          Monitor reported listings and manage problematic content
        </p>
      </div>

      <div className="management-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or seller..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Seller</th>
              <th>Reports</th>
              <th>Risk Level</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="product-title">{product.title}</td>
                <td className="product-seller">{product.seller}</td>

                <td>
                  <span className={`report-count ${getRiskLevel(product.reports)}`}>
                    {product.reports}
                  </span>
                </td>

                <td>
                  <span className={`risk-level ${getRiskLevel(product.reports)}`}>
                    {getRiskLevel(product.reports)}
                  </span>
                </td>

                <td>{product.date}</td>

                <td className="product-actions">
                  <button 
                    className="btn-action" 
                    title="View Content"
                    onClick={() => handleViewDetails(product)}
                  >
                    👁
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleRemove(product.id)}
                    title="Delete Content"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="table-footer">
        <p>{filteredProducts.length} product(s) displayed</p>
      </div>

      {showModal && selectedProduct && (
        <ViewReport product={selectedProduct} onClose={closeModal} />
      )}

    </div>
  );
}