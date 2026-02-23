// app.js

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Load offline tiles
L.tileLayer('path/to/offline-tiles/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// GPX file tracking
function loadGPX(gpxFile) {
    const gpxLayer = new L.GPX(gpxFile, {\
        async: true
    }).on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);
}

// Two-finger rotation for mobile devices
map.on('touchrotate', function(event) {
    // Implement rotation logic here
});

// Distance calculation along GPX routes
function calculateDistance(gpxLayer) {
    let totalDistance = 0;
    gpxLayer.getLayers().forEach((segment) => {
        const latlngs = segment.getLatLngs();
        for (let i = 0; i < latlngs.length - 1; i++) {
            totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
        }
    });
    return totalDistance;
}

// Usage example
loadGPX('path/to/your.gpx');

console.log('Total distance: ' + calculateDistance(gpxLayer) + ' meters');
