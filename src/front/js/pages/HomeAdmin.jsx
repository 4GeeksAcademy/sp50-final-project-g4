import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import test from '../../styles/test.css'
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa } from '@fortawesome/free-solid-svg-icons';


export const HomeAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [group, setGroup] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    const handleSelectGruop = (e) => {
        setGroup(e.target.value);
    }

    const handleClickProfessor = () => {
        useNavigate('/professors');
    }

    return (
        <div>
            <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                <h1>Bienvenido "store.user.name"</h1>
            </div>
            <div className="formbg-inner padding-horizontal--48">
                <form id="stripe-login">
                    <div className="field">
                        <div className="container-fluid text-center">
                            <div className="row g-5 h6">
                                <div className="col">
                                    <Link to='/professorsadmin'>
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Profesores</h3>
                                            <div className="card-body content">
                                                <span className="fa-10x"><FontAwesomeIcon className="icon" icon="fa-solid fa-chalkboard-user" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/formprofessors' className="btn btn-outline-secondary border-0">
                                                    +Profesor
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to='/parentsadmin'>
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Padres</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-users" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/formparents' className="btn btn-outline-secondary border-0">
                                                    +Padre
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to='/studentsadmin'>
                                        <div className="cards-admin text-center pt-4">
                                            <h3>Estudiantes</h3>
                                            <div className="card-body">
                                                <span className="fa-10x"><FontAwesomeIcon icon="fa fa-children" /></span>
                                            </div>
                                            <div className="card-footer">
                                                <Link to='/students' className="btn btn-outline-secondary border-0">
                                                    Estudiantes
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};