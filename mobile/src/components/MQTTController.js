import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../assets/global/styles";

const Mqtt = ({ connected, active, setActive }) => {
  return (
    <View style={[styles.container, { minHeight: 110 }]}>
      <Text style={[styles.title, { color: connected ? "green" : "red" }]}>
        MQTT Conectado: {connected ? "sim" : "não"}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: active ? "#DC143C" : "#3CB371" },
        ]}
        onPress={() => {
          setActive(!active);
        }}
      >
        <Text style={styles.buttonText}>{active ? "Desativar" : "Ativar"}</Text>
      </TouchableOpacity>
      <Text style={[styles.text, { fontSize: 16 }]}>
        Coletando dados:{" "}
        <Text style={{ fontWeight: "bold" }}>{active ? "sim" : "não"}</Text>
      </Text>
    </View>
  );
};

export default Mqtt;
