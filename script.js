let map;
let markers = [];

function initMap() {
    const mapOptions = {
        center: { lat: 37.9838, lng: 23.7275 }, // Set the initial map center
        zoom: 12,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Create markers for each location
    createMarker({ lat: 37.9819, lng: 23.7275, category: 'category1', info: 'Info for Location 1' });
    createMarker({ lat: 37.9789, lng: 23.7516, category: 'category2', info: 'Info for Location 2' });
    // Add more markers with their respective categories and info

    // Display all markers initially
    showMarkers();
}

function createMarker(position) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        category: position.category,
        info: position.info,
    });

    marker.addListener('click', () => {
        showInfoWindow(marker);
    });

    markers.push(marker);
}

function showInfoWindow(marker) {
    const infoWindow = new google.maps.InfoWindow({
        content: marker.info,
    });

    infoWindow.open(map, marker);
}

function showMarkers() {
    markers.forEach(marker => {
        marker.setMap(map);
    });
}

function hideMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
   });
}

function filterMarkers() {
    const selectedCategory = document.getElementById("category").value;

    if (selectedCategory === "all") {
        showMarkers();
    } else {
        hideMarkers();
        const filteredMarkers = markers.filter(marker => marker.category === selectedCategory);
        filteredMarkers.forEach(marker => marker.setMap(map));
    }
}
