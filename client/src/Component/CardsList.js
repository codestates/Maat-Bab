import React from 'react';
import Card from './Card';
import './CardsList.css';

function CardsList() {
    return (
        <div className='cardslist'>
            
            <Card className='card__section'/>
            <Card className='card__section'/>
            <Card className='card__section'/>
            <Card className='card__section'/>
            <Card className='card__section'/>

        </div>
    )
}

export default CardsList
