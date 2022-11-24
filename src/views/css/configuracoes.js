import { StyleSheet } from 'react-native';

import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    alignItems: 'center',
  },
  header:{
    width: vars.width,
    height:vars.height * (84/926),
    paddingVertical: vars.height * (5/926),
    paddingHorizontal: vars.width * (24/428),
    backgroundColor: vars.primaryColor,
    justifyContent: 'flex-end',
    alignItems:"center"  
  },
  main:{
    height:vars.height - vars.height * ((60 + 84)/926),
    backgroundColor: vars.secondaryColor,
    paddingTop:vars.height * (20/926),
  },
  containerMain:{
    width: vars.width * (377/428),
    flexGrow: 1,

  },
  lblTitulo:{
    color:vars.secondaryColor,
    fontSize:vars.fontL,
    fontWeight:"bold",
  },
  lblSubTitulo:{
    color:"#535353",
    fontSize:vars.fontL,
    fontWeight:"bold",
    borderBottomWidth:2,
    borderBottomColor:"#535353",
    paddingVertical: vars.height * (10/926),
    marginBottom: vars.height * (16/926)
  },
  pnlDados:{
    flexWrap: 'wrap', 
    flexDirection:'row',   
  },
  lblPropriedade:{
    fontSize:vars.fontL,
    marginBottom:vars.height * (12/926)
  },
  txtPadrao:{
    height: vars.height * (36/926),
    padding: vars.height * (10/926),
    marginBottom:vars.height * (12/926),
    elevation:5,
  },
  txtAcesso:{
    backgroundColor:vars.primaryColor,    
    color: vars.secondaryColor,  
        
  },
  txtDadosPessoais:{
    backgroundColor:vars.secondaryColor,    
    
    
  },
  btnAlterarDados:{
    height: vars.height * (36/926),
    width: vars.width * (156/428),
    justifyContent:"center",
    alignItems:"center"
  },
  lblBtnAlterarDados:{
    color: vars.secondaryColor,
    fontSize:vars.fontM,
  },
  lblErro:{
    backgroundColor: "#dc3545",
    color:"#ffffff",
    padding: 10
  },
  lblInfo:{
    width: vars.width * (344/428),
    color: vars.infoColor,
    fontSize: vars.fontM,
    marginTop:24,
    textAlign:"justify",
  },
})

export default style