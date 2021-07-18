import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2';

const Paciente = ( props) => {
    const {citas} = props;
    
    const eliminarCita = (id) =>{
        //console.log(id);


        Swal.fire({
            title: 'Quieres eliminar?',
            text: "Los cambios no se pueden revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {

                clienteAxios.delete(`/pacientes/${id}`)
                .then(respuesta => {
                    props.guardarConsultar(true);
                    props.history.push('/'); 
                })
                .catch(error => console.log(error))
              Swal.fire(
                'Eliminado!',
                'El registro fue eliminado correctamente',
                'success'
              )
            }
          })
    }

    
    

    return (
        <Fragment>
            <h1 className="my-5"> Administrador de Pacientes</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/create'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Crear Cita</Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {citas.length === 0 && <h1 className="my-5"> No hay Registros...</h1> }
                            {citas.map(cita => (
                                <div key={cita._id}>
                                <Link to={'/cita/'+cita._id}  className="p-5 list-group-item list-group-item-action flex-column align-item-start">
                                    <div className="d-flex w-100 justify-content-between mb-4">
                                        <h3 className="mb-3"> {cita.nombre}</h3>
                                        
                                        <small className="fecha-alta">
                                            {cita.fecha} - {cita.hora} 
                                        </small>
                                    </div>

                                    <p className="mb-0">
                                        {cita.sintomas}
                                    </p>

                                    <div className="contacto py-3">
                                        <p>Dueño: {cita.propietario}</p>
                                        <p>Telefono: {cita.telefono}</p>
                                        

                                    </div>
                                    
                                
                                </Link>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                        <h3 className="mb-2"> </h3>
                                        
                                        <small className="eliminar">
                                        <button type="button" className="btn btn-danger col py-2 px-5 font-weight-bold"
                                         onClick={() => eliminarCita(cita._id)}>Eliminar</button>  
                                        </small>
                                    </div>
                               </div>
                                
                            ))}
                            
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default withRouter(Paciente);