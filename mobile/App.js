import React, { useEffect, useState } from "react";
import { View } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import Giroscopio from "./Giroscopio";
import Acelerometro from "./Acelerometro";
import Mqtt from "./Mqtt";

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

let count = 0;
const App = () => {
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log("connecting...");

    client.onConnectionLost = (value) => {
      console.log("lost", value);
      console.log("CONNECTION LOST");
      setConnected(false);
    };

    client.onMessageArrived = (msg) => {
      count++;
      console.log(count);
      // console.log("MESSAGE ARRIVED:", msg._getPayloadString());
    };

    client.connect({
      onSuccess: (value) => {
        console.log("CONNECTED");
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

    sender();

    return () => {
      client.disconnect();
    };
  }, []);

  const seconds = (s) => s * 1000;

  const sender = () => {
    setInterval(() => {
      if (connected && active) {
        console.log("sending...");

        const payload = JSON.stringify({
          gyroscope,
          accelerometer,
        });

        client.send("trabson", payload);
      }
    }, seconds(1));
  };

  return (
    <View style={styles.page}>
      <Giroscopio setValue={setGyroscope} value={gyroscope} />
      <Acelerometro setValue={setAccelerometer} value={accelerometer} />
      <Mqtt connected={connected} active={active} setActive={setActive} />
    </View>
  );
};

export default App;
