import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import test from '../../styles/test.css'
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa } from '@fortawesome/free-solid-svg-icons';
import { ProfessorsAdmin } from "./ProfessorsAdmin.jsx";
import { ParentsAdmin } from "./ParentsAdmin.jsx";
import { StudentsAdmin } from "./StudentsAdmin.jsx";


export const HomeAdmin = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const person = store.profile;


    // useEffect(() => {
    //     if (store.profile.is_admin) {
    //         actions.getProfessors()
    //         actions.getParents()
    //         actions.getStudents()
    //     }
    // }, [])

    const handleClick = () => {
        actions.setCurrentParent();
        actions.setCurrentProfessor();
        actions.setCurrentStudent();
    }

    return (
        <div>
            <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                <h1>Bienvenido {person.name}</h1>
            </div>
            <div className="formbg-inner padding-horizontal--48">
                <form id="stripe-login">
                    <div className="field">
                        <div className="container-fluid text-center">
                            <div className="row g-5 h6 mb-4">
                                <div className="col">
                                    <Link to='/professors'>
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Profesores</h3>
                                            <div className="card-body content">
                                                <span className="fa-10x"><FontAwesomeIcon className="icon" icon="fa-solid fa-chalkboard-user" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/formprofessors' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                    +Profesor
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to='/parents'>
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Padres</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-users" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/formparents' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                    +Padre
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="/students">
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Estudiantes</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-children" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/formstudents' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                    +Estudiantes {/* {store.students && `${store.students.length}` */}
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <Link to='/groups'>
                                <div className="cards-admin d-flex text-center mt-2" style={{ width: "14rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Grupos</h5>
                                        <Link to='/formgroups' className="btn btn-outline-secondary border-0">Crear grupo</Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};