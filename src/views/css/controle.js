import { StyleSheet } from 'react-native';

import vars from './vars';

const style = StyleSheet.create({
  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBluetooth:{
    marginRight: 20,
    width: vars.width * (100/428),
    height:vars.height * (72/926),
    backgroundColor:vars.primaryColor,
    justifyContent: 'center',
    alignItems:"center"
  },
  imgBluetooth:{
    width: vars.height * (40/926),
    height: vars.height * (40/926),
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

  containerMain:{
    width: vars.width * (365/428),
    flexGrow: 1,
    justifyContent: 'center',
  },
  rotateScreenSplash:{
    width: vars.width,
    height: vars.height,
    position: "absolute",
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor:"'rgba(0, 0, 0, 0.5)'"
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
  
})

export default style