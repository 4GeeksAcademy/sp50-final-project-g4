import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import test from '../../styles/test.css'



export const FormStudents = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [group, setGroup] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleSelectGruop = (e) => {
        setGroup(e.target.value);
    }


    return (
        <div className="login-root pb-4">
            <div className="box-root flex-flex flex-direction--column">
                <div className="box-root padding-top--24 flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                        <h1>Formulario Estudiante</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15"><img src="Babysteps.png" className="card-img-top" alt="..." /></span>
                                <form id="stripe-login">
                                    <div className="fullname row row-cols-1 row-cols-md-2">
                                        <div className="field col">
                                            <label htmlFor="name">Nombre</label>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Nombre"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="field col">
                                            <label htmlFor="lastname">Apellidos</label>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Apellidos"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="address">Fecha de Nacimiento</label>
                                        </div>
                                        <input
                                            className="input"
                                            type="date"
                                            placeholder="Fecha de nacimiento"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="Grupo">Grupo</label>
                                        </div>
                                        <div className="input padding-bottom--15">
                                            <select
                                                className="form-select"
                                                aria-label="select rol"
                                                value={group}
                                                onChange={handleSelectGruop}
                                                placeholder="Dirección"
                                            >
                                                <option value="" disabled>Seleccionar Grupo</option>
                                                <option value="1">Grupo 1</option>
                                                <option value="2">Grupo 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="field padding-top--24">
                                        <input type="submit" name="submit" value="Continue" />
                                    </div>
                                    <div className="field">
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <div className="listing padding-top--24 flex-flex center-center">
                                <span><a href="#"></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};