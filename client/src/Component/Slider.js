import React, {useState, useEffect, useRef} from 'react';
import './Slider.css';
import Slide from './Slide';
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const TOTAL_SLIDES = slides.length -1;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    // slideRef.current.style.transform = `translateY(-${currentSlide}00%)`
    setTimeout(() => {
      if(currentSlide === 2){
        setCurrentSlide(0)
      }else{
        setCurrentSlide(currentSlide + 1)
      }
    }, 5000);
  }, [currentSlide])
  
  return (
    <div className='slider'>
      <div className='slides__container' ref={slideRef}>
        {slides.map((slide, index) => {
          return (
              <Slide currentSlide={currentSlide} className='slide active' index={index} text={slide.text} imgsrc={slide.image} />
          )
        })
      }
      </div>
      <div className='slide__button__container'>
        <FaAngleUp className='slide__button' onClick={prevSlide}/>
        <FaAngleDown className='slide__button' onClick={nextSlide}/>
      </div>
    </div>
  )
}

export default Slider
