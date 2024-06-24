import React, { useState, useRef, useEffect } from 'react';
import './Tools.css';
import JpegConvertor from '../Jpeg/JpegConvertor';
import Loading from '../Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import Ex from '../Excelltopdf/Ex';

const Toolscard = () => {
    const userId= useParams()
  const [cardOne, setCardOne] = useState(false);
  const [cardTwo, setCardTwo] = useState(false);
  const [cardThree, setCardThree] = useState(false);
  const [cardFour, setCardFour] = useState(false);
  const cardRef = useRef(null);

  const handleCardClickOne = () => {
    setCardOne(!cardOne);
    setCardTwo(false);
    setCardThree(false);
    setCardFour(false);
  };

  const handleCardClickTwo = () => {
    setCardTwo(!cardTwo);
    setCardOne(false);
    setCardThree(false);
    setCardFour(false);
  };

  const handleCardClickThree = () => {
    setCardThree(!cardThree);
    setCardOne(false);
    setCardTwo(false);
    setCardFour(false);
  };

  const handleCardClickFour = () => {
    setCardFour(!cardFour);
    setCardOne(false);
    setCardTwo(false);
    setCardThree(false);
  };

  const handleFileSelected = (card) => {
    if (card === 1) {
      setCardOne(true);
    } else if (card === 2) {
      setCardTwo(true);
    } else if (card === 3) {
      setCardThree(true);
    } else if (card === 4) {
      setCardFour(true);
    }
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setCardOne(false);
      setCardTwo(false);
      setCardThree(false);
      setCardFour(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <h1>Our Other Lite tools</h1>
      </div>
      <div className={`container ${cardOne || cardTwo || cardThree || cardFour ? 'blurred' : ''}  wrapit`  }>
        <div className="card-container" ref={cardRef}>
          <div className={`card card-red ${cardOne ? 'expanded' : ''}`} onClick={handleCardClickOne}>
            {cardOne ? (
              <div className="card-content" onClick={(e) => e.stopPropagation()}>
                <JpegConvertor onFileSelected={() => handleFileSelected(1)} />
              </div>
            ) : (
              <img className='Image_sec' src='https://cdn.storifyme.xyz/accounts/cashify-in-0561312/assets/f-unnamed-78821672557714089.png?t=1672560804000'/>
            )}
          </div>
          <div className={`card card-blue ${cardTwo ? 'expanded' : ''}`} onClick={handleCardClickTwo}>
            {cardTwo ? (
              <div className="card-content" onClick={(e) => e.stopPropagation()}>
                <Loading />
              </div>
            ) : (
                <img className='Image_sec' src='data:image/png;base64,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'/>
            
            )}
          </div>
          <div className={`card card-green ${cardThree ? 'expanded' : ''}`} onClick={handleCardClickThree}>
            {cardThree ? (
              <div className="card-content" onClick={(e) => e.stopPropagation()}>
                <Loading />
                Edit Images
              </div>
            ) : (
                <img className='Image_sec' src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_edit.Magazin.png'/>
            
            )}
          </div>
          <div className={`card card-yellow ${cardFour ? 'expanded' : ''}`} onClick={handleCardClickFour}>
            {cardFour ? (
              <div className="card-content" onClick={(e) => e.stopPropagation()}>
                Convert Zip 
                <br/>
                <br/>
                <br/>
                <Loading />
              </div>
            ) : (
                <img className='Image_sec' src='https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/65466b57ef3a01001d21f2a1.png'/>
            
            )}
          </div>
          <div className={`card card-yellow ${cardFour ? 'expanded' : ''}`} onClick={handleCardClickFour}>
            {cardFour ? (
              <div className="card-content" onClick={(e) => e.stopPropagation()}>
               
              </div>
            ) : (
                <Link to={`../Ex/${userId}`} className="card-link">
                 <img className='Image_sec' src='https://assets-global.website-files.com/6488c1686a91cbc68694a6c1/649884b1c7b645dcdcdafe38_tool-Excel-to-PDF.svg'/>              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolscard;
