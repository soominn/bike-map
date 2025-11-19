// const serviceKey = '5062656b4863686f38377150657242'; // 127.0.0.1 용
const serviceKey = '645043417563686f3830637573626c'; // Github Pages 용
const baseUrl = `http://openapi.seoul.go.kr:8088/${serviceKey}/json/bikeList`;
const pageSize = 1000;

let map;
let clusterer;
let markers = [];
let infowindows = [];

async function fetchBikeListAll() {
    let start = 1;
    let end = pageSize;
    let allData = [];

    while(true) {
        const url = `${baseUrl}/${start}/${end}/`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.CODE == 'INFO-200') break;

        allData.push(...data.rentBikeStatus.row);

        start += pageSize;
        end += pageSize;
    }

    return allData;
}

async function loadBikeDataAndRender() {
    showLoading();

    try {
        const bikeList = await fetchBikeListAll();
        renderBikeMarkers(bikeList);
    } catch (error) {
        console.error('에러 발생:', error);
    } finally {
        hideLoading();
    }
}

function renderBikeMarkers(data) {
    markers.forEach(marker => {
        infowindows.forEach(infowindow => infowindow.close(map, marker));
        marker.setMap(null);
    });
    markers = [];
    infowindows = [];
    if(clusterer) clusterer.clear();

    let imageSize = new kakao.maps.Size(22, 26);
    let offset = new kakao.maps.Point(10, 0);

    let redMarkerImage = new kakao.maps.MarkerImage('./images/red.png', imageSize, offset);
    let greenMarkerImage = new kakao.maps.MarkerImage('./images/green.png', imageSize, offset);
    let yellowMarkerImage = new kakao.maps.MarkerImage('./images/yellow.png', imageSize, offset);

    data.forEach(bikeList => {
        let lat = bikeList.stationLatitude;
        let lng = bikeList.stationLongitude;
        let bikeCnt = bikeList.parkingBikeTotCnt;

        let markerSetting = { position: new kakao.maps.LatLng(lat, lng), clickable: true, image: yellowMarkerImage };
        if(bikeCnt == 0) {
            markerSetting = { position: new kakao.maps.LatLng(lat, lng), clickable: true, image: redMarkerImage };
        } else if(bikeCnt >= 5) {
            markerSetting = { position: new kakao.maps.LatLng(lat, lng), clickable: true, image: greenMarkerImage };
        }
        let marker = new kakao.maps.Marker(markerSetting);
        markers.push(marker);

        let infowindow = new kakao.maps.InfoWindow({
            position: new kakao.maps.LatLng(lat, lng),
            content: `<div style="width: 200px;">${bikeList.stationName.split('.')[1].trimStart()}</div>`
        });
        infowindows.push(infowindow);
        
        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    });

    clusterer.addMarkers(markers);
}

kakao.maps.load(function() {
    navigator.geolocation.getCurrentPosition((position) => {
        let currentLocationLat = position.coords.latitude;
        let currentLocationLng = position.coords.longitude;

        map = new kakao.maps.Map(document.getElementById("map"), {
            center: new kakao.maps.LatLng(currentLocationLat, currentLocationLng),
            level: 10
        });
    
        clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 7
        });

        loadBikeDataAndRender();
    });
});

function showLoading() {
    document.getElementById('loading-overlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
}