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
            <div className="FirstMenu">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Calendario Escolar</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Menú Mensual</button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"></div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">...</div>
                </div>
            </div>

            <div className="accordion" id="Acciones profe">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Alumnos
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body-StudentList">
                            <strong>Aqui importamos la lista de alumnos</strong> Nos traemos la lista de StudentsList
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            Notificaciones Comida
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body-comida">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"  value="" id="defaultCheck1" required/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Come bien
                                    </label>
                            
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" required/>
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        Come poco
                                    </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" required/>
                                    <label className="form-check-label" htmlFor="defaultCheck3">
                                        No come
                                    </label>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Notificaciones de sueño
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="accordion-body-sueño">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"  value="" id="defaultCheck1" required/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        No duerme
                                    </label>
                            
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" required/>
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        Duerme
                                    </label>
                            </div>
                            

                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-floating">
                <textarea className="form-control" placeholder="Anotaciones" id="floatingTextarea"></textarea>
                <label htmlFor="floatingTextarea">Comentarios extras</label>
            </div>
        </div>
    );
};
