import { StyleSheet } from 'react-native';
import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    height:vars.height,
    backgroundColor: vars.secondaryColor,
    paddingHorizontal: vars.width * (42/428)
  },
  lblInfo:{
    width: vars.width * (344/428),
    color: vars.infoColor,
    fontSize: vars.fontM,
    marginTop:24,
    textAlign:"justify",
  },
  txtEntrar:{
    color: "#000000",
    fontWeight: "bold",
    fontSize:vars.fontL,
    marginTop:30
  },

  txtPadrao:{
    width: vars.width * (344/428),
    height: vars.height * (48/926),
    borderBottomColor: vars.primaryColor,
    borderBottomWidth: 2,
    marginTop: vars.width * (54/926),
    fontSize: vars.fontL
  },
  txtSms:{
    width: vars.width * (344/428),
    height: vars.height * (66/926),
    borderColor: vars.primaryColor,
    borderWidth: 2,
    textAlign:"center",
    marginTop: vars.width * (54/926),
    fontSize: vars.height * (40/926),
    letterSpacing:20,
  },
  btnCadastrar:{
    backgroundColor: vars.primaryColor,
    width: vars.width * (344/428),
    height: vars.height * (55/926),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  txtEntrarBtnCadastrar:{
    color:vars.secondaryColor,
    fontSize: vars.fontL,
    fontWeight: "bold",
  },
  btnReenviar:{
    paddingTop:18,
    width: vars.width * (344/428)
  },
  txtReenviar:{
    color: vars.primaryColor,
    fontSize: vars.fontM,
    fontWeight:"bold",
  },
  lblMudarContato:{
    color: vars.primaryColor,
    fontSize: vars.fontM,
  },
  lblErro:{
    backgroundColor: "#dc3545",
    color:"#ffffff",
    padding: 10
  }
})

export default style