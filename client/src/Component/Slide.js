import React from 'react';
import './Slide.css';

function Slide({ currentSlide, className, index, text, imgsrc}) {
  return (
    currentSlide === index ?
    <div className={className} id={index}>
      <div className='slide__content__message' id={index}>
        {text}
      </div>
        <div className='slide__content__image__container'>
          <img className='slide__content__image' id={index} src={imgsrc} alt={imgsrc} />
        </div>
      </div>
      :
      null
  )
}

export default Slide
