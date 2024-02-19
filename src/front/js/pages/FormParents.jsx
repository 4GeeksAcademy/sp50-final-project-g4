import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/test.css'
import '../../img/Babysteps.png'
import { Context } from "../store/appContext";


export const FormParents = () => {
    const { store, actions } = useContext(Context);
    const [idParent, setIdParent] = useState('new');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const parentToEdit = store.currentParent;
        if (parentToEdit) {
            setIdParent(parentToEdit.id);
            setName(parentToEdit.name);
            setLastname(parentToEdit.lastname);
            setAddress(parentToEdit.address);
            setPhone(parentToEdit.phone);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            is_professor: false
        }
        const newParent = {
            name: name,
            lastname: lastname,
            address: address,
            phone: phone,
            is_admin: false
        };
        const editedParent = {
            name: name,
            lastname: lastname,
            address: address,
            phone: phone,
            is_admin: false
        };

        if (idParent && idParent !== 'new') {
            actions.updateParent(idParent, editedParent);
        } else {
            console.log("Creating new Parent");
            actions.createParent(newParent, newUser);
        }
        navigate("/parents");
    };

    const handleReset = () => {
        setName('')
        setLastname('')
        setEmail('')
        setPassword('')
        setPhone('')
        setAddress('')
        actions.setCurrentParent();
    };

    const handleGetBack = () => {
        handleReset()
        navigate(-1)
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
                                <form id="stripe-login" onSubmit={handleSubmit}>
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
                                    {idParent == 'new' ?
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
                                        :
                                        ""
                                    }
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
                                    <div className="field d-flex justify-content-center gap-2">
                                        <button
                                            className="btn btn-success input"
                                            type='reset' style={{ backgroundColor: "#086972" }}
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                        <button className="btn btn-danger input" type="button" onClick={handleGetBack}>Cancel</button>
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