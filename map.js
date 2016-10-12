/* We are using two different styles for the polygons:
   *  - The first style is for the polygons themselves.
   *  - The second style is to draw the vertices of the polygons.
   *    In a custom `geometry` function the vertices of a polygon are
   *    returned as `MultiPoint` geometry, which will be used to render
   *    the style.

   Knowledge Base:
   http://openlayers.org/en/latest/apidoc/ol.style.Fill.html
   http://openlayers.org/en/latest/apidoc/ol.colorlike.html
   https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
   https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
   https://developer.mozilla.org/en-US/docs/Web/API/ImageData

   */

/*
 ol.ColorLike{string} {CanvasPattern} {CanvasGradient}

A type accepted by CanvasRenderingContext2D.fillStyle. Represents a color, 	pattern, or gradient.
*/

var geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857'
    }
  },
  'features': [{
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [-5e6, 6e6],
          [-5e6, 8e6],
          [-3e6, 8e6],
          [-3e6, 6e6],
          [-5e6, 6e6]
        ]
      ]
    }
  }, {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [-2e6, 6e6],
          [-2e6, 8e6],
          [0, 8e6],
          [0, 6e6],
          [-2e6, 6e6]
        ]
      ]
    }
  }, {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [1e6, 6e6],
          [1e6, 8e6],
          [3e6, 8e6],
          [3e6, 6e6],
          [1e6, 6e6]
        ]
      ]
    }
  }, {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [-2e6, -1e6],
          [-1e6, 1e6],
          [0, -1e6],
          [-2e6, -1e6]
        ]
      ]
    }
  }]
};

var source = new ol.source.Vector({
  features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
});

var layer = new ol.layer.Vector({
  source: source
});

/*
 ol.ColorLike{string} {CanvasPattern} {CanvasGradient}

A type accepted by CanvasRenderingContext2D.fillStyle. Represents a color, 	pattern, or gradient.
*/
var cnv = document.createElement('canvas');
var ctx = cnv.getContext('2d');
ctx.fillStyle = 'blue';
var img = new Image();
img.src = 'dot.png';
img.onload = function() {
  var pattern = ctx.createPattern(img, 'repeat');

  layer.setStyle(new ol.style.Style({
    fill: new ol.style.Fill({
      color: pattern
    })
  }));
}

//TODO: change image color / background color

var map = new ol.Map({
  layers: [layer],
  target: 'map',
  view: new ol.View({
    center: [0, 3000000],
    zoom: 2
  })
});
