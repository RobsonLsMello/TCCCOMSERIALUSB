import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import vars from '../css/vars';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.lblFinalizar}>Finalizar Criação</Text>
            <View>
              <Text style={styles.lblNomeProjeto}>Nome do Trajeto</Text>
              <TextInput 
                style={styles.txtPesquisar} 
                placeholder="Localizar ponto da Batimetria"
                value="">
              </TextInput>
              <Text style={styles.lblDisclaimer}>
                Ao clicar em “Confirmar” o nome escolhido será utilizado para identificação, 
                uso e reuso do trajeto em futuras batimetrias. 
              </Text>
            </View>
            
            <Pressable
              style={[styles.btnConfirmar]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.lblConfirmar}>Confirmar</Text>
            </Pressable>
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
    width: vars.width * (272/428),
    minHeight:vars.height * (310/926),
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
    width: vars.width * (240/428),
    height:vars.height * (60/926),
    backgroundColor:vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center",
    marginTop: vars.height * (16/926)
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