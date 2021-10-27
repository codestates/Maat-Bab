import React, { useEffect, useState } from 'react';
import './KakaoMap.css';
import axios from 'axios';


const { kakao } = window;

const KakaoMap = ({city, city2, searchPlace, setCurnPlace}) => {


    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(37.566826, 126.9786567),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(city2, function (result, status) {

          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {
      
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        })
    }, []);

    useEffect(() => {
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
      const container = document.getElementById('myMap')
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }
      const map = new kakao.maps.Map(container, options)
  
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch(city2 + searchPlace, placesSearchCB)
  
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds()
  
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i])
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
  
          map.setBounds(bounds)
        }
      }
  
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        })
  
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          
          infowindow.setContent('<div style="padding:5px;font-size:12px;font-weight: 700;">' + place.place_name + '</div>')
          infowindow.open(map, marker)
          setCurnPlace(place.place_name)
        })
      }
    },[searchPlace])

   

    return (
        <div id='myMap' style={{
            width: '100%', 
            height: '100%'
        }}>
          <div className='modal__map__location'>{city} ▶︎ {city2}</div>
        </div>
    );
}

export default KakaoMap; 