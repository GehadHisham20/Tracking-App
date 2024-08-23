import { useEffect, useState } from "react";
import "./App.css";
import { io, Socket } from "socket.io-client";
import TrackingMap from "./components/trackingMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompareMap from "./components/compareMap";

export let socket: Socket;
// // socket connection function
// function socket_connection() {
//   // const socket = io(`https://fcsapi.com/api-v3/forex/latest?id=1&access_key=kpslKrOMxU8gtfEp02kwQeHOv`);
//   // const socket = io(`https://fcsapi.com/api-v3/forex/latest?id=1&access_key=kpslKrOMxU8gtfEp02kwQeHOv`, {
//   //   transports: ["websocket"],
//   // });
//   console.log(12132);
//   // Connection

//   // Verify Your API key on server
//   socket.emit("heartbeat", api_key);

//   // Connect Ids on server
//   socket.emit("real_time_join", currency_ids);

//   socket.on("data_received", function (data) {
//     // always receive latest price here in "data" variable
//     // data contain : Price, ASK price, BID price
//     console.log(data);
//   });
// } // function end

// Calling function
// socket_connection();
// socket.on("connect", () => {
//   const engine = socket.io.engine;
//   console.log(engine.transport.name); // in most cases, prints "polling"

//   engine.once("upgrade", () => {
//     // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
//     console.log(engine.transport.name); // in most cases, prints "websocket"
//   });

//   engine.on("packet", ({ type, data }) => {
//     // called for each packet received
//   });

//   engine.on("packetCreate", ({ type, data }) => {
//     // called for each packet sent
//   });

//   engine.on("drain", () => {
//     // called when the write buffer is drained
//   });

//   engine.on("close", (reason) => {
//     // called when the underlying connection is closed
//   });
// });

function App() {
  // const [count, setCount]= useState(0)
  // const [backendPoint, setBackendPoint] = useState({});

  useEffect(() => {
    socket = io("http://localhost:3000/tracking", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    // socket.on("updateLocation", (arg) => {
    //   console.log(arg); // world
    //   // setBackendPoint(arg);
    // });
    // Connect Ids on server

    // socket.on("data_received", function (data) {
    //   // always receive latest price here in "data" variable
    //   // data contain : Price, ASK price, BID price
    //   console.log(data);
    // });
    // socket.on("hello", (arg) => {
    //   console.log(arg); // world
    // });
    // socket.on("point", function (data) {
    //   // always receive latest price here in "data" variable
    //   // data contain : Price, ASK price, BID price
    //   console.log(data);
    // });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TrackingMap />} />
          <Route path="/test" element={<CompareMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
