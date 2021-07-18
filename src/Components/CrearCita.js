import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';



function CrearCita(props) {
  
    let titulo;
    const citaUpdate = props.citaUpdate;

    const [cita, guardarCita] =  useState({
        nombre: "",
        propietario: "",
        fecha: "",
        hora: "",
        telefono: "",
        sintomas: ""
    })

    const {nombre, propietario, fecha, hora, telefono, sintomas} = cita;

    const actualizarState = e => {
        
        guardarCita({
            ...cita, [e.target.name] : e.target.value
        })
    }

    const enviarCita = (e) =>{
        e.preventDefault();

        if(nombre === '' || propietario === '' || fecha === '' || hora === '' || telefono === '' || sintomas === ''){
            console.log("campos vacips");
            Swal.fire('Campos vacios')
            return;
        }
        if(titulo === 'Editar Cita'){
            console.log("Editando");
            clienteAxios.put(`/pacientes/${cita._id}`, cita)
            .then(respuesta => {
                console.log(respuesta);
                props.guardarConsultar(true);
                props.history.push('/');            
            })
            .catch(error => {
                console.log(error)
            })

        }else{
            console.log("creando");
            clienteAxios.post('/pacientes', cita)
            .then(respuesta => {
                //console.log(respuesta);
                props.guardarConsultar(true);
                props.history.push('/');            
            })
            .catch(error => {
                console.log(error)
            })

        }
        
    }

   

   
if(citaUpdate){
    titulo = "Editar Cita"
}else{
    titulo = "Crear Cita"
}
    useEffect(() => {
        if(citaUpdate){
            
        //console.log("editando");
        guardarCita({
            _id: citaUpdate._id,
            nombre: citaUpdate.nombre,
            propietario: citaUpdate.propietario,
            telefono: citaUpdate.telefono,
            fecha: citaUpdate.fecha,
            hora: citaUpdate.hora,
            sintomas: citaUpdate.sintomas

        })
        }
      }, [ titulo]);

   

    return (
        <Fragment>
            <h1 className="my-5"> {titulo}</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Volver</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <form onSubmit={enviarCita} className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="nombre" 
                                    name="nombre" 
                                    placeholder="Nombre Mascota" 
                                    onChange={actualizarState}
                                    value={cita.nombre ? cita.nombre : ""}    
    
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Nombre Propietario</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="propietario" 
                                    name="propietario" 
                                    placeholder="Nombre Propietario" 
                                    onChange={actualizarState}
                                    value={cita.propietario ? cita.propietario : ""}        
                                    
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input 
                                    type="tel" 
                                    className="form-control form-control-lg" 
                                    id="telefono" 
                                    name="telefono" 
                                    placeholder="Teléfono" 
                                    onChange={actualizarState}
                                    value={cita.telefono ? cita.telefono : ""}    

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fecha">Fecha Alta</label>
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    id="fecha" 
                                    name="fecha" 
                                    onChange={actualizarState}
                                    value={cita.fecha ? cita.fecha : ""}    

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="hora">Hora Alta</label>
                                <input 
                                    type="time" 
                                    className="form-control form-control-lg" 
                                    id="hora" 
                                    name="hora"  
                                    onChange={actualizarState}
                                    value={cita.hora ? cita.hora : ""}    

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea 
                                    className="form-control" 
                                    name="sintomas" 
                                    rows="6" 
                                    onChange={actualizarState}
                                    value={cita.sintomas ? cita.sintomas : ""}    

                                ></textarea>
                            </div>


                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value={titulo}  />
                        </form>
                        
                    </div>

                </div>
            </div>

        </Fragment>
        
    );
}

export default withRouter(CrearCita);