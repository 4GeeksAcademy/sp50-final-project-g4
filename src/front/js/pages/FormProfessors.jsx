import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/test.css'
import { Context } from "../store/appContext";



export const FormProfessors = () => {
    const { store, actions } = useContext(Context);
    const { idProfessor } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [group, setGroup] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (idProfessor && idProfessor !== 'new') {
            const professorToEdit = store.professors.find(professors => professors.id === parseInt(idProfessor));
            if (professorToEdit) {
              setName(professorToEdit.name);
              setLastname(professorToEdit.lastname);
              setAddress(professorToEdit.address);
              setPhone(professorToEdit.phone);
              setGroup(professorToEdit.group);
              setIsAdmin(professorToEdit.isAdmin);
            }
          }
    }, [idProfessor, store.professors])

    const handleSubmit = (e) => {
        e.preventDefault();
        // (alert(("All fields must be filled")));
          const newProfessor = {
            name: name,
            lastname: lastname,
            email: email,
            address: address,
            phone: phone,
            group: group,
            isAdmin: isAdmin
          };
          const editedProfessor = {
            name: name,
            lastname: lastname,
            email: email,
            address: address,
            phone: phone,
            group: group,
            isAdmin: isAdmin
          };
        
        if (idProfessor && idProfessor !== 'new') {
          actions.updateContact(idProfessor, editedProfessor);
    
        } else {
          console.log("Creating new contact");
          actions.createProfessor(newProfessor);
        }
        navigate("/professors");
      };

    const handleReset = () => {
        setName('')
        setLastname('')
        setEmail('')
        setPassword('')
        setPhone('')
        setAddress('')
        setGroup('')
        setIsAdmin('')
    };

    const handleGetBack = () => {
        navigate(-1)
    }


    return (
        <div className="login-root pb-4">
            <div className="box-root flex-flex flex-direction--column">
                <div className="box-root padding-top--24 flex-flex flex-direction--column">
                    <div className="box-root padding-top--48 flex-flex flex-justifyContent--center">
                        <h1>Formulario Profesor</h1>
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
                                                required
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
                                                required
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="fullname row row-cols-1 row-cols-md-2">
                                        <div className="field col">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Correo electrónico"
                                                required
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
                                                required
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
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="fullname row row-cols-1 row-cols-md-2">
                                        <div className="field col">
                                            <div className="grid--50-50">
                                                <label htmlFor="address">Teléfono</label>
                                            </div>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Teléfono"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="field col">
                                            <div className="grid--50-50">
                                                <label htmlFor="address">Grupo</label>
                                            </div>
                                            <div>
                                                <div className="input padding-bottom--15">
                                                    <select
                                                        className="form-select"
                                                        aria-label="select rol"
                                                        required
                                                        value={group}
                                                        onChange={(e) => setGroup(e.target.value)}
                                                        placeholder=""
                                                    >
                                                        <option value="" disabled>Seleccionar Grupo</option>
                                                        <option value="1">Grupo 1</option>
                                                        <option value="2">Grupo 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field-checkbox flex-flex align-center">
                                        <label htmlFor="checkbox">
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                checked={isAdmin}
                                                onChange={(e) => setIsAdmin(e.target.checked)}
                                            />
                                            Es Admin
                                        </label>
                                    </div>
                                    <div className="field padding-top--24">
                                        <input type="submit" name="submit" value="Continue" />
                                    </div>
                                    <div className="field d-flex justify-content-center gap-2">
                                            <button className="btn btn-success input submit" type='reset' style={{ backgroundColor: "#086972" }} onClick={handleReset}>Reset</button>
                                            <button className="btn btn-danger input submit" onClick={handleGetBack}>Atrás</button>
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