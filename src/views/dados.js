import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View,TextInput, ActivityIndicator, Image, TouchableHighlight, ScrollView, SafeAreaView} from 'react-native';
import DatePicker from 'react-native-date-picker'
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

var renderizarBatimetriasBuscados = async (nav, setBatimetrias, date = new Date(), trajetoBuscado = "") =>{  
  setBatimetrias([[(<ActivityIndicator size="large"  key="ActivityIndicatorBatrimetria" color="#654AB4" />)]])
  let res = await controller.mostrarBatimetrias(AsyncStorage);
  let batrimetrias = [];
  let result = res.filter(batrimetria =>{
    let dataBatimetria = new Date(batrimetria.bathy.dateInit);
    
    let trajeto = trajetoBuscado == "" ? "" : batrimetria.route.name;
    return ((dataBatimetria.getDate() == date.getDate() && dataBatimetria.getFullYear() == date.getFullYear() && dataBatimetria.getMonth() == date.getMonth()) && trajeto.match(trajetoBuscado))

  })

  result.forEach((batrimetria, index) =>{
    let date = new Date(batrimetria.bathy.dateInit);
    let formatDate = date.toLocaleDateString("pt-br").split("/");
    let formatTime = date.toLocaleTimeString("pt-br");
    let datetimeformat = `${formatDate[1]}/${formatDate[0]}/${formatDate[2]} ${formatTime}`;
    batrimetrias.push((<ResultadoCard lugar={batrimetria.route.name} key={"B"+index} tempo="0" nav={nav} id={batrimetria.bathy._id} data={datetimeformat}/>))
  })

  setBatimetrias(batrimetrias)
}

function Dados({navigation}){

  useEffect(() => {
    (async () => {
      await renderizarTrajetosBuscados(setTrajetos);
      await renderizarBatimetriasBuscados(navigation, setBatimetrias);
    })();
  }, []);


const [isRegistro, setIsRegistro] = useState(true)
const [conteudoTrajeto, setConteudoTrajeto] = useState("")
const [date, setDate] = useState(new Date())
const [open, setOpen] = useState(false)
const [trajetos, setTrajetos] = useState([(<ActivityIndicator size="large" key="ActivityIndicatorTrajeto" color="#654AB4" />)])
const [batimetrias, setBatimetrias] = useState([(<ActivityIndicator size="large" key="ActivityIndicatorBatrimetria" color="#654AB4" />)])

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
                  <TextInput value={date.toString()} style={style.dtpRegistroOutside} onPressIn={()=>setOpen(true)}></TextInput>
                </View>
                <TextInput style={style.txtLocalizacao} placeholder="Trajeto" onChangeText={setConteudoTrajeto} onEndEditing={data => renderizarBatimetriasBuscados(navigation, setBatimetrias, date, conteudoTrajeto)}></TextInput> 
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
    <DatePicker
        modal={true}
        theme='light'
        androidVariant="nativeAndroid"
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          renderizarBatimetriasBuscados(navigation, setBatimetrias, date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
  </View>
  )
}



export default Dados