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
                <div class="card_StudentsList">
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
                <div class="card_StudentsNotif">
                    <div class="food">
                        <h2 class="food-header">
                            Notificaciones Alimentación <span className="acordion_icons"><i class="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div class="Food">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Come" id="flexRadioDefaulta" />
                                <label class="form-check-label" for="flexRadioDefaulta">
                                    Come bien
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Come" id="flexRadioDefaultb" />
                                <label class="form-check-label" for="flexRadioDefaultb">
                                    Come poco
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Come" id="flexRadioDefaultc" />
                                <label class="form-check-label" for="flexRadioDefaultc">
                                    No come
                                </label>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
}