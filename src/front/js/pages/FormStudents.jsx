import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../img/Babysteps.png'
import '../../styles/test.css'
import { Context } from "../store/appContext";


export const FormStudents = () => {
    const { store, actions } = useContext(Context);
    const [idStudent, setIdStudent] = useState('new');
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [group, setGroup] = useState("");
    const [parent, setParent] = useState("");
    const groups = store.groups;
    const parents = store.parents
    const navigate = useNavigate();


    useEffect(() => {
        const StudentToEdit = store.currentStudent;
        if (StudentToEdit) {
            setIdStudent(StudentToEdit.id);
            setName(StudentToEdit.name);
            setLastname(StudentToEdit.lastname);
            setGroup(StudentToEdit.group);
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            name: name,
            lastname: lastname,
            date_of_birth: dateOfBirth,
            parent_id: parent,
            group_id: group
        };
        const editedStudent = {
            name: name,
            lastname: lastname,
            date_of_birth: store.currentStudent.date_of_birth,
            parent_id: store.currentStudent.parent_id,
            group_id: group
        };
        if (idStudent && idStudent !== 'new') {
            actions.updateStudent(idStudent, editedStudent);
        } else {
            console.log("Creating new Student");
            actions.createStudent(newStudent);
        }
        navigate("/students");
    };

    const handleSelectGroup = (e) => {
        setGroup(e.target.value);
    };
    const handleSelectParent = (e) => {
        setParent(e.target.value);
    };

    const handleReset = () => {
        setName('')
        setLastname('')
        setDateOfBirth('')
        setGroup('')
        setParent('')
        actions.setCurrentStudent();
    };

    const handleGetBack = () => {
        handleReset();
        navigate(-1);
    };


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
                                    {idStudent == 'new' ?
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
                                        :
                                        ""
                                    }
                                    {idStudent == 'new' ?
                                        <div className="field">
                                            <div className="grid--50-50">
                                                <label htmlFor="Grupo">Padre</label>
                                            </div>
                                            <div className="input padding-bottom--15">
                                                <select
                                                    className="form-select"
                                                    aria-label="select parent"
                                                    value={parent}
                                                    onChange={handleSelectParent}
                                                    defaultValue="Seleccionar Padre"
                                                    placeholder="Padre"
                                                >
                                                    <option value="" selected disabled hidden>Seleccionar Padre</option>
                                                    {parents.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name} {item.lastname}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                    <div className="field">
                                        <div className="grid--50-50">
                                            <label htmlFor="Grupo">grupo</label>
                                        </div>
                                        <div className="input padding-bottom--15">
                                            <select
                                                className="form-select"
                                                aria-label="select group"
                                                value={group}
                                                onChange={handleSelectGroup}
                                            >
                                                <option value="" disabled hidden>Seleccionar Grupo</option>
                                                {groups.map(item => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="field padding-top--24">
                                        <input type="submit" name="submit" value="Continue" />
                                    </div>
                                    <div className="field">
                                    </div>
                                    <div className="field d-flex justify-content-center gap-2">
                                        <button
                                            className="btn btn-success input submit"
                                            type='reset' style={{ backgroundColor: "#086972" }}
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                        <button className="btn btn-danger input submit" type="button" onClick={handleGetBack}>Cancel</button>
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