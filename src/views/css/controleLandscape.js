import { StyleSheet } from 'react-native';

import vars from './vars';

const mainWitdh = vars.width;
const style = StyleSheet.create({

  centerAll:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    width: vars.height/3,
    height:vars.width * (124/926),

    paddingHorizontal: vars.width * (26/926),
    paddingTop: vars.width * (20/926),
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.secondaryColor,
    flexWrap: 'wrap', 
    flexDirection:'row',   
    position:"absolute",
    zIndex: 3, // works on ios
    elevation: 3, // works on android
    right: 0
  },
  switchManual:{
    borderRadius: 50,
    backgroundColor: vars.secondaryColor,
    width: vars.height * (200/926),
    height:vars.width * (64/428),
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchManualObj:{
    width: vars.height * (55/926),
    height:vars.width * (55/428),
    transform:[{ scaleX: 1.5 }, { scaleY: 3 }]
  },
  main:{
    height: mainWitdh,//164
    justifyContent: 'center',
  },
  map: {
    width: vars.height,
    height: vars.width,
    position:"absolute",
    top: 0
  },

  containerMain:{
    width: vars.height * (729/926),
    height: mainWitdh,
    flexGrow: 1,
    justifyContent: 'center',

  },
  rotateScreenSplash:{
    width: vars.height,
    height: vars.width,
    position: "absolute",
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor:"'rgba(0, 0, 0, 0.5)'"
  },
  logo:{
    width: vars.width * (20/926),
    height: vars.width * (20/926),
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    backgroundColor:"#FF0000",
    marginRight:vars.height * (11/428),
  },
  switchManualHorizontal:{
    height: mainWitdh/4,
    paddingTop: vars.width * (18/428),
    flexWrap: 'wrap', 
    flexDirection:'row',
  },
  navegacaoInferior:{
    height: 3*mainWitdh/4,
    flexWrap: 'wrap', 
    flexDirection:'row',
  },
  direcao:{
    height: 3*mainWitdh/4,
    width: 2*vars.height * (729/926)/3,
    flexWrap: 'wrap', 
    flexDirection:'row',
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    left: -(vars.height * (729/926)/3)
  },
  switchVertical:{
    height: 3*mainWitdh/4,
    width: vars.height * (729/926)/3,
    transform: [{rotateZ: "90deg"}],
    justifyContent:"flex-end",
    alignItems: "center",
    position: "absolute",
    right: -(vars.height * (729/926)/2.5)
  },
  direcional:{
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    fontWeight: "bold"
  }
})

export default style