const initMap = ()=>{
    const home = { lang:3333, long: 33333};
    const map = google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: map
    });
    const marker = google.maps.Marker({
        position: home,
        map: map
    });
}
