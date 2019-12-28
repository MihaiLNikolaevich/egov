const loadGoogleMapsApi = require('load-google-maps-api');
import icoMap from '../img/icon-svg/maps.svg';

class Map {

    static loadGoogleMapsApi() {
        return loadGoogleMapsApi({ key: 'AIzaSyA4cn0T63XD7j-FV6Z1gI0TalhQ4eGsWj8' });
    }

    static createMap(googleMaps, mapElement, position) {
        const maps = new googleMaps.Map(mapElement, {
            center: position,
            zoom: 14,
        });

        return this.createMarker(googleMaps, maps, position)
    }

    static createMarker(googleMaps, maps, position) {

        return new googleMaps.Marker({
            position: position,
            map: maps,
            icon: icoMap
        });
    }
}
export { Map };