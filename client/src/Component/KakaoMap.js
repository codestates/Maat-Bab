import React, { useEffect } from 'react';
import './KakaoMap.css';



const KakaoMap = ({city, district, searchingPlace, setCurnPlace}) => {

  const { kakao } = window;

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places(); 
    ps.keywordSearch(district + searchingPlace,placesSearchCB); // 주변 포함 검색

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        map.setBounds(bounds)
      }
    }

  function displayMarker(place) { // 장소 마커(핀) 기능
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    })
    // 마커에 클릭이벤트
    kakao.maps.event.addListener(marker, 'click', function () {
    // 마커를 클릭하면 장소명이 표출됨(infowindow)
      infowindow.setContent('<div style="padding:5px;font-size:12px;font-weight: 700;">' + place.place_name + '</div>')
      infowindow.open(map, marker)
      setCurnPlace(place.place_name); // 핀 클릭 시 현재 장소 값으로 저장
    })
  }
},[district, searchingPlace])

  return (
    <div id='myMap' style={{
        width: '100%', 
        height: '100%'
    }}>
      <div className='modal__map__location main'>{city} ▶︎ {district}</div>
    </div>
  );
}

export default KakaoMap; 