import React, { useContext } from "react";
import { Context } from "../store/appContext";
/* aqui pregunta como guardo el logo en img */
import "../../styles/basics.css";


export const Padres = () => {
    const { store, actions } = useContext(Context);

    return (
        <div classNameName="text-center mt-5">
            <h1>Bienvenido.</h1>

            {/* aqui usa los de JS tonta no los de HTML lo de nav and tabs */}
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Calendario Escolar</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Menú Mensual</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Datos de Contacto</a>
                </li>
            </ul>

            <div className="card" >
                <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Nombre del Niño</h5>
                        <p className="card-text">Aquí encontrarás las notificaciones y el perfil de tu hijo</p>
                        <a href="#" className="btn btn-primary" style={{ backgroundColor: "#086972" }}>Ver más</a>
                    </div>
            </div>
        </div>
    );
};