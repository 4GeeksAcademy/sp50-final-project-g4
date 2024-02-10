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
                    <h2>Bienvenido "store.user.name"</h2>
                </div>
            </div>
            <div className="TabsMenuCalendar">
                <ul class="nav justify-content-center">
                    <li class="nav-item-calendar">
                        <a class="nav-link active" aria-current="page" href="#">Calendario Escolar</a>
                    </li>
                    <li class="nav-item-menu">
                        <a class="nav-link" href="#">Menú Mensual</a>
                    </li>
                </ul>
            </div>
            <div className="CardNotif">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">"store.student.name"</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Notificaciones del día</h6>
                        <p class="card-text">Aquí nos traemos las notif del back</p>
                    </div>
                </div>
            </div>
        </div>
    )
}