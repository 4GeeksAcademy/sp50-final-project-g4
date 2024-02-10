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
            <div className="CardsProfessors">
                <div className="card_StudentsList">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="cardList">
                        <h2>ALUMNOS DEL GRUPO</h2>
                        <p className="card-text">De aquí me traigo la lista de alumnos</p>
                        <ul className="list-group">
                            <li className="list-group-item">Alumno 1</li>
                            <li className="list-group-item">Alumno 2</li>
                            <li className="list-group-item">Alumno 3</li>
                            <li className="list-group-item">Alumno 4</li>
                            <li className="list-group-item">Alumno 5</li>
                        </ul>
                    </div>
                </div>
                <div className="card_StudentsNotif">
                    <h1>NOTIFICACIONES</h1>
                    <div className="Food">
                        <h2 className="food-header">
                            Notificaciones Alimentación <span className="notif_icons"><i className="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div className="FoodCheck">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood" />
                                <label className="form-check-label" for="flexRadioDefaultfood">
                                    Come bien
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood" />
                                <label className="form-check-label" for="flexRadioDefaultFood">
                                    Come poco
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultc" />
                                <label className="form-check-label" for="flexRadioDefaultc">
                                    No come
                                </label>

                            </div>
                        </div>
                    </div>
                    <div className="Sleep">
                        <h2 className="sleep-header">
                            Notificaciones Sueño <span className="notif_icons"><i className="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div className="SleepCheck">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep" />
                                <label className="form-check-label" for="flexRadioDefaultSleep">
                                    Duerme
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep" />
                                <label className="form-check-label" for="flexRadioDefaultSleep">
                                    No duerme
                                </label>

                            </div>

                        </div>
                    </div>
                    <div className="Hygiene">
                        <h2 className="hygiene-header">
                            Notificaciones Higiene <span className="notif_icons"><i className="fa-solid fa-poop"></i></span>
                        </h2>
                        <div className="HygieneCheck">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Higiene" id="flexRadioDefaultHygiene" />
                                <label className="form-check-label" for="flexRadioDefaultHygiene">
                                    Cambio
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="" id="flexRadioDefaultHygiene" />
                                <label className="form-check-label" for="flexRadioDefaultHygiene">
                                    No cambio
                                </label>

                            </div>

                        </div>
                    </div>
                    <div className="Extra-Comments">
                    <h2 className="Comments-header">
                            Comentarios
                    </h2>
                        <label for="floatingTextarea">Comentarios extras</label>
                        <textarea className="form-control" placeholder="Escribe aqui comentarios extra para los padres" id="floatingTextarea"></textarea>

                    </div>
                    <div className="Boton_Enviar">
                        <button type="submit"> Enviar </button>
                    </div>
                </div>

            </div>

        </div>
    );
}