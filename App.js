import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import index from './src/views/index'
import login from './src/views/login'
import cadastrar from './src/views/cadastro'
import confirmarEmail from './src/views/confirmarEmail'
import finalizarCadastro from './src/views/finalizarCadastro'
import primeiroLogin from './src/views/primeiroLogin'
import main from './src/views/main'
import dados from './src/views/dados'
import perfil from './src/views/perfil'
import notificacao from './src/views/notificacao'
import configuracao from './src/views/configuracoes'
import criarTrajeto from './src/views/criarTrajeto'
import controle from './src/views/controle'
import bluTest from './src/views/BluTest'
import fsTest from './src/views/FsTest'



const Stack = createStackNavigator()

function App(){
 return(
 <NavigationContainer>
   <Stack.Navigator initialRouteName = "bluTest" screenOptions = {{headerShown: false}}> 

   <Stack.Screen name = "bluTest" component = {bluTest} 
    options = {{
        headerShown: false,
      }}
    />
  <Stack.Screen name = "fsTest" component = {fsTest} 
    options = {{
        headerShown: false,
      }}
    />
   <Stack.Screen name = "index" component = {index} 
    options = {{
        headerShown: false,
      }}
    />

  <Stack.Screen name = "login" component = {login} 
    options = {{
        headerShown: false,
      }}
    />

  <Stack.Screen name = "cadastrar" component = {cadastrar} 
    options = {{
        headerShown: false,
      }}
    />
  <Stack.Screen name = "confirmarEmail" component = {confirmarEmail} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "finalizarCadastro" component = {finalizarCadastro} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "primeiroLogin" component = {primeiroLogin} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "main" component = {main} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "dados" component = {dados} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "perfil" component = {perfil} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "notificacao" component = {notificacao} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "configuracao" component = {configuracao} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "criarTrajeto" component = {criarTrajeto} 
    options = {{
        headerShown: false,
      }}
    />
    <Stack.Screen name = "controle" component = {controle} 
    options = {{
        headerShown: false,
      }}
    />
   </Stack.Navigator>

 </NavigationContainer>


 )
}

export default App;
