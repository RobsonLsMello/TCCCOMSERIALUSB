import * as React from 'react';
import { useState } from "react";
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import style from './css/primeiroLogin'


var scanAndConnect = () => {
  var ble = new BleManager();
  ble.startDeviceScan(null, null, (error, device) => {
    if (error) {
        // Handle error (scanning will be stopped automatically)
        return
    }

    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    if (device.name === 'TI BLE Sensor Tag' || 
        device.name === 'SensorTag') {
        
        // Stop scanning as it's not necessary if you are scanning for one device.
        ble.stopDeviceScan();

        // Proceed with connection.
    }
});
}


function PrimeiroLogin({navigation}){

  const [isVar, setVar] = useState(false);
  var toNav = () =>{
    navigation.navigate("main")
  }
  

    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <Image
        style={style.logo}
        source={require("../../assets/logobranco.png")}
      />
    </View>
    <View style={[style.main, style.centerAll]}> 
      <View style={style.containerMain}>
        <Text style={style.lblPrimeiroUso}>Primeiro Uso</Text>
        <Text style={style.lblDisclaimerPrimeiroUso}>Se conecte a uma estação marinha móvel:</Text>
        <TouchableHighlight style={style.btnBluetooth}
          onPress={scanAndConnect}>
          <View style={style.btnBluetoothInside}>
            <Image
              style={style.imgBluetooth}
              source={require("../../assets/usb.png")}
            />
            <Text style={style.lblBluetooth}>
              Conectar
            </Text>
            
          </View>
        </TouchableHighlight>
      </View>
    </View>
    <TouchableHighlight style={[style.entrar,style.centerAll]}
      onPress={toNav}>
      <Text style={style.txtEntrar}>Pular Etapa</Text>
    </TouchableHighlight>

  </View>
  )
}



export default PrimeiroLogin