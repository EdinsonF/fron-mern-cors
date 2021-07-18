import React, {useState,Fragment} from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';


function ObtenerCita(props) {

/*     const [cita, guardarCita] = useState({});
const id_paciente = props.match.params.id; */




    /* clienteAxios.get(`/pacientes/${id_paciente}`)
      .then(respuesta => {
        //colocar en el State
        //console.log(respuesta.data);
        guardarCita(respuesta.data);
        
      })
      .catch(error => {
        console.log(error)
      }) */


    return (
        <Fragment>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                        <div  className="p-5 list-group-item list-group-item-action flex-column align-item-start">
                            <div className="d-flex w-100 justify-content-between mb-4">
                                <h3 className="mb-3"> {}</h3>
                                <small className="fecha-alta">
                                    {} - {}
                                </small>
                            </div>

                            <p className="mb-0">
                                {}
                            </p>

                            <div className="contacto py-3">
                                <p>Dueño: {}</p>
                                <p>Telefono: {}</p>
                            </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default ObtenerCita;