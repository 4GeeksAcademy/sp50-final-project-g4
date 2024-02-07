import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import test from '../../styles/test.css'
import Babysteps from '../../img/Babysteps.png'

    

export const FormParents = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [group, setGroup] = useState("");
    const navigate = useNavigate();


    const handleSelectGruop = (e) => {
        setGroup(e.target.value);
    }


    return (
        <div className="login-root pb-4">
            <div className="box-root flex-flex flex-direction--column">
                <div className="box-root padding-top--24 flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                        <h1>Formulario Padres o Representates</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15"><img src="Babysteps.png" className="card-img-top" alt="..." /></span>
                                <form id="stripe-login">
                                    <div className="row row-cols-1 row-cols-md-2">
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
                                    <div className=" row row-cols-1 row-cols-md-2">
                                        <div className="field col">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="field col">
                                            <div className="grid--50-50">
                                                <label htmlFor="password">Contraseña</label>
                                            </div>
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="address">Dirección</label>
                                        </div>
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Dirección"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="address">Teléfono</label>
                                        </div>
                                        <input
                                            className="input w-50"
                                            type="text"
                                            placeholder="Teléfono"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="field padding-top--24">
                                        <input type="submit" name="submit" value="Continue" />
                                    </div>
                                    <div className="field">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};