import React, { useState, useEffect } from "react";
import { ScrollView, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, ActivityIndicator } from "react-native";
import vars from '../css/vars';
import controller from '../../controllers/dados'
import TrajetoCard from '../components/trajetoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


var renderizarTrajetosBuscados = async (setTrajetos, setEscolhido, escolhido, setTrajetoSelecionado) =>{  
    let trajetos = await controller.mostrarTrajetos(AsyncStorage);
    let trajetosObject = [];
    trajetos.forEach((trajeto, index) =>{
        trajetosObject.push((<TrajetoCard nome={`Trajeto ${index}`} key={index} vezes={0} trajeto={trajeto} id={trajeto._id} setTrajetoSelecionado={setTrajetoSelecionado} setarEscolhido={setEscolhido} escolhido={escolhido}></TrajetoCard>))
    })
    setTrajetos(trajetosObject);
  }

const App = (props) => {
    const [trajetos, setTrajetos] = useState([(<ActivityIndicator size="large" key={1} color="#654AB4" />)])
    const [trajetosObject, setTrajetosObject] = useState([])

 
    setTimeout(() => {
        renderizarTrajetosBuscados(setTrajetos, props.setEscolhido, props.escolhido, props.setTrajetoSelecionado);
    }, (1000));

    

    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalTrajeto(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.lblFinalizar}>Selecione o Trajeto</Text>
            <View>
                <SafeAreaView style={styles.resultado}>
                    <ScrollView style={styles.resultadoScroll}>
                        {trajetos}
                    </ScrollView>
                    <Pressable
                        style={[styles.btnConfirmar]}
                        onPress={() => {
                            if(props.escolhido != -1){
                                props.pressionado();
                                props.setModalTrajeto(!props.modalVisible); 
                                
                            }
                        }}
                    >
                        <Text style={styles.lblConfirmar}>Confirmar</Text>
                    </Pressable>
                </SafeAreaView>
            </View>
            

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"'rgba(0, 0, 0, 0.5)'"
  },
  modalView: {
    width: vars.width * (400/428),
    height:vars.height * (600/926),
    backgroundColor: "white",
    padding: vars.width * (16/428),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  resultadoScroll:{
    padding: vars.width * (8/428),
    height: vars.height * ((200)/926),
  },
  lblNomeProjeto:{
    marginBottom: 16,
    fontSize:vars.fontM,
    fontWeight:"bold",
  },
  lblFinalizar: {
    marginBottom: 32,
    fontSize:vars.fontL,
    fontWeight:"bold",
    textAlign: "center"
  },
  btnConfirmar:{
    width: vars.width * (400/428),
    height:vars.height * (60/926),
    backgroundColor:vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center",
    marginTop: - vars.height * (16/926)
  },
  lblConfirmar:{
    color:vars.secondaryColor,
    fontSize: vars.fontL,
    fontWeight:"bold",
    
  },  
  lblDisclaimer:{
    marginBottom: 32,
    fontSize:vars.fontS,
    color: vars.disclaimerColor
  },
  txtPesquisar:{
    height: vars.height * (32/926),
    width: vars.width * (240/428),
    padding: vars.height * (6/926),
    marginBottom:vars.height * (23/926),
    elevation:5,
    backgroundColor:"#FFF"
  },
});

export default App;