import React from 'react';
import './AboutPage.css';
import Slider from '../Component/Slider';
import { SlideData } from '../resource/SlideData';
import { useHistory } from 'react-router-dom';

function AboutPage() {
  const history = useHistory();
  const goToMainHandler = () => {
    history.push('/main')
  }
  return (
    <div className='aboutpage'>
      <Slider slides={SlideData}/>
      <div className='about__button__container'>
        <button className='about__goto__main' onClick={goToMainHandler}>체험하기</button>
      </div>
    </div>
  )
}

export default AboutPage
