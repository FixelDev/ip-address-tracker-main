let map;
let mapMarker;
const markerIcon = L.icon
({
    iconUrl: './images/icon-location.svg'
});


initMap();
getUserIpAddress();



function initMap()
{    
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapMarker = L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

    
}

function getUserIpAddress()
{
    fetch('https://api.ipify.org/?format=json')
    .then(res => res.json())
    .then(data => requestData(data.ip));
}

document.querySelector('#search-btn').addEventListener('click', search);

function search()
{
    let inputParameter = document.querySelector('#search-input').value;

    requestData(inputParameter)
}

function requestData(parameter)
{   
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    
    if(regexExp.test(parameter))
    {
        parameter = `ipAddress=${parameter}`;
    }
    else
    {
        parameter = `domain=${parameter}`;
    }

    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_IOsXFicoR2fIgN1b1jNPEehxnP8wh&${parameter}`;



    fetch(url)
    .then(res => res.json())
    .then(data => showData(data));
}

function showData(data)
{
    const ipAddress = document.querySelector('#ip-address');
    const location = document.querySelector('#location');
    const timezone = document.querySelector('#timezone');
    const isp = document.querySelector('#isp');

    ipAddress.textContent = data.ip;
    location.textContent = `${data.location.country}, ${data.location.city}`;
    timezone.textContent = `UTC ${data.location.timezone}`;
    isp.textContent = data.isp;

    const lat = data.location.lat;
    const lng = data.location.lng;

    

    changeMapView(lat, lng);
}

function changeMapView(lat, lng)
{
    const latlng = L.latLng(lat, lng);

    mapMarker.setLatLng(latlng);
    map.setView(latlng, 13);
}