import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import clienteAxios from './config/axios';
//Componentes
import Paciente from './Components/Paciente';
import CrearCita from './Components/CrearCita';
import ObtenerCita from './Components/ObtenerCita';


function App() {
  
    //Estado de la aplocacion
    const [citas, guardarCitas] = useState([]);
    //PARA CONSULTAR NUEVAMENTE
    const [consultarCitas, guardarConsultar] = useState(true);

    useEffect( () => {
        if(consultarCitas){
          const consultarAPI = () =>{
            clienteAxios.get('/pacientes')
              .then(respuesta => {
                //colocar en el State
                console.log(respuesta.data);
                guardarCitas(respuesta.data);
                guardarConsultar(false);
              })
              .catch(error => {
                console.log(error)
              })
        }
        consultarAPI();
        }
  }, [consultarCitas]);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ () =>  <Paciente citas={citas} guardarConsultar={guardarConsultar}/>}/>

        <Route exact path="/create" component={ () => <CrearCita guardarConsultar={guardarConsultar}/>}/>

        <Route exact path="/cita/:id" render={(props) =>{
          
          const cita = citas.filter(cita => cita._id === props.match.params.id);
  
         return <CrearCita citaUpdate={cita[0]} guardarConsultar={guardarConsultar}/>
        }}/>


      </Switch>
    </Router>
  );
}

export default App;
