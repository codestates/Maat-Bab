import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileList from './ProfileList';
import './MateList.css';

// * MateList에 넘겨줄(Chatpage에서) props == 참여된 방의 참여자 리스트

function MateList({ my_user_id, selectedCard, mateList }) {
    console.log('mateList in MateList Component : ', mateList);

    // const mates = mateList.filter(mate => mate.user_id !== my_user_id)

    // const [mateList, setMateList] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/card?card_id=${selectedCard.card_id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             const list = res.data;
    //             const mate = list.map((user_card) => {
    //                 return user_card.User
    //             })
    //             setMateList(mate);
    //         })
    // }, [selectedCard])

    return (
        <div className='matelist'>
            <div className='matelist__header'>
                <div className='matelist__header__title'>맞밥 메이트 보기 🙋‍♀️</div>
                <div className='matelist__header__text'>카드를 클릭하여 맞밥 약속에 참여해보세요!</div>
            </div>
            <section className='profilelist__section'>
            <ProfileList mateList={mateList} />
            </section>

        </div>
    )
}

export default MateList
