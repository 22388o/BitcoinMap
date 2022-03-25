import 'ol/ol.css';
import KML from 'ol/format/KML';
import Map from 'ol/Map';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

const styleCache = {};
const styleFunction = function (feature) {
  // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
  // standards-violating <magnitude> tag in each Placemark.  We extract it from
  // the Placemark's name instead.
  //const name = feature.get('name');
  //const magnitude = parseFloat(name.substr(2));
  const radius = 10;
  let style = styleCache[radius];
  if (!style) {
    style = new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: 'rgba(255, 153, 0, 0.4)',
        }),
        stroke: new Stroke({
          color: 'rgba(255, 204, 0, 0.2)',
          width: 1,
        }),
      }),
    });
    styleCache[radius] = style;
  }
  return style;
};

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'data/kml/export.kml',
    format: new KML({
      extractStyles: false,
    }),
  }),
  style: styleFunction,
});

const raster = new TileLayer({
  source: new Stamen({
    layer: 'toner',
  }),
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const info = $('#info');
info.tooltip({
  animation: false,
  trigger: 'manual',
});

const displayFeatureInfo = function (pixel) {
  info.css({
    left: pixel[0] + 'px',
    top: pixel[1] - 15 + 'px',
  });
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });
  if (feature) {
    info.attr('data-original-title', feature.get('name')).tooltip('show');
  } else {
    info.tooltip('hide');
  }
};

const clickFeatureInfo = function (pixel) {
  info.css({
    left: pixel[0] + 'px',
    top: pixel[1] - 15 + 'px',
  });
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });
  if (feature) {
    const coordinate = feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    const coordinates = coordinate.getCoordinates().toString().split(",");
    info.tooltip('hide');
    $("#header").html(feature.get("name"));
    $("#body").html(
      "<p>Address: "+feature.get("addr:street")+" "+(feature.get("addr:housenumber") ? feature.get("addr:housenumber") : "")
      +(feature.get("website") ? '<br>Website: <a href="'+feature.get("website")+'"  target="_blank">'+feature.get("website")+'</a>' : "")
      +(feature.get("phone") ? '<br>Phone: <a href="tel:'+feature.get("phone").replace(" ","")+'">'+feature.get("phone")+'</a>' : "")
      +(feature.get("email") ? '<br>Email: <a href="mailto:'+feature.get("email").replace(" ","")+'">'+feature.get("email")+'</a>' : "")
      +'<br> <a href="geo:'+coordinates[0]+','+coordinates[1]+'" target="_blank">Click here to open in map</a>'
      +"</p>"
    );
    $("#myModal").modal();
    
    //alert(feature.get("addr:street"))
  } else {
    info.tooltip('hide');
  }
};

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    info.tooltip('hide');
    return;
  }
  displayFeatureInfo(map.getEventPixel(evt.originalEvent));
});

map.on('click', function (evt) {
  clickFeatureInfo(evt.pixel);
});