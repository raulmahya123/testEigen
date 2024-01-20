import { get } from "https://jscroot.github.io/api/croot.js";
import { URLGeoJson } from "../url/template.js";
import { MakeGeojsonFromAPI, responseData, AddLayerToMAP, drawer } from "./controller.js";
import {map} from '../url/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover, GetLonLat} from './popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './cog.js';


onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);


map.on('click', onMapClick);
// map.on('click', onMapInput)
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);


get(URLGeoJson,data => {
    responseData(data)
    let link = MakeGeojsonFromAPI(data)
    // console.log(link)
    // console.log(geojson)
    AddLayerToMAP(link)
    drawer(link)
}); 

