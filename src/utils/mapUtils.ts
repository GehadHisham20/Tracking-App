class MapUtils {
  fitBounds(polygonsInstances: google.maps.Polygon[], mapInstance: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    if (polygonsInstances.length > 0) {
      for (let i = 0; i < polygonsInstances.length; i++) {
        const paths = polygonsInstances[i].getPaths();

        paths.forEach((path) => {
          const ar = path.getArray();

          for (let i = 0, l = ar.length; i < l; i++) {
            bounds.extend(ar[i]);
          }
        });
      }
      mapInstance.fitBounds(bounds);
      mapInstance.setCenter(bounds.getCenter());
    }
  }

  markersFitBounds(markers: google.maps.Marker[], mapInstance: google.maps.Map) {
    // console.log(markers);
    const bounds = new window.google.maps.LatLngBounds();
    if (markers.length > 0) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].getVisible()) {
          const x = markers[i].getPosition();
          if (x) {
            bounds.extend(x);
          }
        }
      }

      mapInstance.fitBounds(bounds);
      mapInstance.setCenter(bounds.getCenter());
    }
  }
  polylineFitBounds(polyline: google.maps.Polyline, mapInstance: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();

    polyline.getPath().forEach(function (e) {
      //can't do polyline.getPath()[i] because it's a MVCArray
      bounds.extend(e);
    });
    mapInstance.fitBounds(bounds);
    mapInstance.setCenter(bounds.getCenter());
  }

  pointsFitBounds(points: google.maps.LatLng[], mapInstance: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    if (points.length > 0) {
      for (let i = 0; i < points.length; i++) {
        const x = points[i];
        bounds.extend(x);
      }
    }
    mapInstance.fitBounds(bounds);
    mapInstance.setCenter(bounds.getCenter());
  }

  check_marker_is_in_or_out(marker: google.maps.Marker, mapInstance: google.maps.Map) {
    return mapInstance.getBounds()?.contains(marker.getPosition()!);
  }
}

export default new MapUtils();
