import React from 'react';
import './AboutPage.css';
import Slider from '../Component/Slider';
import { SlideData } from '../resource/SlideData';

function AboutPage() {
  return (
    <div className='aboutpage'>
      <Slider slides={SlideData}/>
      <div className='about__button__container'>
        <button className='about__goto__main'>체험하기</button>
      </div>
    </div>
  )
}

export default AboutPage
