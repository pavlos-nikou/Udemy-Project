mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());



const icon = document.createElement('div');
const width = 60;
const height = 60;
icon.className = 'marker';
icon.style.backgroundImage = `url(https://res.cloudinary.com/dzai2rayq/image/upload/v1696778517/camping-tent_abfvly.png)`;
icon.style.width = `${width}px`;
icon.style.height = `${height}px`;
icon.style.backgroundSize = '100%';

new mapboxgl.Marker(icon)
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(`<h3>${campground.title}</h3>`)
)
.addTo(map)
