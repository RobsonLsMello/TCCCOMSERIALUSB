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
    height:vars.height * (124/926),
    paddingBottom: vars.height * (14/926),
    paddingTop: vars.height * (62/926),
    paddingHorizontal: vars.width * (24/428),
    backgroundColor: vars.secondaryColor,
    flexWrap: 'wrap', 
    flexDirection:'row',   
  },
  main:{
    height:vars.height - vars.height * ((60 + 124)/926),
    backgroundColor: vars.secondaryColor,
    paddingTop:30
  },
  containerMain:{
    width: vars.width * (377/428),
    flexGrow: 1,
    justifyContent: 'center',
  },
  lblBtnMenuSuperior:{
    fontSize:vars.fontL,
    fontWeight:"bold",
    color:"#929292",
    borderBottomColor:"#929292",
    height:vars.height * (34/926),
    paddingBottom: vars.height * (8/926),
    borderBottomWidth:2,
  },
  btnMenuSuperior:{
    marginRight: vars.width * (23/428),
  },
  dtpRegistro:{
    height:vars.height * (40/926),
    textAlign:"left",
    alignItems:"flex-start",
    paddingHorizontal:vars.width * (14/428),
    justifyContent:"center",
    fontSize:5,
    borderColor:vars.primaryColor,
    borderWidth:0,
    borderBottomWidth:2,
  },
  dtpRegistroOutside:{
    width: vars.width * (328/428),
    
  },
  imgCalendario:{
    width:vars.width * (42/428),
    height:vars.height * (42/926),
  },
  pnlDatapicker:{
    flexWrap: 'wrap', 
    flexDirection:'row',  
    justifyContent:"space-between",
  },
  txtLocalizacao:{
    width: vars.width * (377/428),
    height:vars.height * (40/926),
    marginTop: vars.width * (36/428),
    borderColor:vars.primaryColor,
    borderWidth:0,
    borderBottomWidth:2,
  },
  pnlPesquisa:{
    minHeight:vars.height * (161/926),

  },
  resultadoScroll:{
    height:vars.height - vars.height * ((60 + 62 + 180)/926),
  },
  itemAtivo:{
    color:vars.primaryColor,
    borderBottomColor:vars.primaryColor
  },
  btnCriarTrajeto:{
    width: vars.width * (76/428),
    height:vars.height * (76/926),
    borderRadius: ((vars.width * (76/428))/2),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: vars.primaryColor,
    position:"absolute",
    bottom:vars.height * (39/926),
    right:vars.height * (39/926),
    elevation: 5,
    
  },
  imgCriarTrajeto:{
    width: vars.width * (38/428),
    height:vars.height * (38/926),
  }
})

export default style