import React, { useContext useState useEffect} from "react";
import { Context } from "../store/appContext";
// import basics from "../../styles/basics.css"
import MenuURL from "../../img/MenuBS.jpg"
import CalendarioURL from "../../img/Calendario.jpg"

export const Parents_1 = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="Container-fr">
            <div className="SubContainer-frrf">
                <div className="Title">
                    <h2>Bienvenido {store.profile ? store.profile.name : "usuario"}</h2>
                </div>
            </div>
            <div className="TabsMenuCalendar" style={{ display: "grid" }}>

                {/* Boton 1 Calendario  */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                }}>
                    Calendario
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Calendario 2023 -2024</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img
                                    className="ImagenPadres"
                                    src={CalendarioURL}
                                    style={{ width: "85%", height: "85%" }}
                                />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Boton 2 Menú   */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                }}>
                    Menú Mensual
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Menú Febrero 2024</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img
                                    className="ImagenPadres"
                                    src={MenuURL}
                                    style={{ width: "85%", height: "85%" }}
                                />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="CardNotif">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title">"store.student.name"</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Notificaciones del día</h6>
                        <p class="card-text">Notificaciones</p>
                            {/* {store.getNotifications && store.getNotifications.map(el =>
                               )} */}
                               {/* Revisar el map de las notificaciones */}
                    </div>
                </div>
            </div>
        </div>
    )
}