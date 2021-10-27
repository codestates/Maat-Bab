import React from 'react';
import CardsList from './CardsList';
import './List.css';

function List() {
    return (
        <div className='list'>
            <div className='list__header'>
                <div className='list__header__title'>맞밥 약속 목록</div>
                <div className='list__header__text'>카드를 클릭하여 맞밥 약속에 참여해보세요!</div>
            </div>
            <section className='card__list__section'> 
            <CardsList />
            </section>
        </div>
    )
}

export default List
