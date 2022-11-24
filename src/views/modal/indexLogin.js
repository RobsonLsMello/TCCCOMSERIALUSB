import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import vars from '../css/vars';

export default function IndexLogin(props) {
  const nav = props.nav;

  return (

        <Modal
          animationType="slide"
          transparent={true}
          visible={props.visibleModal}
          onRequestClose={() => {
            
             props.setModal(!props.visibleModal);
          }}>
          <Pressable style={styles.backShadow} onPress={() => props.setModal(false)}>
          </Pressable>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{fontWeight:"bold", fontSize:vars.fontXL, marginBottom: 46}}>Crie sua Conta</Text>

                <Text style={{fontSize:vars.fontXL, marginBottom:46, textAlign:"center"}}>Comece a usar os dados do Deep Analytics</Text>
                <Pressable  onPress={() => {nav.navigate("cadastrar");props.setModal(false)}}>
                  <Text style={styles.typeEnter}>Usar Email</Text>
                </Pressable>

                
                <View style={[styles.jaTemConta, {marginTop:0.30*vars.height}]}>
                  <Text style={{fontSize:vars.fontL}}>Já tem conta?</Text>
                  <Pressable  onPress={() => {nav.navigate("login");props.setModal(false)}}>
                    <Text style={{fontSize:vars.fontXL, color: vars.primaryColor, fontWeight: "bold", marginLeft: 12}}>Entrar</Text>
                  </Pressable>
                </View>

              </View>
            </View>
          
          
        </Modal>
      
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: vars.width,
    maxHeight: 0.9 * vars.height,
    paddingHorizontal:0.07 * vars.height,
    paddingTop:60,
    paddingBottom:33
  },
  backShadow:{
    minWidth:vars.width,
    minHeight:0.11 * vars.height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  jaTemConta: {
    flexWrap: 'wrap', 
    alignItems: 'baseline',
    flexDirection:'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  typeEnter:{
    fontSize:vars.fontL,
    fontWeight:"bold",
    marginBottom: 0.052 * vars.height
  }
});
