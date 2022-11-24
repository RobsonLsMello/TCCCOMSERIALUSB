import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import vars from '../css/vars';

export default function DataCard(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.lblTitulo}>{props.titulo}</Text>
      <Text style={styles.lblValor}>{props.valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    width: vars.width * (176/428),
    marginRight: vars.width * (24/428),
    marginBottom: vars.height * (24/926),
    minHeight: vars.height * (72/926),
    backgroundColor: vars.secondaryColor,
    paddingHorizontal: vars.width * (12/428),
    paddingVertical: vars.height * (8/926),
    elevation: 14,
  },
  lblTitulo:{
    fontSize:vars.fontS
  },
  lblValor:{
    fontSize:vars.fontXXXL,
    color:vars.primaryColor,
    fontWeight:"bold"
  }
});
