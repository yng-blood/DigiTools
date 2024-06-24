import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Card.css';
import Toolscard from '../Tools/Toolscard';
import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';


const FileCard = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const { id: userId } = useParams();

  const click = () => {
    console.log(`clicked ${userId}`);
  };

  return (
    <>
      <div className="card-container">
        <button className="toggle-button" onClick={() => setShowAllCards(!showAllCards)}>
          {showAllCards ? 'Show Menu' : 'Show All Cards'}
        </button>

        {showAllCards ? (
          <>
            <div className="card">
              <Link to={`../FileUpload/${userId}`} className="card-link" onClick={click}>
                <div className="card-content">
                  <h3 className="card-title">Jpeg to PDF</h3>
                  <p className="card-description">Convert JPEG to PDF and save your documents by clicking here.</p>
                </div>
              </Link>
            </div>

            <div className="card">
              <Link to="./pdf-to-jpeg" className="card-link">
                <div className="card-content">
                  <h3 className="card-title">PDF to JPEG</h3>
                  <p className="card-description">Convert your PDF files to JPEG format easily.</p>
                </div>
              </Link>
            </div>

            <div className="card">
              <Link to={`../Showpdf/${userId}`} className="card-link">
                <div className="card-content">
                  <h3 className="card-title">Saved PDFs</h3>
                  <p className="card-description">View and manage your saved PDF files.</p>
                </div>
              </Link>
            </div>

            <div className="card">
              <Link to={`../Uploadpdf/${userId}`} className="card-link">
                <div className="card-content">
                  <h3 className="card-title">Upload Documents</h3>
                  <p className="card-description">Upload and store your important documents.</p>
                </div>
              </Link>
            </div>
            <div className="card">
              <Link to={`../Ex/${userId}`} className="card-link">
                <div className="card-content">
                  <h3 className="card-title">Upload Documents</h3>
                  <p className="card-description">Upload and store your important documents.</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <HamburgerMenu /> // Render your hamburger menu component when toggled
        )}
      </div>

      <Footer />
    </>
  );
};

export default FileCard;
