import { useState, useEffect } from "react";
import axios from 'axios';
import "../Autcss.css"
const { Link, useParams } = require("react-router-dom");


const Showpdf = () => {
    const [pdfs, setPdfs] = useState([]);
    const [error, setError] = useState(null);
    const { id: userId } = useParams();
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pdfs');
        const pdfData = response.data.map(pdf => {
          const pdfBlob = new Blob([new Uint8Array(pdf.data.data)], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          return { ...pdf, url: pdfUrl };
        });
        setPdfs(pdfData);
        setError(null);
      } catch (error) {
        setError('Error fetching PDFs');
        console.error('Error fetching PDFs:', error);
      }
    };

    useEffect(() => {
      fetchPdfs();
    }, []);

    const handlePreviewPdf = (pdfUrl) => {
      window.open(pdfUrl, '_blank');
    };

    return (
      <div>
         <Link to={`../UserHome/${userId}`} className="back-button"> back to page
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.354 2.354a.5.5 0 0 1 0 .708L2.707 7.5H14.5a.5.5 0 0 1 0 1H2.707l4.647 4.646a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
        </svg>
      </Link>
        <h1>PDF Viewer</h1>
        {pdfs.length === 0 && !error && <p>No PDFs available</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          {pdfs.map((pdf, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div className="w_blocx"><span>{pdf.filename}</span>
              <button onClick={() => handlePreviewPdf(pdf.url)}>Preview</button></div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Showpdf;
