import { StyleSheet } from 'react-native';
import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    width: vars.width,
    height:vars.height * (64/926),
    padding: vars.height * (28/926),
    backgroundColor: vars.primaryColor,
  },
  main:{
    height:vars.height - vars.height * (128/926),
    backgroundColor: vars.primaryColor,
  },
  containerMain:{
    width: vars.width * (365/428),
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo:{
    width: vars.height * (40/926),
    height: vars.height * (40/926),
  },
  imgBluetooth:{
    width: vars.height * (39/926),
    height: vars.height * (39/926),
  },
  entrar:{
    backgroundColor:vars.primaryColor,
    width:vars.width,
    height: vars.height * (64/926)
  },
  txtEntrar:{
    color: vars.secondaryColor,
    fontWeight: "bold",
    fontSize:vars.fontXL
  },
  btnBluetooth:{
    marginTop:vars.height * (40/926),
    width: vars.width * (365/428),
    height: vars.height * (55/926),
    backgroundColor:"#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBluetoothInside:{
    flexWrap: 'wrap', 
    flexDirection:'row',
    alignItems:"center",
    alignSelf: 'center',
    justifyContent: 'center',
  },
  lblBluetooth:{
    fontSize: vars.fontXL,
    fontWeight: "bold",
    width: vars.width * (234/428),
    textAlign: 'center',
  },
  lblPrimeiroUso:{
    color:"#FFF",
    fontWeight:"bold",
    fontSize:vars.fontXL
  },
  lblDisclaimerPrimeiroUso:{
    marginTop:vars.height * (40/926),
    color:"#FFF",
    fontSize:vars.fontXL
  }
})

export default style