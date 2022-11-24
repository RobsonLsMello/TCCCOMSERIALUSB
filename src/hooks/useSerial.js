const { useState, useEffect, useCallback, useRef } = require("react");
const { UsbSerialManager, Parity } = require("react-native-usb-serialport-for-android")

exports.useSerial = (
    readCallback = () => { },
    options = {
        baudRate: 9600,
        parity: Parity.None,
        dataBits: 8,
        stopBits: 1
    }) => {
    const [devices, setResult] = useState([]);
    const connectedDevice = useRef(null);
    
    useEffect(() => {
        (async () => {
            console.log('LEGA2')
            try{
                const devicesConnected = await UsbSerialManager.list()
                console.log(devicesConnected)
                setResult(devicesConnected);
            }
            catch(e){
                console.log(e)
            }
            
            

        })()
    }, [])

    const requestPermission = useCallback(
        (deviceId) => UsbSerialManager.tryRequestPermission(deviceId),
        []
    )

    const connect = useCallback(
        async (deviceId, callback) => {
            try{
                const device = await UsbSerialManager.open(
                    deviceId,
                    options
                );
                console.log(UsbSerialManager.hasPermission ? "Tem permissão":"Não Tem permissão")
                connectedDevice.current = device;
                connectedDevice.current.onReceived(callback);
                connectedDevice.current.listeners.push(callback);
                console.log("conectou");
            }
            catch(e){
                console.log(e);
            }
            console.log(connectedDevice)
        },
        [connectedDevice]
    )

    const write = useCallback(async (hexString) => {
        connectedDevice.current.send(hexString).then(data => console.log(data)).catch(err => console.log(err));
    }, [])

    const setReadListener = useCallback(async (callback) =>{

    }, [] )

    return {
        requestPermission,
        connect,
        devices,
        write,
        setReadListener
    }
}