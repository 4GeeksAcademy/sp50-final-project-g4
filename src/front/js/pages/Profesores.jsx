import React, { useContext } from "react";
import { Context } from "../store/appContext";
import basics from "../../styles/basics.css"
// import { MenuURL} from "../../img/MenuBS.jpg"
// import {CalendarioURL} from "../../img/Calendario.jpg"

export const Profesores = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="text-center mt-5">
            <h1>Bienvenido.</h1>
            <div class="FirstMenu">
                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Menu</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Calendario</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">

                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                    </div>
                    <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>

                </div> */}
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Menú Mensual</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Calendario</button>
                    </li>
                   
                </ul>
                <div class="tab-content" id="myTabContent">
                    
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0"></div>
                    <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>
                    
                </div>

            </div>

            <div class="accordion" id="Acciones profe">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Alumnos
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
                            Notificaciones Comida
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body-comida">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                <label class="form-check-label" for="defaultCheck1">
                                    Come bien
                                </label>

                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" required />
                                <label class="form-check-label" for="defaultCheck2">
                                    Come poco
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" required />
                                <label class="form-check-label" for="defaultCheck3">
                                    No come
                                </label>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Notificaciones de sueño
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="accordion-body-sueño">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                    <label class="form-check-label" for="defaultCheck1">
                                        No duerme 
                                    </label>

                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" required />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Duerme
                                    </label>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Notificaciones de higiene
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
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

            <div class="form-floating">
                <textarea class="form-control" placeholder="Anotaciones" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Comentarios extras</label>
            </div>
        </div>
    );
};
