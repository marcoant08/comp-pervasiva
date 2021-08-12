import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Giroscopio from "./Giroscopio"
import Acelerometro from "./Acelerometro"
import Mqtt from "./Mqtt"

const App = () => {
  // const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  // const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });

  return (
    <View style={styles.container}>
      {/* <Giroscopio setValue={setGyroscope} value={gyroscope} />
        <Acelerometro setValue={setAccelerometer} value={accelerometer} /> */}
      <Mqtt />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
