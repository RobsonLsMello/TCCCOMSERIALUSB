import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const vars = {
  width:width,
  height:height,
  primaryColor: "#654AB4",
  secondaryColor: "#FFFFFF",
  disclaimerColor: "#929292",
  disabledColor: "#D8D8D8",
  disabledFontColor: "#969696",
  infoColor: "#5F5D5D",
  fontXXXL: height*(32/926),
  fontXXL: height*(28/926),
  fontXL: height*(24/926),
  fontL: height*(20/926),
  fontM: height*(16/926),
  fontS: height*(12/926),
  fontXS: height*(8/926),
} 

export default vars