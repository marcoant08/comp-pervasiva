import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles"

init({
    size: 10000,
    keepAlive: 60,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    // reconnect: true,
    sync: {}
});

const Mqtt = () => {
    const [connected, setConnected] = useState(false)
    const client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, `clientId-${Math.floor(Math.random() * 100)}`);

    client.onConnectionLost = (value) => {
        console.log("lost", value)
        console.log("CONNECTION LOST")
        setConnected(false)
    };

    client.onMessageArrived = (msg) => {
        console.log("MESSAGE ARRIVED:", msg._getPayloadString())
    };

    client.connect({
        onSuccess: (value) => {
            console.log("CONNECTED")
            setConnected(true)
            client.subscribe("trabson")
        },
        onFailure: (error) => {
            console.log("error:", error)
            setConnected(false)
        },
        // mqttVersion: 3,
        // keepAliveInterval: 10,
        // cleanSession: false,
        useSSL: false,
        reconnect: true,
        timeout: 5
    });

    useEffect(() => {
        console.log("connecting...")
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MQTT Connected: {connected ? "true" : "false"}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log(client.isConnected())
                client.send("trabson", "deivid")
            }}>
                <Text style={[styles.text, {
                    fontSize: 16,
                    fontWeight: "bold"
                }]}>Send message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Mqtt;
