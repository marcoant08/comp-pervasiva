import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";
import styles from "../assets/global/styles";

const Giroscopio = ({ value, setValue }) => {
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Gyroscope.setUpdateInterval(1000);

    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setValue({
          x: gyroscopeData.x.toFixed(3),
          y: gyroscopeData.y.toFixed(3),
          z: gyroscopeData.z.toFixed(3)
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
      <Text style={styles.title}>Giroscópio</Text>
      <Text style={styles.text}>
        X: {value.x}, Y: {value.y}, Z: {value.z}
      </Text>
    </View>
  );
};

export default Giroscopio;
