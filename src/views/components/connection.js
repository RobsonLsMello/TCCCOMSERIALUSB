/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 *

 import React, { Component } from "react";
 import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   TouchableHighlight,
   ScrollView,
   Alert,
   DeviceEventEmitter,
   NativeEventEmitter
 } from "react-native";
 import { RNSerialport, definitions, actions } from "react-native-serialport";
 //type Props = {};
 class ManualConnection extends Component {
   constructor(props) {
     super(props);
 
     this.state = {
       servisStarted: false,
       connected: false,
       usbAttached: false,
       output: "",
       outputArray: [],
       baudRate: "9600",
       interface: "-1",
       selectedDevice: null,
       deviceList: [{ name: "Device Not Found", placeholder: true }],
       sendText: "obterPonto 0",
       returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
     };
 
     this.startUsbListener = this.startUsbListener.bind(this);
     this.stopUsbListener = this.stopUsbListener.bind(this);
   }
 
   componentDidMount() {
     this.startUsbListener();
   }
 
   componentWillUnmount() {
     this.stopUsbListener();
   }
 
   startUsbListener() {
     DeviceEventEmitter.addListener(
       actions.ON_SERVICE_STARTED,
       this.onServiceStarted,
       this
     );
     DeviceEventEmitter.addListener(
       actions.ON_SERVICE_STOPPED,
       this.onServiceStopped,
       this
     );
     DeviceEventEmitter.addListener(
       actions.ON_DEVICE_ATTACHED,
       this.onDeviceAttached,
       this
     );
     DeviceEventEmitter.addListener(
       actions.ON_DEVICE_DETACHED,
       this.onDeviceDetached,
       this
     );
     DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
     DeviceEventEmitter.addListener(
       actions.ON_CONNECTED,
       this.onConnected,
       this
     );
     DeviceEventEmitter.addListener(
       actions.ON_DISCONNECTED,
       this.onDisconnected,
       this
     );
     DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
     RNSerialport.setReturnedDataType(this.state.returnedDataType);
     RNSerialport.setAutoConnect(false);
     RNSerialport.startUsbService();
   };
 
   stopUsbListener = async () => {
     DeviceEventEmitter.removeAllListeners();
     const isOpen = await RNSerialport.isOpen();
     if (isOpen) {
       Alert.alert("isOpen", isOpen);
       RNSerialport.disconnect();
     }
     RNSerialport.stopUsbService();
   };
 
   onServiceStarted(response) {
     this.setState({ servisStarted: true });
     if (response.deviceAttached) {
       this.onDeviceAttached();
     }
   }
   onServiceStopped() {
     this.setState({ servisStarted: false });
     Alert.alert("service stopped");
   }
   onDeviceAttached() {
     this.setState({ usbAttached: true });
     this.fillDeviceList();
   }
   onDeviceDetached() {
     this.setState({ usbAttached: false });
     this.setState({ selectedDevice: null });
     this.setState({
       deviceList: [{ name: "Device Not Found", placeholder: true }]
     });
   }
   onConnected() {
     this.setState({ connected: true });
   }
   onDisconnected() {
     this.setState({ connected: false });
   }
   onReadData(data) {
     if (
       this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
     ) {
       const payload = RNSerialport.intArrayToUtf16(data.payload);
       this.setState({ output: this.state.output + payload });
     } else if (
       this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
     ) {
       const payload = RNSerialport.hexToUtf16(data.payload);
       this.setState({ output: this.state.output + payload });
     }
   }
 
   onError(error) {
        Alert.alert("Erro", JSON.stringify(error));
     console.error(error);
   }
 
   handleConvertButton() {
     let data = "";
     if (
       this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
     ) {
       data = RNSerialport.hexToUtf16(this.state.output);
     } else if (
       this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
     ) {
       data = RNSerialport.intArrayToUtf16(this.state.outputArray);
     } else {
       return;
     }
     this.setState({ output: data });
   }
   fillDeviceList() {
    RNSerialport.getDeviceList()
    .then(response => {
      console.log("Dispositivos Encontrados")
      console.log(response);
      if (response.length > 0) {
        this.setState({ deviceList: response });
      } else {
        
        Alert.alert(
          "Error from getDeviceList()",
          response.errorCode + " " + response.errorMessage
        );
      }
    })
    .catch(err => {
      console.log("Dispositivos Encontrados - Se Erro")
      console.log(err);
    })
   }
   devicePickerItems() {
     return this.state.deviceList.map((device, index) =>
       !device.placeholder ? (
         <TouchableHighlight key={index} onPress={()=>this.setState({ selectedDevice: device })}>
            <Text>{device.name}</Text>
         </TouchableHighlight>  
       ) : (
        <TouchableHighlight key={index} onPress={()=>this.setState({ selectedDevice: null })}>
            <Text>{device.name}</Text>
        </TouchableHighlight>  
       )
     );
   }
 
   handleSendButton() {
     RNSerialport.writeString(this.state.sendText);
   }
   handleClearButton() {
     this.setState({ output: "" });
     this.setState({ outputArray: [] });
   }
 
   checkSupport() {
     if (
       this.state.selectedDevice.name === undefined ||
       this.state.selectedDevice === null
     )
       return;
     RNSerialport.isSupported(this.state.selectedDevice.name)
       .then(status => {
        console.log("Suport")
        console.log(status ? "Supported" : "Not Supported");
      })
      .catch(err => {
        console.log("Suport erro")
        console.log(err);
      });
   }
 
   handleConnectButton = async () => {
     const isOpen = await RNSerialport.isOpen();
     if (isOpen) {
       RNSerialport.disconnect();
     } else {
       if (!this.state.selectedDevice) {
         alert("Please choose device");
         return;
       }
       console.log("Dispositivo")
       console.log(this.state.selectedDevice);
       console.log("BaudRate")
       console.log(parseInt(this.state.baudRate, 10));
       //Alert.alert("item", JSON.stringify(this.state.selectedDevice))
       RNSerialport.setInterface(parseInt(this.state.interface, 10));
       RNSerialport.connectDevice(
         this.state.selectedDevice.name,
         parseInt(this.state.baudRate, 10)
       );
       RNSerialport.isOpen()
       .then(data => {
          console.log("isOpen")
          console.log(data);
        })
       .catch(err => {
        console.log("isOpen erro")
        console.log(err);
      });
     }
   };
 
   buttonStyle = status => {
     return status
       ? styles.button
       : Object.assign({}, styles.button, { backgroundColor: "#C0C0C0" });
   };
 
   render() {
     return (
       <ScrollView style={styles.body}>
         <View style={styles.container}>
           <View style={styles.header}>
             <View style={styles.line}>
               <Text style={styles.title}>Service:</Text>
               <Text style={styles.value}>
                 {this.state.servisStarted ? "Started" : "Not Started"}
               </Text>
             </View>
             <View style={styles.line}>
               <Text style={styles.title}>Usb:</Text>
               <Text style={styles.value}>
                 {this.state.usbAttached ? "Attached" : "Not Attached"}
               </Text>
             </View>
             <View style={styles.line}>
               <Text style={styles.title}>Connection:</Text>
               <Text style={styles.value}>
                 {this.state.connected ? "Connected" : "Not Connected"}
               </Text>
             </View>
           </View>
           <ScrollView style={styles.output} nestedScrollEnabled={true}>
             <Text style={styles.full}>
               {this.state.output === "" ? "No Content" : this.state.output}
             </Text>
           </ScrollView>
 
           <View style={styles.inputContainer}>
             <Text>Send</Text>
             <TextInput
               style={styles.textInput}
               onChangeText={text => this.setState({ sendText: text })}
               value={this.state.sendText}
               placeholder={"Send Text"}
             />
           </View>
           <View style={styles.line2}>
             <TouchableOpacity
               style={this.buttonStyle(this.state.connected)}
               onPress={() => this.handleSendButton()}
               disabled={!this.state.connected}
             >
               <Text style={styles.buttonText}>Send</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleClearButton()}
             >
               <Text style={styles.buttonText}>Clear</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button}
               onPress={() => this.handleConvertButton()}
             >
               <Text style={styles.buttonText}>Convert</Text>
             </TouchableOpacity>
           </View>
 
           <View style={styles.line2}>
             <View style={styles.inputContainer}>
               <Text>Baud Rate</Text>
               <TextInput
                 style={styles.textInput}
                 onChangeText={text => this.setState({ baudRate: text })}
                 value={this.state.baudRate}
                 placeholder={"Baud Rate"}
               />
             </View>
             <View style={styles.inputContainer}>
               <Text>Interface</Text>
               <TextInput
                 style={styles.textInput}
                 onChangeText={text => this.setState({ interface: text })}
                 value={this.state.interface}
                 placeholder={"Interface"}
               />
             </View>
           </View>
           <View style={styles.inputContainer}>
             <Text>Device List</Text>
             <View
               enabled={
                 this.state.deviceList.length > 0 &&
                 !this.state.deviceList[0].placeholder
               }
             >
               {this.devicePickerItems()}
             </View>
           </View>
           <TouchableOpacity
             style={this.buttonStyle(this.state.selectedDevice)}
             disabled={!this.state.selectedDevice}
             onPress={async () => {
                this.handleConnectButton()
                .then(data => {
                  console.log("Ao Pressionar botão de conectar")
                  console.log(data);
                })
                .catch(err => {
                  console.log("Ao Pressionar botão de conectar - Se Erro")
                  console.log(err);
                })
            }}
           >
             <Text style={styles.buttonText}>
               {this.state.connected ? "Disconnect" : "Connect"}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={this.buttonStyle(this.state.selectedDevice)}
             disabled={!this.state.selectedDevice}
             onPress={() => {
               this.checkSupport();
             }}
           >
             <Text style={styles.buttonText}>Check Support</Text>
           </TouchableOpacity>
         </View>
       </ScrollView>
     );
   }
 }
 
 const styles = StyleSheet.create({
   full: {
     flex: 1
   },
   body: {
     flex: 1
   },
   container: {
     flex: 1,
     marginTop: 20,
     marginLeft: 16,
     marginRight: 16
   },
   header: {
     display: "flex",
     justifyContent: "center"
     //alignItems: "center"
   },
   line: {
     display: "flex",
     flexDirection: "row"
   },
   line2: {
     display: "flex",
     flexDirection: "row",
     justifyContent: "space-between"
   },
   title: {
     width: 100
   },
   value: {
     marginLeft: 20
   },
   output: {
     marginTop: 10,
     height: 300,
     padding: 10,
     backgroundColor: "#FFFFFF",
     borderWidth: 1
   },
   inputContainer: {
     marginTop: 10,
     borderBottomWidth: 2
   },
   textInput: {
     paddingLeft: 10,
     paddingRight: 10,
     height: 40
   },
   button: {
     marginTop: 16,
     marginBottom: 16,
     paddingLeft: 15,
     paddingRight: 15,
     height: 40,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#147efb",
     borderRadius: 3
   },
   buttonText: {
     color: "#FFFFFF"
   }
 });
 
 export default ManualConnection;*/