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
    height:vars.height * (104/926),
    paddingTop: vars.height * (68/926),
    paddingBottom: vars.height * (16/926),
    paddingHorizontal: vars.height * (26/926),
    backgroundColor: vars.secondaryColor,
    flexWrap: 'wrap', 
    flexDirection:'row',   
  },
  main:{
    height:vars.height - vars.height * (164/926),//164
  },
  map: {
    width: vars.width,
    height: vars.height - vars.height * (164/926),
    position:"absolute"
  },
  infoContainer:{
    minHeight:vars.height * (165/926),
    width: vars.width,
    flexWrap: 'wrap', 
    flexDirection:'row',
    paddingLeft: vars.width * (24/428),
    paddingTop:vars.height * (35/926),
  },
  statusContainerPai:{
    marginTop: - vars.height * (164/926),
    height:vars.height - vars.height * (164/926),
    width: vars.width,
    alignItems: 'flex-end'
  },
  statusContainer:{
    justifyContent:"space-between",
    alignContent:"center",
    alignItems:"center",
    flexWrap: 'wrap', 
    flexDirection:'row',
    width: vars.width * (50/428),    
    position:"relative",
    height:vars.height - vars.height * (164/926),
  },
  containerMain:{
    width: vars.width * (365/428),
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo:{
    width: vars.height * (20/926),
    height: vars.height * (20/926),
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    backgroundColor:"#FF0000",
    marginRight:vars.width * (11/428),
  },
  lblAgora:{
    width: vars.width * (300/428),
  },
  btnBatimentria:{
    width: vars.width * (220/428),
    height:vars.height * (60/926),
    backgroundColor:vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center",
    marginTop: vars.height * (16/926)
  },
  lblBatimetria:{
    color:vars.secondaryColor,
    fontSize: vars.fontL,
    fontWeight:"bold",
    
  },
  imgBluetooth:{
    width: vars.height * (40/926),
    height: vars.height * (40/926),
  },
  imgStatus:{
    width: vars.height * (40/926),
    height: vars.height * (40/926),
    backgroundColor:"#FFF",
    marginVertical:10
  },
  pnlDispositivo:{
    width: vars.width * (132/428),
    height:vars.height * (72/926),
    backgroundColor:vars.secondaryColor,
    justifyContent: 'center',
    alignItems:"center"
  },
  btnBluetooth:{
    width: vars.width * (72/428),
    height:vars.height * (72/926),
    backgroundColor:vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center"
  },
  pnlControleBatimetria:{
    width: vars.width * (220/428),
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent:"space-between",
    position:"absolute",
    bottom: vars.height * (36/926),
  },
  lblDispositivo:{
    fontSize:vars.fontM
  },
  lblOnline:{
    fontSize:vars.fontL,
    fontWeight:"bold",
    color:"#2FCC66"
  },
  lblOffline:{
    fontSize:vars.fontL,
    fontWeight:"bold",
    color:"#F44336"
  },
  pnlLegenda:{
    width: vars.width * (220/428),
    height:vars.height * (132/926),
    backgroundColor:vars.secondaryColor,
    paddingHorizontal: vars.width * (13/428),
    paddingVertical: vars.height * (10/926),
    marginBottom: vars.height * (16/926)
  },
  pnlNivelProfundidade:{
    width: vars.width * (194/428),
    height:vars.height * (35/926),
  },
  pnlProfundidades:{
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent:"space-between",
  },
  lblLegenda:{
    fontWeight:"bold",
    fontSize:vars.fontM
  },
  plot:{
    width: vars.width,
    height: vars.height,
    position: "absolute",
    zIndex: 1000
  }
})

export default style