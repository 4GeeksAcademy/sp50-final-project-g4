import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/test.css'
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const HomeAdmin = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const person = store.profile;


    const handleClick = () => {
        actions.setCurrentParent();
        actions.setCurrentProfessor();
        actions.setCurrentStudent();
    }

    const handleClickToProfessors = () => {
        navigate('/professors')
    }
    const handleClickToParents = () => {
        navigate('/parents')
    }
    const handleClickToStudents = () => {
        navigate('/students')
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
                                    <div className="cards-admin text-center pt-4">
                                        <span onClick={handleClickToProfessors} style={{ cursor: "pointer" }}>
                                            <h3>Profesores</h3>
                                            <div className="card-body content">
                                                <span className="fa-10x"><FontAwesomeIcon className="icon" icon="fa-solid fa-chalkboard-user" /></span>
                                            </div>
                                        </span>
                                        <div className="card-footer">
                                            <Link to='/formprofessors' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                +Profesor
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="cards-admin text-center pt-4">
                                        <span onClick={handleClickToParents} style={{ cursor: "pointer" }}>
                                            <h3>Padres</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-users" /></span>
                                            </div>
                                        </span>
                                        <div className="card-footer">
                                            <Link to='/formparents' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                +Padre
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="cards-admin text-center pt-4">
                                        <span onClick={handleClickToStudents} style={{ cursor: "pointer" }}>
                                            <h3>Estudiantes</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-children" /></span>
                                            </div>
                                        </span>
                                        <div className="card-footer">
                                            <Link to='/formstudents' className="btn btn-outline-secondary border-0" onClick={handleClick}>
                                                +Estudiantes
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link to='/groups' style={{ cursor: "pointer" }}>
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