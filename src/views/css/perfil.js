import { StyleSheet } from 'react-native';

import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    alignItems: 'center',
  },
  header:{
    width: vars.width,
    height:vars.height * (276/926),
    paddingVertical: vars.height * (14/926),
    paddingHorizontal: vars.width * (24/428),
    backgroundColor: vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center"  
  },
  main:{
    height:vars.height - vars.height * ((60 + 276)/926),
    backgroundColor: vars.secondaryColor,
    paddingTop:vars.height * (20/926),
  },
  containerMain:{
    width: vars.width * (377/428),
    flexGrow: 1,

  },
  pnlPerfil:{
    backgroundColor: vars.secondaryColor,
    width:vars.width * (126/428),
    height:vars.height * (126/926),
    borderRadius:((vars.width * (126/428))/2),
    justifyContent: 'center',
    alignItems:"center"
  },
  imgPerfil:{
    width:vars.width * (100/428),
    height:vars.height * (100/926),
  },
  lblNomeUsuario:{
    color:vars.secondaryColor,
    fontSize:vars.fontL,
    fontWeight:"bold",
    marginTop: vars.height * (38/926),
  },
  pnlDados:{
    flexWrap: 'wrap', 
    flexDirection:'row',  
    justifyContent:"space-between" 
  },
})

export default style