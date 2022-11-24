import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,SafeAreaView , ScrollView , PermissionsAndroid, TouchableHighlight, Alert, DeviceEventEmitter } from 'react-native';
import FS from 'react-native-fs';
import { RNSerialport, definitions, actions } from "react-native-serialport";
import Connection from './components/connection';

const requisitarPermissoesDeLeitura = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Deep Analytics",
        message:
          "Precisamos do acesso de leitura do USB" +
          " para podermos fazer a conexão do barquinho",
        buttonNeutral: "Pergunte-me mais tarde",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Leitura Liberada");
    } else {
      console.log("Negado");
    }
  } catch (err) {
    console.warn(err);
  }
};
const requisitarPermissoesDeEscrita = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Deep Analytics",
        message:
          "Precisamos do acesso de leitura do USB" +
          " para podermos fazer a conexão do barquinho",
        buttonNeutral: "Pergunte-me mais tarde",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Escrita Liberada");
    } else {
      console.log("Negado");
    }
  } catch (err) {
    console.warn(err);
  }
};

async function scanDir(pathOfDirToScan, data = {directory: [], files: []}) {
  const readedFilesAndDir = await FS.readDir(pathOfDirToScan);

  readedFilesAndDir.map(async eachItem=> {
    if (eachItem.isDirectory()) {
      const directoryPath = pathOfDirToScan + '/' + eachItem.name;
      data.directory.push(directoryPath);
      data = await scanDir(directoryPath, data);
    } else {
      data.files.push(pathOfDirToScan + '/' + eachItem.name+ "\n");

    }    

  });
  console.log(data);
  return data;
}

async function readFile(pathFile, setConteudo) {
  FS.readFile(pathFile).then(content => {
    console.log(content);
    setConteudo(content);
  }).catch(error=>{
    console.log("erro")
    Alert.alert("erro",JSON.stringify(error));
    console.log(error)
  })
}
/*
  Funções ouvintes para identificar texto recebido ou erros
*/
var onError = (error)=> {
  Alert.alert("Erro", JSON.stringify(error));
console.error(error);
}
var onReadData = (data) => {
    console.log(data)
}

function FsTest({navigation}){
    const [diretorios, setDiretorios] = useState([]);
    const [arquivos, setArquivos] = useState([]);
    const [conteudo, setConteudo] = useState([]);
    
    useEffect(() => {       
      requisitarPermissoesDeLeitura();
      requisitarPermissoesDeEscrita();
      RNSerialport.startUsbService() //necessário para poder começar o processo de leitura
      RNSerialport.setReturnedDataType(definitions.RETURNED_DATA_TYPES.INTARRAY); 
      RNSerialport.setAutoConnect(false);
      RNSerialport.setInterface(-1); // não sei do que isso se trata

      DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData);
      DeviceEventEmitter.addListener(actions.ON_ERROR, onError);
    }, []);

    return(
        
        <View style={{}}> 
            <TouchableHighlight onPress={async () => {              
              /*
                Esse botão foi uma tentativa de fazer a leitura do usb via FS
                Mas sempre fala que está faltando permissões de acesso, já apliquei um monte delas no androidmanifest de
              write_storage, read_storage, manage_storage, além das permissões vindas da LIB ali em cima
              */
              let data = await scanDir("/dev/bus")
              let conteudo = await readFile("/dev/bus/usb/001/002", setConteudo)
              setConteudo(() => conteudo);
              setDiretorios(dir => {
                let dirNovo = [];
                data.directory.forEach(directory => {
                  dirNovo.push(directory)
                })
                return dirNovo;
              })
              setArquivos(arq => {
                let arqNovo = [];
                data.files.forEach(file => {
                  arqNovo.push(file)
                })
                return arqNovo;              
              })
            }}>
                <Text>Ler Pastas</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={async () => {
             /*
                Aqui já vem a parte pra iniciar a conexão na Lib direcionada para a porta serial
                Aqui está funcionando, amém
              */
              RNSerialport.getDeviceList().then(async (response) => {

                if(response.length == 0) {
                  Alert.alert("Erro", "Nenhum despositivo connectado")
                  Alert.alert("Erro", "Conexão" + await RNSerialport.isOpen())
                  return;
                }
                else{
                  RNSerialport.isSupported(response[0].name)
                  .then(data => {Alert.alert("Status isSupported ", JSON.stringify(data))})
                  .catch(err => {Alert.alert("Erro isSupported ", JSON.stringify(err))});
                  RNSerialport.isServiceStarted()
                  .then(data => {Alert.alert("Status isServiceStarted", JSON.stringify(data))})
                  .catch(err => {Alert.alert("Erro isServiceStarted ", JSON.stringify(err))});
                  try {
                    Alert.alert("Itens", JSON.stringify(response[0]))//list
                    
  
                    RNSerialport.connectDevice(response[0].name, 9600);
                    RNSerialport.isOpen()
                    .then(data => {Alert.alert("Status isOpen", JSON.stringify(data))})
                    .catch(err => {Alert.alert("Erro isOpen ", JSON.stringify(err))});
                    
                    Alert.alert("status", "Conectado"); 

                  } catch (err) {
                    Alert.alert("erro catch connect", JSON.stringify(err))
                  }
                  
                }
              }).catch(err => {Alert.alert("erro", JSON.stringify(err))});
            }}>
                <Text>Conectar</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={async () => {
            /*
                botão para mandar o texto na lib da porta serial, até ai aparentemente tudo certo.
              */
              RNSerialport.writeString("getPonto 0")
            }}>
            <Text>Mandar Texto</Text>
            </TouchableHighlight>
            <SafeAreaView >
            <ScrollView >
                <Text>Diretorios</Text>
                <Text>{diretorios}</Text>
                <Text>Arquivos</Text>
                <Text>{arquivos}</Text>
                <Text>Conteudo</Text>
                <Text>{conteudo}</Text>
                
            </ScrollView>
          </SafeAreaView>
        </View>
  )
}



export default FsTest