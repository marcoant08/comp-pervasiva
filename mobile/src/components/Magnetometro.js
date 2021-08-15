import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Magnetometer } from "expo-sensors";
import styles from "../assets/global/styles";

const Magnetometro = ({ value, setValue }) => {
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(1000);

    setSubscription(
      Magnetometer.addListener((magnetometerData) => {
        setValue({
          x: magnetometerData.x.toFixed(3),
          y: magnetometerData.y.toFixed(3),
          z: magnetometerData.z.toFixed(3),
        });
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magnetômetro</Text>
      <Text style={styles.text}>
        X: {value.x}, Y: {value.y}, Z: {value.z}
      </Text>
    </View>
  );
};

export default Magnetometro;
