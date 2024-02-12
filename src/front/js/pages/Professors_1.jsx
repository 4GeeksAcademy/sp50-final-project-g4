import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import basics from "../../styles/basics.css"
import MenuURL from "../../img/MenuBS.jpg"
import CalendarioURL from "../../img/Calendario.jpg"

export const Professors_1 = () => {
    const { store, actions } = useContext(Context);
    const [selected, setSelected] = useState()
    const [food, setFood] = useState()
    const [sleep, setSleep] = useState()
    const [hygiene, setHygiene] = useState()
    useEffect(() => {
        //llamar lista de alumnos del profesor
        actions.getGroupAndStudentsByProfessor()
    }, [])

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(sleep)
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(food)
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(hygiene)
    }

    return (
        <div className="Container-a">
            <div className="SubContainer-a">
                <div className="Title">
                    <h2>Bienvenido {store.profile ? store.profile.name : "usuario"}</h2>
                </div>
            </div>
            <div className="CardsProfessors">
                <div className="card_StudentsList">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="cardList">
                        <h2>ALUMNOS DEL GRUPO</h2>
                        <p className="card-text">De aquí me traigo la lista de alumnos</p>
                        <ul className="list-group">
                            {store.studentInGroup && store.studentInGroup.map(el =>
                                <li id={el.id} key={el.id}
                                    className={`list-group-item ${selected == el.id ? "active" : ""}`}
                                    onClick={e => setSelected(e.target.id)}
                                >{el.name}</li>)}


                        </ul>
                    </div>
                </div>
                <form className="card_StudentsNotif" onSubmit={handleSubmit}>
                    <h1>NOTIFICACIONES</h1>
                    <h4>Estudiante: {selected && store.studentInGroup.filter(el => el.id == selected)[0].name}</h4>

                    <div className="Food">
                        <h2 className="food-header">
                            Notificaciones Alimentación <span className="notif_icons"><i className="fa-solid fa-utensils"></i></span>
                        </h2>
                        <div className="FoodCheck">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood"
                                    onChange={(e) => setFood('Come bien')} />
                                <label className="form-check-label" for="flexRadioDefaultfood">
                                    Come bien
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultFood"
                                onChange={(e) => setFood('Come poco')} />
                                <label className="form-check-label" for="flexRadioDefaultFood">
                                    Come poco
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Come" id="flexRadioDefaultc" 
                                onChange={(e) => setFood('No come')} />
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
                                <input className="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep"
                                    onChange={(e) => setSleep('Duerme bien')} />
                                <label className="form-check-label" for="flexRadioDefaultSleep">
                                    Duerme bien
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep"
                                    onChange={(e) => setSleep('Duerme poco')} />
                                <label className="form-check-label" for="flexRadioDefaultSleep">
                                    Duerme poco
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Duerme" id="flexRadioDefaultSleep"
                                    onChange={(e) => setSleep('No duerme')} />
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
                                <input className="form-check-input" type="radio" name="Higiene" id="flexRadioDefaultHygiene"
                                onChange={(e) => setHygiene('Cambio')} />
                                <label className="form-check-label" for="flexRadioDefaultHygiene">
                                    Cambio
                                </label>

                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="" id="flexRadioDefaultHygiene"
                                onChange={(e) => setHygiene('No cambio')} />
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
                        <input type="submit" className="btn btn-primary" value="Enviar" />
                    </div>
                </form>

            </div>

        </div>
    );
}