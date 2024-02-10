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
            <div class="CardsProfessors">
                <div class="card_StudentsList">
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="cardList">
                        <h2>ALUMNOS DEL GRUPO</h2>
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
                    <h1>NOTIFICACIONES</h1>
                    <div class="Food">
                        <h2 class="food-header">
                            Notificaciones Alimentación <span className="notif_icons"><i class="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div class="FoodCheck">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood" />
                                <label class="form-check-label" for="flexRadioDefaultfood">
                                    Come bien
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood" />
                                <label class="form-check-label" for="flexRadioDefaultFood">
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
                    <div class="Sleep">
                        <h2 class="sleep-header">
                            Notificaciones Sueño <span className="notif_icons"><i class="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div class="SleepCheck">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep" />
                                <label class="form-check-label" for="flexRadioDefaultSleep">
                                    Duerme
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep" />
                                <label class="form-check-label" for="flexRadioDefaultSleep">
                                    No duerme
                                </label>

                            </div>
                            
                        </div>
                    </div>
                    <div class="Hygiene">
                        <h2 class="hygiene-header">
                            Notificaciones Higiene <span className="notif_icons"><i class="fa-solid fa-poop"></i></span>
                        </h2>
                        <div class="HygieneCheck">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Higiene" id="flexRadioDefaultHygiene" />
                                <label class="form-check-label" for="flexRadioDefaultHygiene">
                                    Cambio
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="" id="flexRadioDefaultHygiene" />
                                <label class="form-check-label" for="flexRadioDefaultHygiene">
                                    No cambio
                                </label>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}