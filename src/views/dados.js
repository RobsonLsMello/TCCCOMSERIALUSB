import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, StyleSheet, Image, TouchableHighlight, ScrollView, SafeAreaView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import style from './css/dados'
import Navbar from './components/navbar';
import ResultadoCard from './components/resultadoCard';
import TrajetoCard from './components/trajetoCard';
import controller from './../controllers/dados'
import AsyncStorage from '@react-native-async-storage/async-storage';

var renderizarTrajetosBuscados = async (setTrajetos) =>{  
  let trajetos = await controller.mostrarTrajetos(AsyncStorage);;
  let trajetosObject = [];
  trajetos.forEach((trajeto, index) =>{
      trajetosObject.push((<TrajetoCard nome={`${trajeto.name}`} key={index} vezes={0} id={trajeto._id}></TrajetoCard>))
  })
  setTrajetos(trajetosObject)
}

var renderizarBatimetriasBuscados = async (setBatimetrias) =>{  
  let res = await controller.mostrarBatimetrias(AsyncStorage);
  let batrimetrias = [];
  res.forEach((batrimetria, index) =>{
    let date = new Date(batrimetria.bathy.dateInit);
    let formatDate = date.toLocaleDateString("pt-br").split("/");
    let formatTime = date.toLocaleTimeString("pt-br");
    let datetimeformat = `${formatDate[1]}/${formatDate[0]}/${formatDate[2]} ${formatTime}`;
    batrimetrias.push((<ResultadoCard lugar={batrimetria.route.name} key={"B"+index} tempo="0" id={batrimetria.bathy._id} data={datetimeformat}/>))
  })
  setBatimetrias(batrimetrias)
}

function Dados({navigation}){

  useEffect(() => {
    (async () => {
      await renderizarTrajetosBuscados(setTrajetos);
      await renderizarBatimetriasBuscados(setBatimetrias);
    })();
  }, []);

const [isRegistro, setIsRegistro] = useState(true)
const [date, setDate] = useState(new Date())
const [open, setOpen] = useState(false)
const [trajetos, setTrajetos] = useState([(<TrajetoCard nome="Trajeto" key={1} vezes={10} id={12341}></TrajetoCard>)])
const [batimetrias, setBatimetrias] = useState([(<ResultadoCard lugar="Porto de Santos" key={1} tempo="20m01s" data="01/01/2022 15:03"/>)])

    return(
  <View style={[]}> 
    <View style={[style.header]}> 
      <TouchableHighlight style={style.btnMenuSuperior} onPress={()=> setIsRegistro(true)}>
        <Text style={[style.lblBtnMenuSuperior, isRegistro? style.itemAtivo : null]}>Registro de Batimetria</Text>
      </TouchableHighlight>
      <TouchableHighlight style={style.btnMenuSuperior} onPress={()=> setIsRegistro(false)}>
        <Text style={[style.lblBtnMenuSuperior, !isRegistro? style.itemAtivo : null]}>Trajeto</Text>
      </TouchableHighlight>
    </View>
    <View style={[style.main, style.centerAll]}> 
      <View style={style.containerMain}>
        {isRegistro? 
                <View style={style.pnlPesquisa}>
                <View style={style.pnlDatapicker}>
                  <Image
                    style={style.imgCalendario}
                    source={require("../../assets/calendario.png")}
                  />
                  
                </View>
                <TextInput style={style.txtLocalizacao} placeholder="Localização"></TextInput> 
              </View>
        : null}

        <SafeAreaView style={style.resultado}>
          <ScrollView style={style.resultadoScroll}>
            <View style={!isRegistro ? {display:"none"} : null}>
              {batimetrias}
            </View>
            <View style={isRegistro ? {display:"none"} : null}>
              {trajetos}
            </View>
          
            
          </ScrollView>
        </SafeAreaView>
      </View>
      {!isRegistro ?
        (<TouchableHighlight style={[style.btnCriarTrajeto]} onPress={() => navigation.navigate("criarTrajeto")}>
        <Image
          style={style.imgCriarTrajeto}
          source={require("../../assets/pen.png")}
        />
      </TouchableHighlight>):
        <Text style={{display:"none"}}></Text>
      }
    </View>
    <View style={[style.footer]}> 
      <Navbar nav={navigation} screen="Dados" />
    </View>

  </View>
  )
}



export default Dados