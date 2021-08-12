import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import Giroscopio from "./Giroscopio";
import Acelerometro from "./Acelerometro";
import MQTTController from "./MQTTController";

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
  const [intervalId, setIntervalId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(false);
  const dataRef = useRef(JSON.stringify({ gyroscope, accelerometer }));

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
        client.subscribe("trabson");
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

    return () => { clearInterval(intervalId) }
  }, [active]);

  useEffect(() => {
    dataRef.current = JSON.stringify({ gyroscope, accelerometer })
  }, [gyroscope, accelerometer]);

  const initSender = () => {
    setIntervalId(setInterval((con, act) => {
      if (con && act) {
        client.send("trabson", dataRef.current);
        console.log("sending in 'trabson':", dataRef.current);
      } else console.log("collecting but disconnected 'trabson':", dataRef.current)
    }, 1000, connected, active, gyroscope, accelerometer))
  };

  return (
    <View style={styles.page}>
      <Giroscopio setValue={setGyroscope} value={gyroscope} />
      <Acelerometro setValue={setAccelerometer} value={accelerometer} />
      <MQTTController connected={connected} active={active} setActive={setActive} />
    </View>
  );
};

export default App;
