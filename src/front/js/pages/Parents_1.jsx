import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
// import basics from "../../styles/basics.css"
import MenuURL from "../../img/MenuBS.jpg"
import CalendarioURL from "../../img/Calendario.jpg"
import { element } from "prop-types";

export const Parents_1 = () => {
    const { store, actions } = useContext(Context);
    console.log("hola", store.notifications);
    const students = store.students
    const filterStudent = students.filter(student => student.id == notifications.student_id)
    console.log(filterStudent);

    const storeChild = store.profile.childs
    // console.log("storeChild", storeChild);
    // useEffect(() => {
    // }, [])

    // const users = storeChild.map(elem => (
    //     {
    //         id: elem.id,
    //         name: elem.name,
    //         children: store.notifications.filter(d => d.student_id === elem.id)
    //     }
    // ));
    // console.log("ori", users);
    // console.log("ori2", students);
    // console.log("map", store.notifications.filter(d => d.student_id === 1));

    // const filterUsers = (id) => {
    //     let filteredUsers = [];
    //     for (let i = 0; i < store.notifications.length; i++) {

    //         for (let j = 0; j < users[i].length; j++) {
    //             if (users[i][j].student_id === id) {
    //                 filteredUsers = [...filteredUsers, users[i][j]];
    //             }
    //         }


    //     }
    //     return filteredUsers
    // }

    // console.log("filter", filterUsers(1));

    return (
        <div className="Container-parents">
            <div className="SubContainer-parents">
                <div className="Title">
                    <h2>Bienvenido {store.profile ? store.profile.name : "usuario"}</h2>
                </div>
            </div>
            <div className="TabsMenuCalendar" style={{ display: "flex:center" }}>
                {/* Boton 1 Calendario  */}
                <button type="button" class="a btn btn-primary small-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
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
                <button type="button" class="b btn btn-primary small-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                }}>
                    Menú Mensual
                </button>
                <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false"
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
                        <h6 class="card-subtitle mb-2 text-body-secondary">Notificaciones del día</h6>
                        <p class="card-text">Notificaciones</p>
                        <ul>
                            {/* {store.notifications && store.notifications.map(el =>

                                <li id={el.id} key={el.id} className={`list-group-item`} >

                                    {el.notes}
                                </li>)
                            }  */}
                             {storeChild.map((item, index) => 
                                        <>
                                        <p>hijos:
                                        {item.name}</p>
                            {store.notifications && store.notifications.map(student =>
                                student.map(el => item.id == el.student_id ? 
                                    
                                    <li id={el.id} key={el.id} className="list-group-item" style={{ "height": "200px"}}  >
                                        <p>fecha: {el.date} </p>
                                        <p>Alimentacion: {el.eat} </p>
                                        <p>Sueño: {el.sleep} </p>
                                        <p>Cambio: {el.poop?"si":"no"} </p>
                                        <p>notas: {el.notes} </p>
                                        {console.log("storeChild:" , item.id , "el:" , el.student_id)}
                                    </li>
                                    : null)
                            )
                            }</>
                            )} 


                        </ul>

                        {/* Revisar el map de las notificaciones */}
                    </div>
                </div>
            </div>
        </div>
    )
}