import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/test.css'
import { Context } from "../store/appContext";


export const FormGroups = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [ professor, setProfessor] = useState("");
    // const groups = store.groups;
    const professors = store.professors
    // const simplifiedDate = date.toISOString().slice(0, 10);
    const navigate = useNavigate();


    const handleSelectProfessor = (e) => {
        setProfessor(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGroup = {
            name: name,
            professor_id: professor
        };
        actions.createGroup(newGroup);
        console.log('grupo creado: ', newGroup);
        navigate("/homeadmin");

    }

    useEffect(() => {
        if (store.profile.is_admin) {
            actions.getGroups();
            actions.getProfessors();
        }
    }, [])

    return (
        <div className="login-root pb-4">
            <div className="box-root flex-flex flex-direction--column">
                <div className="box-root padding-top--24 flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                        <h1>Formulario Grupos</h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15"><img src="Babysteps.png" className="card-img-top" alt="..." /></span>
                                <form id="stripe-login" onSubmit={handleSubmit}>
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

                                    </div>
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="Grupo">Padre</label>
                                        </div>
                                        <div className="input padding-bottom--15">
                                            <select
                                                className="form-select"
                                                aria-label="select grprofessoroup"
                                                value={professor}
                                                onChange={handleSelectProfessor}
                                                placeholder="Professor"
                                            >
                                                {professors.map(item => (
                                                    <option key={item.id} value={item.id}>{item.name} {item.lastname} </option>
                                                ))}
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