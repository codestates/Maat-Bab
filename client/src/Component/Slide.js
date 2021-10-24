import React from 'react';
import './Slide.css';

function Slide({text, imgsrc}) {
  return (
    <div className='slide'>
      <div className='slide__content__message'>
        {text}
      </div>
      <img className='slide__content__image' src={imgsrc} alt={imgsrc}/>
    </div>
  )
}

export default Slide
