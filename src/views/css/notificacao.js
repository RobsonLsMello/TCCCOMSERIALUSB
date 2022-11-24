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
  pnlDados:{
    flexWrap: 'wrap', 
    flexDirection:'row',   
  },
  lblDisclaimer:{
    color:"#929292"
  }
})

export default style