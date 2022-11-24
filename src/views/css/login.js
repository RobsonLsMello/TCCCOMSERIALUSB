import { StyleSheet } from 'react-native';
import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    height:vars.height * (805/926),
    backgroundColor: vars.secondaryColor,
    paddingBottom: vars.height * (175/926),
    paddingHorizontal: vars.width * (42/428)
  },
  logo:{
    width: 192,
    height: 192
  },
  lblInfo:{
    color: vars.infoColor,
    fontSize: vars.fontM,
    marginTop:24,
    textAlign:"justify",
    width: vars.width * (344/428),
  },
  txtEntrar:{
    color: "#000000",
    fontWeight: "bold",
    fontSize:vars.fontXL,
    marginTop:30
  },

  txtEmail:{
    width: vars.width * (344/428),
    height: vars.height * (48/926),
    borderBottomColor: vars.primaryColor,
    borderBottomWidth: 2,
    marginTop: vars.width * (52/926),
    fontSize: vars.fontL
  },
  btnEntrar:{
    backgroundColor: vars.primaryColor,
    width: vars.width * (344/428),
    height: vars.height * (55/926),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 68
  },
  txtEntrarBtnEntrar:{
    color:vars.secondaryColor,
    fontSize: vars.fontL,
    fontWeight: "bold",
    
  },
  lblRecuperarConta:{
    fontSize:vars.fontXL, 
    color: vars.primaryColor, 
    fontWeight: "bold", 
    marginLeft: 12
  },
  lblTemConta:{
    fontSize:vars.fontL
  },
  recuperarConta:{
    height:vars.height * (121/926),
    backgroundColor: vars.secondaryColor
  },
  lblErro:{
    backgroundColor: "#dc3545",
    color:"#ffffff",
    padding: 10
  }
})

export default style