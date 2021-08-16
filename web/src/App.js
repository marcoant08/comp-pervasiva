import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-charts";
import Loader from "./components/Loader";
import WrappedMap from "./Map";
import "./App.css";
var mqtt = require("mqtt");
var client;

function App() {
  const [location, setLocation] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pressure, setPressure] = useState(0);

  const [dataGyroscope, setDataGyroscope] = useState([
    { label: "X", data: [[0, 0]] },
    { label: "Y", data: [[0, 0]] },
    { label: "Z", data: [[0, 0]] },
  ]);

  const [dataAccelerometer, setDataAccelerometer] = useState([
    { label: "X", data: [[0, 0]] },
    { label: "Y", data: [[0, 0]] },
    { label: "Z", data: [[0, 0]] },
  ]);

  const [dataMagnetometer, setDataMagnetometer] = useState([
    { label: "X", data: [[0, 0]] },
    { label: "Y", data: [[0, 0]] },
    { label: "Z", data: [[0, 0]] },
  ]);

  const [dataRelativeAltitude, setDataRelativeAltitude] = useState([
    { label: "RelativeAltitude", data: [[0, 0]] },
  ]);

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  useEffect(() => {
    client = mqtt.connect(
      "ws://broker.mqttdashboard.com:8000/mqtt",
      "clientId-" + Math.random()
    );

    client.on("connect", (value) => {
      console.log("connected", value);

      client.subscribe("sensors", (err) => {
        if (!err) {
          console.log("dashboard web is receiving...");
        }
      });

      setConnected(true);
    });

    client.on("message", (topic, message) => {
      console.log(`topic: ${topic}\n`, `message: ${message.toString()}`);
      organizeData(message.toString());
    });

    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    let svg = document.getElementsByTagName("svg");
    svg = [...svg].map((item) => (item.style.overflow = "visible"));
  }, []);

  const organizeData = (data) => {
    try {
      const parsedData = JSON.parse(data);

      setDataGyroscope((current) => [
        {
          label: "X",
          data:
            current[0].data.length < 10
              ? [
                  ...current[0].data,
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.gyroscope.x,
                  ],
                ]
              : [
                  ...current[0].data.slice(1),
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.gyroscope.x,
                  ],
                ],
        },
        {
          label: "Y",
          data:
            current[1].data.length < 10
              ? [
                  ...current[1].data,
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.gyroscope.y,
                  ],
                ]
              : [
                  ...current[1].data.slice(1),
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.gyroscope.y,
                  ],
                ],
        },
        {
          label: "Z",
          data:
            current[2].data.length < 10
              ? [
                  ...current[2].data,
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.gyroscope.z,
                  ],
                ]
              : [
                  ...current[2].data.slice(1),
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.gyroscope.z,
                  ],
                ],
        },
      ]);

      setDataAccelerometer((current) => [
        {
          label: "X",
          data:
            current[0].data.length < 10
              ? [
                  ...current[0].data,
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.accelerometer.x,
                  ],
                ]
              : [
                  ...current[0].data.slice(1),
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.accelerometer.x,
                  ],
                ],
        },
        {
          label: "Y",
          data:
            current[1].data.length < 10
              ? [
                  ...current[1].data,
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.accelerometer.y,
                  ],
                ]
              : [
                  ...current[1].data.slice(1),
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.accelerometer.y,
                  ],
                ],
        },
        {
          label: "Z",
          data:
            current[2].data.length < 10
              ? [
                  ...current[2].data,
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.accelerometer.z,
                  ],
                ]
              : [
                  ...current[2].data.slice(1),
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.accelerometer.z,
                  ],
                ],
        },
      ]);

      setDataMagnetometer((current) => [
        {
          label: "X",
          data:
            current[0].data.length < 10
              ? [
                  ...current[0].data,
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.magnetometer.x,
                  ],
                ]
              : [
                  ...current[0].data.slice(1),
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.magnetometer.x,
                  ],
                ],
        },
        {
          label: "Y",
          data:
            current[1].data.length < 10
              ? [
                  ...current[1].data,
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.magnetometer.y,
                  ],
                ]
              : [
                  ...current[1].data.slice(1),
                  [
                    current[1].data[current[1].data.length - 1][0] + 1,
                    parsedData.magnetometer.y,
                  ],
                ],
        },
        {
          label: "Z",
          data:
            current[2].data.length < 10
              ? [
                  ...current[2].data,
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.magnetometer.z,
                  ],
                ]
              : [
                  ...current[2].data.slice(1),
                  [
                    current[2].data[current[2].data.length - 1][0] + 1,
                    parsedData.magnetometer.z,
                  ],
                ],
        },
      ]);

      setDataRelativeAltitude((current) => [
        {
          label: "RelativeAltitude",
          data:
            current[0].data.length < 10
              ? [
                  ...current[0].data,
                  [
                    current[0].data.length,
                    parsedData.barometer.relativeAltitude,
                  ],
                ]
              : [
                  ...current[0].data.slice(1),
                  [
                    current[0].data[current[0].data.length - 1][0] + 1,
                    parsedData.barometer.relativeAltitude,
                  ],
                ],
        },
      ]);

      setPressure(parsedData.barometer.pressure);
      setLocation(parsedData.location);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: connected ? "green" : "#DC143C" }}>
        MQTT Dashboard: {!connected ? "des" : ""}conectado
      </h1>

      <div className="charts-container">
        <div className="chart">
          <h2>Giroscópio</h2>
          <div style={{ width: 300, height: 200 }}>
            <Chart data={dataGyroscope} axes={axes} />
          </div>
        </div>

        <div className="chart">
          <h2>Acelerômetro</h2>
          <div style={{ width: 300, height: 200 }}>
            <Chart data={dataAccelerometer} axes={axes} />
          </div>
        </div>

        <div className="chart">
          <h2>Magnetômetro</h2>
          <div style={{ width: 300, height: 200 }}>
            <Chart data={dataMagnetometer} axes={axes} />
          </div>
        </div>

        <div className="chart">
          <h2>Barômetro</h2>
          <p>Pressão atmosférica: {pressure * 100} Pa</p>
          <div style={{ width: 300, height: 200 }}>
            <Chart data={dataRelativeAltitude} axes={axes} />
          </div>
        </div>
      </div>

      <div className="map-container" style={{ height: "50vh", width: "100vw" }}>
        {location ? (
          <WrappedMap
            lat={location.coords.latitude}
            lng={location.coords.longitude}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        ) : (
          <>
            <h1>Aguardando localização...</h1>
            <br />
            <Loader />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
