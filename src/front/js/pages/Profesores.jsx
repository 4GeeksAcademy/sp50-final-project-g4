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
                {/* <div class="FirstMenu">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Menú Mensual</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Calendario</button>
                        </li>

                    </ul>
                    <div class="tab-content" id="myTabContent">

                        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0"><img className="" src={MenuURL} /></div>
                        <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0"><img className="" src={CalendarioURL} /></div>

                    </div>

                </div> */}

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
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Come bien
                                    </label>

                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefaultb" id="flexRadioDefaultb" />
                                    <label class="form-check-label" for="flexRadioDefaultb">
                                        Come poco
                                    </label>

                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefaulta" id="flexRadioDefaulta" />
                                    <label class="form-check-label" for="flexRadioDefaulta">
                                        No come
                                    </label>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                Notificaciones Sueño <span className="acordion_icons"><i class="fa-solid fa-utensils"></i></span>
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
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
                    {/* <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Notificaciones Sueño <span className="acordion_icons"><i class="fa-solid fa-bed"></i></span>
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="accordion-body-sueño">
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
                    </div> */}
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Notificaciones Higiene <span className="acordion_icons"><i class="fa-solid fa-poo"></i></span>
                            </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="accordion-body-higiene">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                        <label class="form-check-label" for="defaultCheck1">
                                            <span class="poops">
                                                <i class="fa-solid fa-poop"></i>
                                            </span>
                                        </label>

                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" required />
                                        <label class="form-check-label" for="defaultCheck2">
                                            <span class="poops">
                                                <i class="fa-solid fa-poop"></i>
                                                <i class="fa-solid fa-poop"></i>
                                            </span>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" required />
                                        <label class="form-check-label" for="defaultCheck2">
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
                </div>

                <div class="Extra-Comments">
                    <label for="floatingTextarea">Comentarios extras</label>
                    <textarea class="form-control" placeholder="Anotaciones" id="floatingTextarea"></textarea>

                </div>
            </div>
        </div>
    );
};
