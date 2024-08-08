const arrowBtn = document.getElementById('arrow');
const ipAddressEl = document.getElementById('address');
const locationEl = document.getElementById('location');
const ispEl = document.getElementById('isp');
const timezoneEl = document.getElementById('timezone');
const inputEl = document.getElementById('inputEl');
const mapEl = document.getElementById('map');

async function fetchData() {
    const url = "https://geo.ipify.org/api/v2/country,city"; 
    const api_key = 'at_EwTHpVcaQft6tmSk8n68eplZj59lp';
    const ipOrDomain = inputEl.value;

    try {
        const response = await $.ajax({
            url: url,
            data: { apiKey: api_key, ipAddress: ipOrDomain },
        });
        console.log(response);

        if (response && response.ip && response.location && response.location.lat && response.location.lng) {
            // Update the DOM with the retrieved data
            ipAddressEl.textContent = response.ip;
            locationEl.textContent = `${response.location.city}, ${response.location.region}, ${response.location.country}`;
            ispEl.textContent = response.isp;
            timezoneEl.textContent = `UTC ${response.location.timezone}`;
            let lat = response.location.lat;
            let lng = response.location.lng;
            updateMap(lat, lng);
        } else {
            showAlert('Invalid IP address or domain. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        showAlert('Unable to fetch data. Please check your input or try again later.');
    }
}

function updateMap(lat, lng) {
    mapInstance.setView([lat, lng], 13);

    if (marker) {
        mapInstance.removeLayer(marker);
    }

    marker = L.marker([lat, lng]).addTo(mapInstance);
}

function showAlert(message) {
    alert(message);
}

arrowBtn.addEventListener('click', fetchData);
inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchData();
    }
});
