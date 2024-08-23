import React, { useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Poly from "./Poly";

const options = {
  //     position: google.maps.ControlPosition.RIGHT_CENTER,
  zoom: 5,
  // center: myLatlng,
  center: { lat: 26.8206, lng: 30.8025 },
  streetViewControl: false,
  mapTypeId: "satellite",
  scrollwheel: true,
  zoomControl: true,

  styles: [
    {
      featureType: "water",
      stylers: [
        {
          saturation: 43,
        },
        {
          lightness: -11,
        },
        {
          hue: "#0088ff",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: "#ff0000",
        },
        {
          saturation: -100,
        },
        {
          lightness: 99,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#808080",
        },
        {
          lightness: 54,
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ece2d9",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ccdca1",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#767676",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#b8cb93",
        },
      ],
    },
    {
      featureType: "poi.park",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.medical",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
  ],
};
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

function MainMapView() {
  // const [renderPolygons, setRenderPolygons] = useState<RenderPolygons>([]);
  // const [seachedLand, setseachedLand] = useState<SeachedLand>({
  //   id: "",
  //   farmName: "",
  //   farmPhone: "",
  // });
  // const [activeMarker, setActiveMarker] = useState<ActiveMarker>(null);
  // const renderedpolygonsWithPolygonsInstancsRef = useRef<
  //   RenderedpolygonsWithPolygonsInstancsRef | []
  // >([]); //{...backendData,polygon} //to reduce rendering only

  const onLoad = useCallback(function onLoad(mapInstance: google.maps.Map) {
    // do something with map Instance
  }, []);

  return (
    <GoogleMap
      onClick={() => {
        // console.log('welcome from googleMap onclik');
        // setActiveMarker(null);
      }}
      mapContainerStyle={mapContainerStyle}
      // mapContainerStyle={{
      //   marginTop: "4.5em",
      //   width: "100%",
      //   height: "90vh",
      //   overflow: "auto",
      //   position: "static",
      // }}
      options={options}
      onLoad={onLoad}
    >
      <Poly />
    </GoogleMap>
  );
}

export default MainMapView;
