import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, StyleSheet, PermissionsAndroid, TouchableHighlight } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();
var deviceEncontrado;
const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const requestScanPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanAndConnect = async () => {
    console.log("Clicado");
    manager.startDeviceScan(null, null, (error, device) => {
        
        if (error) {
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log(device.name);
        console.log(device.name == "DESKTOP-AKPP2EUH");
        if(device.name == "DESKTOP-AKPP2EUH") {
            console.log("Legal")
            
            // Stop scanning as it's not necessary if you are scanning for one device.
            manager.stopDeviceScan();

            // Proceed with connection.
            device.connect()
            .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
                deviceEncontrado = device;
                
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });
}
function BluTest({navigation}){
    

    useEffect(() => {
      requestCameraPermission()
      requestScanPermission();
    }, []);
    return(
        <View style={{}}> 
            <Text>Bluetooth Teste</Text>
            <TouchableHighlight onPressOut={scanAndConnect}>
                <Text>Clique Aqui</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressOut={()=>{manager.isDeviceConnected()}}>
                <Text>Clique Aqui</Text>
            </TouchableHighlight>
        </View>
  )
}



export default BluTest