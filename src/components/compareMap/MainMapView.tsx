import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import Direction from "./direction";
import { IPoint } from "components/types";

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
  height: "90vh",
};

const polyOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ],
  zIndex: 1,
};

//samePathButNotSamePoints
const samePathButNotSamePoints = [
  {
    lat: 30.316400000000015,
    lng: 30.897950000000099,
  },
  {
    lat: 30.316390000000004,
    lng: 30.89769,
  },
  {
    lat: 30.315990000000004,
    lng: 30.896420000000003,
  },
  {
    lat: 30.315990000000002,
    lng: 30.895870000000002,
  },
  {
    lat: 30.315990000000002,
    lng: 30.89533,
  },

  {
    lat: 30.315990000000003,
    lng: 30.893750000000004,
  },

  {
    lat: 30.31679,
    lng: 30.893220000000003,
  },
];
// fimilar path
const fimilarPath = [
  { lat: 30.316398, lng: 30.897941 },

  { lat: 30.317211, lng: 30.897254 },

  { lat: 30.316145, lng: 30.893653 },

  { lat: 30.31678, lng: 30.89323 },
];

//identical path
const identicalPath = [
  {
    lat: 30.316380000000002,
    lng: 30.897940000000002,
  },
  {
    lat: 30.316330000000004,
    lng: 30.89769,
  },
  {
    lat: 30.315960000000004,
    lng: 30.896420000000003,
  },
  {
    lat: 30.315910000000002,
    lng: 30.895870000000002,
  },
  {
    lat: 30.315910000000002,
    lng: 30.89533,
  },

  {
    lat: 30.315900000000003,
    lng: 30.893750000000004,
  },

  {
    lat: 30.31678,
    lng: 30.893220000000003,
  },
];

const wrongPath = [
  {
    lat: 30.316380000000002,
    lng: 30.897940000000002,
  },

  {
    lat: 30.31706,
    lng: 30.901320000000002,
  },

  {
    lat: 30.317220000000002,
    lng: 30.90218,
  },

  {
    lat: 30.317570000000003,
    lng: 30.901780000000002,
  },
  {
    lat: 30.317770000000003,
    lng: 30.901640000000004,
  },
  {
    lat: 30.318050000000003,
    lng: 30.901500000000002,
  },

  {
    lat: 30.320050000000002,
    lng: 30.900720000000003,
  },

  {
    lat: 30.319570000000002,
    lng: 30.89946,
  },
  {
    lat: 30.319820000000004,
    lng: 30.899330000000003,
  },
];

function MainMapView() {
  const [rendredDirectionPath, setRendredDirectionPath] = useState<null>(null);
  const [path, setPath] = useState<[] | IPoint[]>([]);
  function handleOnClick() {
    if (rendredDirectionPath) {
      // const result = rendredDirectionPath.map((one) => one.toJSON());
      // console.log("====================================");
      // console.log(result);
      // console.log("====================================");
      const ployline = new google.maps.Polyline({ path: rendredDirectionPath });
      path.forEach((one, index) => {
        const result = google.maps.geometry.poly.isLocationOnEdge(one, ployline, 10e-5);
        if (result) {
          console.log("the point ", index + 1, " is in the path");
        } else {
          console.log("the point ", index + 1, " is not in the path");
        }
      });
    }
  }
  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} options={options}>
        <Polyline path={path} options={polyOptions} />
        {path.map((one, index) => (
          <Marker key={index} position={one} label={(index + 1).toString()} />
        ))}
        <Direction setRendredDirectionPath={setRendredDirectionPath} />
      </GoogleMap>

      <button
        onClick={() => setPath(samePathButNotSamePoints)}
        style={{ backgroundColor: "darkblue", padding: "1em", color: "white", margin: "1em", border: "none" }}
      >
        same route but not identical
      </button>
      <button
        onClick={() => setPath(fimilarPath)}
        style={{ backgroundColor: "darkblue", padding: "1em", color: "white", margin: "1em", border: "none" }}
      >
        diff route but same start and end points
      </button>
      <button
        onClick={() => setPath(identicalPath)}
        style={{ backgroundColor: "darkblue", padding: "1em", color: "white", margin: "1em", border: "none" }}
      >
        identical route
      </button>
      <button
        onClick={() => setPath(wrongPath)}
        style={{ backgroundColor: "darkblue", padding: "1em", color: "white", margin: "1em", border: "none" }}
      >
        wrong route
      </button>
      <button
        onClick={handleOnClick}
        style={{ backgroundColor: "green", padding: "1em", color: "white", margin: "1em", border: "none" }}
      >
        click to check if similar path in console
      </button>
    </>
  );
}

export default MainMapView;
