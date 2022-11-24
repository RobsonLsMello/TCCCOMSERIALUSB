import { StyleSheet } from 'react-native';
import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    height:vars.height - 64,
    backgroundColor: vars.primaryColor,
    paddingBottom:300
  },
  logo:{
    width: 192,
    height: 192
  },
  logoMarca:{
    fontSize:24,
    color:"#FFFFFF"
  },
  entrar:{
    backgroundColor:"#FFFFFF",
    width:vars.width,
    height:64
  },
  txtEntrar:{
    color: vars.primaryColor,
    fontWeight: "bold",
    fontSize:vars.fontXL
  }
})

export default style