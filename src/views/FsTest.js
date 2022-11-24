import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,SafeAreaView , ScrollView , PermissionsAndroid, TouchableHighlight, Alert, DeviceEventEmitter } from 'react-native';
import FS from 'react-native-fs';
import { useSerial } from "../hooks/useSerial";
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
  Alert.alert("Texto", data.data)
    console.log(data)
}

function FsTest({navigation}){
    const [diretorios, setDiretorios] = useState([]);
    const [arquivos, setArquivos] = useState([]);
    const [conteudo, setConteudo] = useState([]);
    
  const {
    devices,
    requestPermission,
    connect,
    write,
    setReadListener
  } = useSerial(onReadData);

    useEffect(() => {       
      requisitarPermissoesDeLeitura();
      requisitarPermissoesDeEscrita();
      //DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData);
      //DeviceEventEmitter.addListener(actions.ON_ERROR, onError);
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
                let deviceEscolhido = devices[0].deviceId;
                requestPermission(deviceEscolhido);
              }}>
                <Text>Permissão</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={async () => {
             /*
                Aqui já vem a parte pra iniciar a conexão na Lib direcionada para a porta serial
                Aqui está funcionando, amém
              */
                let deviceEscolhido = devices[0].deviceId;
                connect(deviceEscolhido, onReadData);
              }}>
                <Text>Conectar</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={async () => {
            /*
                botão para mandar o texto na lib da porta serial, até ai aparentemente tudo certo.
              */
                await write("6F6C61")

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