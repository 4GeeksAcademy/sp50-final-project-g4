import React, { useContext } from "react";
import { Context } from "../store/appContext";
import basics from "../../styles/basics.css"
import MenuURL from "../../img/MenuBS.jpg"
import CalendarioURL from "../../img/Calendario.jpg"

export const Profesores = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="Container-1">
            <div className="SubContainer-1">
                <div className="Title">
                    <h1>Bienvenido "store.user.name"</h1>
                </div>
                <form>

                    <div class="accordion" id="Acciones profe">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Alumnos <span className="acordion_icons"><i class="fa-solid fa-children"></i></span>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div class="accordion-body-StudentList">
                                    <strong>Aqui importamos la lista de alumnos</strong> Nos traemos la lista de StudentsList
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    Notificaciones Alimentación <span className="acordion_icons"><i class="fa-solid fa-utensils"></i></span>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body-comida">
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
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseTwo">
                                    Notificaciones Sueño <span className="acordion_icons"><i class="fa-solid fa-bed"></i></span>
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body-comida">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Duerme
                                        </label>

                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            No duerme
                                        </label>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseTwo">
                                    Notificaciones Higiene <span className="acordion_icons"><i class="fa-solid fa-poop"></i></span>
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body-higiene">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefaultP" id="flexRadioDefaultP" />
                                        <label class="form-check-label" for="flexRadioDefaultP">
                                            <span class="poops">
                                                <i class="fa-solid fa-poop"></i>
                                            </span>
                                        </label>

                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefaultP" id="flexRadioDefaultP2" />
                                        <label class="form-check-label" for="flexRadioDefaultP2">
                                            <span class="poops">
                                                <i class="fa-solid fa-poop"></i>
                                                <i class="fa-solid fa-poop"></i>
                                            </span>
                                        </label>

                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefaultP" id="flexRadioDefaultP3" />
                                        <label class="form-check-label" for="flexRadioDefaultP3">
                                            <span class="poops">
                                                <i class="fa-solid fa-poop"></i>
                                                <i class="fa-solid fa-poop"></i>
                                                <i class="fa-solid fa-poop"></i>
                                            </span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Extra-Comments">
                        <label for="floatingTextarea">Comentarios extras</label>
                        <textarea class="form-control" placeholder="Escribe aqui comentarios extra para los padres" id="floatingTextarea"></textarea>

                    </div>
                    <div className="Boton_Enviar">
                        <button type="submit"> Enviar </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Con Javier has funcional el boton