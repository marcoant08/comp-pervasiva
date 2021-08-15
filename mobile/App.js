import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Giroscopio from "./src/components/Giroscopio";
import Acelerometro from "./src/components/Acelerometro";
import MQTTController from "./src/components/MQTTController";
import Barometro from "./src/components/Barometro";
import Magnetometro from "./src/components/Magnetometro";
import Localizacao from "./src/components/Localizacao";
import styles from "./src/assets/global/styles";

init({
  size: 10000,
  keepAlive: 60,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const client = new Paho.MQTT.Client(
  "broker.mqttdashboard.com",
  8000,
  `clientId-${Math.floor(Math.random() * 100)}`
);

const App = () => {
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometer, setMagnetometer] = useState({ x: 0, y: 0, z: 0 });
  const [barometer, setBarometer] = useState({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [intervalId, setIntervalId] = useState(null);
  const [location, setLocation] = useState(null);
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(false);
  const dataRef = useRef(
    JSON.stringify({ gyroscope, accelerometer, magnetometer, barometer })
  );

  useEffect(() => {
    console.log("CONNECTING...");

    client.onConnectionLost = (value) => {
      console.log("CONNECTION LOST:", value);
      setConnected(false);
    };

    client.onMessageArrived = (msg) => {
      console.log("MESSAGE ARRIVED:", msg._getPayloadString());
    };

    client.connect({
      onSuccess: () => {
        console.log("CONNECTED!");
        setConnected(true);
        client.subscribe("sensors");
      },
      onFailure: (error) => {
        console.log("error:", error);
        setConnected(false);
      },
      useSSL: false,
      reconnect: true,
      timeout: 5,
    });

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    if (active) initSender();

    return () => {
      clearInterval(intervalId);
    };
  }, [active]);

  useEffect(() => {
    dataRef.current = JSON.stringify({
      gyroscope,
      accelerometer,
      magnetometer,
      barometer,
      location
    });
  }, [gyroscope, accelerometer, magnetometer, barometer, location]);

  const initSender = () => {
    setIntervalId(
      setInterval(
        (con, act) => {
          if (con && act) {
            client.send("sensors", dataRef.current);
            console.log("sending in 'sensors':", dataRef.current);
          } else
            console.log(
              "collecting but disconnected 'sensors':",
              dataRef.current
            );
        },
        1000,
        connected,
        active,
        gyroscope,
        accelerometer
      )
    );
  };

  return (
    <View style={styles.page}>
      <Magnetometro setValue={setMagnetometer} value={magnetometer} />
      <Giroscopio setValue={setGyroscope} value={gyroscope} />
      <Acelerometro setValue={setAccelerometer} value={accelerometer} />
      <Barometro setValue={setBarometer} value={barometer} />
      <Localizacao setValue={setLocation} value={location} />
      <MQTTController
        connected={connected}
        active={active}
        setActive={setActive}
      />
    </View>
  );
};

export default App;
