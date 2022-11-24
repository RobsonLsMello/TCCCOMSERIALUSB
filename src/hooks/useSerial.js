const { useState, useEffect, useCallback, useRef } = require("react");
const { UsbSerialManager, Parity } = require("react-native-usb-serialport-for-android")

exports.useSerial = (
    readCallback,
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
            const devicesConnected = await UsbSerialManager.list()
            console.log(devicesConnected)
            setResult(devicesConnected);
        })
    }, [])

    const requestPermission = useCallback(
        (deviceId) => UsbSerialManager.tryRequestPermission(deviceId),
        []
    )

    const connect = useCallback(
        async (deviceId) => {
            const device = await UsbSerialManager.open(
                deviceId,
                options
            );
            connectedDevice.current = device
        },
        [connectedDevice]
    )

    const write = useCallback(async (hexString) => {
        if (!connectedDevice?.current?.deviceId) throw new Error("no connected device")
        return connectedDevice.current.send(hexString)
    }, [])

    useEffect(() => {
        const listener = connectedDevice?.current?.onReceived?.(readCallback)

        return () => {
            listener?.remove?.()
        }
    }, [connectedDevice]);

    return {
        requestPermission,
        connect,
        devices,
        write
    }
}