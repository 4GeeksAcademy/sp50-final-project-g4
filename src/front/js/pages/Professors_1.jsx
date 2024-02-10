import React, { useContext } from "react";
import { Context } from "../store/appContext";
import basics from "../../styles/basics.css"
import MenuURL from "../../img/MenuBS.jpg"
import CalendarioURL from "../../img/Calendario.jpg"

export const Professors_1 = () => {
    const { store, actions } = useContext(Context);
    

    return (
        <div className="Container-1">
            <div className="SubContainer-1">
                <div className="Title">
                    <h1>Bienvenido "store.user.name"</h1>
                </div>
            </div>
            <div class="CardsProfessors">
                <div class="card_StudentList" style="width: 12rem;">
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="cardList">
                        <h5>ALUMNOS DEL GRUPO</h5>
                        <p class="card-text">De aquí me traigo la lista de alumnos</p>
                        <ul class="list-group">
                            <li class="list-group-item">Alumno 1</li>
                            <li class="list-group-item">Alumno 2</li>
                            <li class="list-group-item">Alumno 3</li>
                            <li class="list-group-item">Alumno 4</li>
                            <li class="list-group-item">Alumno 5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}