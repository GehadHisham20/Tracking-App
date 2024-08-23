import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import axios from "axios";
const origin = { lat: 30.316398, lng: 30.897941 };
const destination = { lat: 30.31678, lng: 30.89323 };
export default function Direction({ setRendredDirectionPath }) {
  const [directions, setDirections] = useState(null);

  // to store instance when direction dervice loads
  // const [directionsServiceInstance, setDirectionsServiceInstance] = useState(null);

  // const setDirectionApi = (result, status: string) => {
  //   // console.log(result, status);
  //   // const results = { routes: result.routes, travelMode: google.maps.TravelMode.DRIVING };
  //   setDirections(result);
  //   console.log(result);
  //   setRendredDirectionPath(result.routes[0].overview_path);
  // };

  const setDirectionApi2 = () => {
    // console.log(result, status);
    // const results = { routes: result.routes, travelMode: google.maps.TravelMode.DRIVING };
    axios
      .post("http://localhost:3000/getRoute", {
        origin: origin,
        destination: destination,
      })
      .then((res) => {
        //reshape data as direction api want
        res.data.routes = res.data.routes.map((response) => {
          const bounds = new google.maps.LatLngBounds(response.bounds.southwest, response.bounds.northeast);

          response.bounds = bounds;

          response.overview_path = google.maps.geometry.encoding.decodePath(response.overview_polyline.points);

          response.legs = response.legs.map((leg) => {
            leg.start_location = new google.maps.LatLng(leg.start_location.lat, leg.start_location.lng);
            leg.end_location = new google.maps.LatLng(leg.end_location.lat, leg.end_location.lng);

            leg.steps = leg.steps.map((step) => {
              step.path = google.maps.geometry.encoding.decodePath(step.polyline.points);
              step.start_location = new google.maps.LatLng(step.start_location.lat, step.start_location.lng);
              step.end_location = new google.maps.LatLng(step.end_location.lat, step.end_location.lng);
              return step;
            });
            return leg;
          });

          return response;
        });
        res.data.request = { travelMode: "DRIVING" };
        //----------------------------//

        setDirections(res.data);
        setRendredDirectionPath(res.data.routes[0].overview_path);
      })
      .catch((e) => console.log(e));
    // setDirections(result);
    // console.log(result.routes, google.maps.TravelMode.DRIVING);

    // setRendredDirectionPath(result.routes[0].overview_path);
  };
  useEffect(() => {
    setDirectionApi2();
  }, []);

  return (
    <>
      {/* this condition to prevent DirectionsService callback stuck in infinite loop */}
      {/* {!directionsServiceInstance && origin && destination && (
        <DirectionsService
          options={{
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            // waypoints: [
            //   { location: { lat: 30.316398, lng: 30.897941 } },

            //   { location: { lat: 30.317211, lng: 30.897254 } },

            //   { location: { lat: 30.316145, lng: 30.893653 } },

            //   { location: { lat: 30.31678, lng: 30.89323 } },
            // ],
          }}
          onLoad={(instance) => setDirectionsServiceInstance(instance)}
          callback={setDirectionApi}
        />
      )} */}

      {directions && <DirectionsRenderer directions={directions} />}
    </>
  );
}
