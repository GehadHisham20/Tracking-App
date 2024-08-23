import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MainMapView from "./MainMapView";
// import { Spinner } from "reactstrap";

function CompareMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLEMAPS_API_KEY,
    libraries: ["geometry"],
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return <>{isLoaded ? <MainMapView /> : "loading ...."}</>;
}

export default CompareMap;
