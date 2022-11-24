import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch } from 'react-native';
import vars from '../css/vars';

export default function NotificacaoOpcao(props) {
  const [isEnabled, setIsEnabled] = useState(props.estadoInicial);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
      <View style={styles.pnlOpcao}> 
        <Switch
          style={styles.swNotificacao}
          trackColor={{ false: "#767577", true: vars.primaryColor }}
          thumbColor={isEnabled ? "#FFF" : "#C4C4C4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>{props.nomeNotificacao}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  swNotificacao:{
    elevation:2,
    marginRight:vars.width * (20/428),
  },
  pnlOpcao:{
    flexWrap: 'wrap', 
    flexDirection:'row',  
    alignItems:"center"
  }
});
