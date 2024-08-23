import { Marker, Polyline, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../App";
import MapUtils from "../../utils/mapUtils";
// window.SlidingMarker.initializeGlobally();
const carIcon = {
  url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  scaledSize: new window.google.maps.Size(30, 30),
  //   // anchor: { x: 10, y: 10 },
  anchor: new window.google.maps.Point(15, 15),
  scale: 0.5,
};
// const path = [
//   { lat: 31.2971649, lng: 30.6230562 },
//   { lat: 31.3008986, lng: 30.6265664 },
//   { lat: 31.2988815, lng: 30.6277118 },
//   { lat: 31.3022289, lng: 30.6284877 },
//   { lat: 31.3029156, lng: 30.6296331 },
//   { lat: 31.306263, lng: 30.6285247 },
// ];
// type pointwithDistance = {
//   point: { lat: number; lng: number };
//   distance: null | number;
// };

// let path = [
//   { lat: 30.316398, lng: 30.897941, distance: 0 },
//   { lat: 30.317211, lng: 30.897254, distance: 0 },
//   { lat: 30.316145, lng: 30.893653, distance: 0 },
//   { lat: 30.31678, lng: 30.89323, distance: 0 },
// ];
// const path: pointwithDistance[] = [
//   { point: { lat: 30.316398, lng: 30.897941 }, distance: 0 },
//   { point: { lat: 30.317211, lng: 30.897254 }, distance: 0 },
//   { point: { lat: 30.316145, lng: 30.893653 }, distance: 0 },
//   { point: { lat: 30.31678, lng: 30.89323 }, distance: 0 },
// ];

const options = {
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
type Props = {};

let tat;
function Poly({}: Props) {
  // const [lastBackendPoint, setLastBackendPointPoint] = useState<{ lat: number; lng: number } | null>(null);
  // const [lastPointProgessFinished, setLastPointProgessFinished] = useState(false);
  // const staleBackendPoint = useRef<{ lat: number; lng: number } | null>(null);
  const doneRef = useRef(true);
  // const [carPosition, setCarPosition] = useState({ lat: 31.2971649, lng: 30.6230562 });
  // const [progressedPositions, setprogressedPosition] = useState<google.maps.LatLng[]>([
  //   { lat: 30.316398, lng: 30.897941, distance: 0 },
  //   { lat: 30.317211, lng: 30.897254, distance: 0 },
  // ]);
  // const [path, setPath] = useState([
  //   { lat: 30.316398, lng: 30.897941, distance: 0 },
  //   { lat: 30.317211, lng: 30.897254, distance: 0 },
  //   { lat: 30.316145, lng: 30.893653, distance: 0 },
  //   { lat: 30.31678, lng: 30.89323, distance: 0 },
  // ]);
  const pathRef = useRef([
    // { lat: 30.316398, lng: 30.897941, distance: 0 },
    // { lat: 30.317211, lng: 30.897254, distance: 0 },
    // { lat: 30.316145, lng: 30.893653, distance: 0 },
    // { lat: 30.31678, lng: 30.89323, distance: 0 },
  ]);
  const [progressedPositions, setprogressedPosition] = useState<google.maps.LatLng[]>([]);
  const [triggerMove, setTriggerMove] = useState(false);
  // const progressedPositionswithDistanceseRef = useRef<pointwithDistance[] | null>(null);
  const map = useGoogleMap();
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const polylineInstanceRef = useRef<google.maps.Polyline | null>(null);
  // const currentStartPointRef=useRef(54)
  // const lastTimeCarMovesThenStoped = useRef(0);
  // const lastTimeCarstartToMove = useRef(0);
  // const oldDeltaDistance = useRef(0);
  const lastDistanceTravvledRef = useRef(0);
  const currentToPointRef = useRef(null);
  const currentFromPointRef = useRef(null);
  const counterRef = useRef(0);
  const intervalRef = useRef(null);
  const vRef = useRef(null);
  const headingRef = useRef(null);

  function getDistance(initialDate: number, velocity: number) {
    // seconds between when the component loaded and now
    console.log("velocity", velocity);
    // const minus = (lastTimeCarstartToMove.current - lastTimeCarMovesThenStoped.current) / 1000;
    // console.log("minus", minus);
    const differentInTime = ((new Date() as unknown as number) - initialDate) / 1000; // pass to seconds
    const dis = differentInTime * velocity;
    console.log("lastDistanceTravvledRef.current", lastDistanceTravvledRef.current);
    // const delta = lastDistanceTravvledRef.current ? lastDistanceTravvledRef.current - Math.abs(minus - dis) : 0;
    // const deltadis = minus * velocity;
    // console.log("deltadis", deltadis);
    // const lastdis = deltadis + oldDeltaDistance.current;
    // return dis - lastdis; // d = v*t -- thanks Newton!
    return dis;
  }
  function moveCar() {
    // setCarPosition({ lat: 31.3022289, lng: 30.6284877 });
    let distance = lastDistanceTravvledRef.current + getDistance(tat, vRef.current);
    console.log("distance", distance);

    // const angle = window.google.maps.geometry.spherical.computeHeading(lastLineLatLng, nextLineLatLng);
    const actualAngle = headingRef.current - 90;
    console.log(headingRef.current);

    const marker = document.querySelector<HTMLElement>(`[src="${carIcon.url}"]`);
    // console.log(marker);
    if (marker) marker.style.transform = `rotate(${actualAngle}deg)`;

    if (!distance) {
      return;
    }
    let progress = pathRef.current.filter((coordinates, i, arr) => {
      console.log(arr);
      return coordinates.distance < distance;
    });
    console.log("progress", progress);

    const nextLine = pathRef.current.find((coordinates) => {
      return coordinates.distance > distance;
    });
    const lastLine = progress[progress.length - 1];

    if (!nextLine) {
      setprogressedPosition(progress);
      doneRef.current = true;
      lastDistanceTravvledRef.current = lastLine.distance;
      setTriggerMove(false);
      // const minus = (lastTimeCarstartToMove.current - lastTimeCarMovesThenStoped.current) / 1000;
      // const deltadis = minus * vRef.current;
      // oldDeltaDistance.current = oldDeltaDistance.current + deltadis;
      // currentFromPointRef.current = currentToPointRef.current;
      // lastTimeCarMovesThenStoped.current = new Date();
      clearInterval(intervalRef.current);
      return; // it's the end!
    }

    // if (currentFromPointRef.current?.distance !== lastLine.distance) {
    if (currentFromPointRef.current?.id !== lastLine.id) {
      currentFromPointRef.current = lastLine;
    }
    // if (currentToPointRef.current?.distance !== nextLine?.distance) {
    if (currentToPointRef.current?.id !== nextLine?.id) {
      currentToPointRef.current = nextLine;
      const toPoint = new window.google.maps.LatLng(currentToPointRef.current.lat, currentToPointRef.current.lng);
      const fromPoint = new window.google.maps.LatLng(currentFromPointRef.current.lat, currentFromPointRef.current.lng);
      if (map && toPoint && fromPoint) MapUtils.pointsFitBounds([toPoint, fromPoint], map);
      counterRef.current = counterRef.current + 1;
      vRef.current = currentFromPointRef.current?.velocity;
      headingRef.current = currentFromPointRef.current?.heading;
      lastDistanceTravvledRef.current = lastLine.distance;
      distance = lastLine.distance;
      tat = new Date();
    }

    console.log("lastLine", lastLine);
    console.log("nextLine", nextLine);
    const lastLineLatLng = new window.google.maps.LatLng(lastLine.lat, lastLine.lng);

    const nextLineLatLng = new window.google.maps.LatLng(nextLine.lat, nextLine.lng);

    // distance of this line
    // if (nextLine.distance && lastLine.distance) {
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(lastLineLatLng, nextLineLatLng, percentage);
    console.log("position", position);
    const postionpoint = position.toJSON();

    progress = progress.concat(postionpoint);
    console.log("sssssssss", progress);
    // progressedPositionswithDistanceseRef.current = progress;
    // const progresswithoutdistance = progress.map((el) => {
    //   return { lat: el.lat, lng: el.lng };
    // });
    // console.log("progresswithoutdistance", progresswithoutdistance);
    // setprogressedPosition(progresswithoutdistance);
    setprogressedPosition(progress);
    // }
    // moveCar();
  }
  const onLoad = (polyline: google.maps.Polyline) => {
    console.log("polyline: ", polyline);
    polylineInstanceRef.current = polyline;
    // if (map) MapUtils.polylineFitBounds(polyline, map);
  };

  console.log(pathRef.current);

  // useEffect(() => {
  //   // console.log('welcome from FIRST useFFECT POLYGONS');
  // }, [map]);

  //   calc distance for every point with the starting point
  // useEffect(() => {
  //   const newPath = pathRef.current.map((coordinates, i, array) => {
  //     if (i === 0) {
  //       return { ...coordinates, distance: 0 }; // it begins here!
  //     }
  //     const { lat: lat1, lng: lng1 } = coordinates;
  //     const latLong1 = new window.google.maps.LatLng(lat1, lng1);

  //     const { lat: lat2, lng: lng2 } = array[0];
  //     const latLong2 = new window.google.maps.LatLng(lat2, lng2);

  //     // in meters:
  //     const distance = window.google.maps.geometry.spherical.computeDistanceBetween(latLong1, latLong2);

  //     return { ...coordinates, distance };
  //   });
  //   pathRef.current = newPath;
  //   console.log(newPath);
  // }, []);

  // useEffect(() => {
  //   const triggerInterval = window.setInterval(moveCar, 1000);
  //   return () => {
  //     window.clearInterval(triggerInterval);
  //   };
  // }, []);

  // useEffect(() => {
  //   let lastDistanceTravelled = 0;
  //   if (socket) {
  //     socket.on("updateLocation", (pointData: { lat: number; lng: number }) => {
  //       console.log(pointData); // world
  //       // compute distance

  //       // let pointDatawithDistance;
  //       if (pathRef.current.length === 0) {
  //         pointDatawithDistance = { ...pointData, distance: 0 };
  //         setprogressedPosition([pointDatawithDistance]);
  //         // currentFromPointRef.current = pointDatawithDistance;
  //         vRef.current = pointDatawithDistance.velocity;
  //         headingRef.current = pointDatawithDistance.heading;
  //       } else {
  //         const { lat: lat1, lng: lng1 } = pointData;
  //         const latLong1 = new window.google.maps.LatLng(lat1, lng1);
  //         const { lat: lat2, lng: lng2 } = pathRef.current[pathRef.current.length - 1];
  //         const latLong2 = new window.google.maps.LatLng(lat2, lng2);
  //         const distance = window.google.maps.geometry.spherical.computeDistanceBetween(latLong1, latLong2);
  //         lastDistanceTravelled += distance;
  //         pointDatawithDistance = { ...pointData, distance: lastDistanceTravelled };
  //       }

  //       //we are not moving
  //       if (doneRef.current === true) {
  //         console.log(doneRef.current);
  //         //update path array
  //         pathRef.current = [...pathRef.current, { ...pointDatawithDistance }];
  //         // if (pathRef.current.length > 2) lastTimeCarstartToMove.current = new Date();
  //         // and trigger moving again
  //         if (pathRef.current.length > 1) {
  //           doneRef.current = false;
  //           // lastTimeCarstartToMove.current = new Date();
  //           // if (!tat) {
  //           tat = new Date();
  //           // }
  //           setTriggerMove(true);
  //         }
  //       }
  //       // we are already moving
  //       else {
  //         //update path array
  //         pathRef.current = [...pathRef.current, { ...pointDatawithDistance }];
  //         console.log("test pathRef.current", pathRef.current);

  //         //for first time only purpose
  //         // if (pathRef.current.length > 1) {
  //         //   //  moveCar();
  //         //   if (!tat) {
  //         //     tat = new Date();
  //         //   }
  //         //   setTriggerMove(true);
  //         // }
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    let counter = 0;
    let dataWithId = [];
    if (socket) {
      socket.on("updateLocation", (data: Response) => {
        console.log(data); // world
        dataWithId = data.data.map((point) => {
          return { ...point, id: counter++ };
        });
        console.log(dataWithId);

        if (pathRef.current.length === 0) {
          setprogressedPosition([new window.google.maps.LatLng(dataWithId[0].lat, dataWithId[0].lng)]);
          // currentFromPointRef.current = pointDatawithDistance;
          vRef.current = dataWithId[0].velocity;
          headingRef.current = dataWithId[0].heading;
        }

        pathRef.current = pathRef.current.concat(dataWithId);
        //we are not moving
        if (doneRef.current === true) {
          console.log(doneRef.current);
          if (pathRef.current.length > 1) {
            doneRef.current = false;
            tat = new Date();

            setTriggerMove(true);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (doneRef.current === false) {
      // moveCar();

      if (pathRef.current.length > 1) {
        intervalRef.current = setInterval(moveCar, 200);
        console.log("counterRef", counterRef);
      }
    }
  }, [triggerMove]);

  // useEffect(() => {
  //   if (doneRef.current === false) {
  //     // moveCar();

  //     if (pathRef.current.length > 1) {
  //       moveCar();
  //       console.log("counterRef", counterRef);
  //     }
  //   }
  // }, [progressedPositions, triggerMove]);

  // useEffect(() => {
  //   console.log("backendPoint recived from backend", lastBackendPoint);

  //   // first time only start point
  //   if (lastBackendPoint && !staleBackendPoint.current) {
  //     markerInstanceRef.current?.setPosition(lastBackendPoint);
  //     if (map && markerInstanceRef.current) MapUtils.markersFitBounds([markerInstanceRef.current], map);
  //   }

  //   // second time start point and goto point
  //   if (staleBackendPoint.current && lastBackendPoint) {
  //     moveObject();
  //   }
  //   function moveObject() {
  //     let numDeltas = 500;
  //     let delay = 10; //milliseconds
  //     let i = 0;
  //     let deltaLat: number;
  //     let deltaLng: number;
  //     if (staleBackendPoint.current && lastBackendPoint) {
  //       const gotoPosition = [lastBackendPoint.lat, lastBackendPoint.lng];
  //       let position = [staleBackendPoint.current.lat, staleBackendPoint.current.lng];
  //       i = 0;
  //       deltaLat = (gotoPosition[0] - position[0]) / numDeltas;
  //       deltaLng = (gotoPosition[1] - position[1]) / numDeltas;

  //       //car heading
  //       const point1LatLng = new window.google.maps.LatLng(position[0], position[1]);
  //       const point2LatLng = new window.google.maps.LatLng(gotoPosition[0], gotoPosition[1]);
  //       const angle = window.google.maps.geometry.spherical.computeHeading(point1LatLng, point2LatLng);
  //       const actualAngle = angle - 90;
  //       const marker = document.querySelector<HTMLElement>(`[src="${carIcon.url}"]`);
  //       console.log(marker);
  //       if (marker) marker.style.transform = `rotate(${actualAngle}deg)`;

  //       //move car
  //       function moveMarker() {
  //         position[0] += deltaLat;
  //         position[1] += deltaLng;
  //         var latlng = new google.maps.LatLng(position[0], position[1]);
  //         // markerInstanceRef.current?.setPosition(latlng);
  //         setprogressedPosition((prev) => [...prev, latlng]);
  //         // if (map && markerInstanceRef.current) MapUtils.markersFitBounds([markerInstanceRef.current], map);

  //         if (i >= 1 && map && polylineInstanceRef.current && markerInstanceRef.current) {
  //           if (!MapUtils.check_marker_is_in_or_out(markerInstanceRef.current, map)) {
  //             console.log("go into fitbounds needed");
  //             MapUtils.markersFitBounds([markerInstanceRef.current], map);
  //             // or
  //             // MapUtils.polylineFitBounds(polylineInstanceRef.current, map);
  //           }
  //         }
  //         if (i != numDeltas) {
  //           i++;
  //           setTimeout(moveMarker, delay);
  //         }
  //         // if (i === numDeltas) {
  //         //   setLastPointProgessFinished(true);
  //         // }
  //       }
  //       moveMarker();
  //     }
  //   }
  // }, [lastBackendPoint]);

  function markerOnLoad(markerInstance: google.maps.Marker) {
    markerInstanceRef.current = markerInstance;
  }

  return (
    <>
      {/* <Polyline onLoad={onLoad} path={path} options={options} />;
      <Marker
        onLoad={function onLoad2(marker: SlidingMarker) {
          // console.log(marker);
          // marker.setEasing("easeInOutSine");
          // marker.setDuration(3000);
          // const x = marker.getEasing();
          // console.log(x);
          const result = [31.2988815, 30.6277118];
          let position = [31.3022289, 30.6284877];
          i = 0;
          deltaLat = (result[0] - position[0]) / numDeltas;
          deltaLng = (result[1] - position[1]) / numDeltas;
          function moveMarker() {
            position[0] += deltaLat;
            position[1] += deltaLng;
            var latlng = new google.maps.LatLng(position[0], position[1]);
            marker.setPosition(latlng);
            if (i != numDeltas) {
              i++;
              setTimeout(moveMarker, delay);
            }
          }
          moveMarker();
        }}
        icon={icon1}
        position={carPosition}
        //    duration={10000}
        //    easing={"swing"}
      /> */}
      <Polyline onLoad={onLoad} path={progressedPositions} options={options} />;
      <Marker
        icon={carIcon}
        position={progressedPositions[progressedPositions.length - 1]}
        onLoad={markerOnLoad}
        //    duration={10000}
        //    easing={"swing"}
      />
    </>
  );
}

export default Poly;
