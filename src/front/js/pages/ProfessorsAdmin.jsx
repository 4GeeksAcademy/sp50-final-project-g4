import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router";
import Babysteps from '../../img/Babysteps.png'
import { Link } from "react-router-dom";


export const ProfessorsAdmin = () => {
    const { store, actions } = useContext(Context);
    const professor = store.professors;
    const navigate = useNavigate();

    const handleDeleteContact = (id) => {
        // const updatedContacts = store.contact.filter((item, currentIndex) => {
        //     return currentIndex !== id;
        //     const updatedContacts = store.contact.filter(contact => contact.id !== id);
        // };
        actions.deleteContact(id);
    }

    useEffect(() => {
        actions.getProfessors()
    }, [])

    return (
        <div className="container">

            <h1 className="text-center">Profesores</h1>
            <ListGroup className="container">
                    {store.professors.map((item, index) =>
                        <ListGroup.Item className="list-group-item container-fluid mb-5" key={index}>
                            <Row className="p-1">
                                <Col xs={11} md={11} className="mt-2">
                                    <h4>{item.name} {item.lastname}</h4>
                                    <h5 className="text-secondary mt-3"><i className="fas fa-map-marker-alt me-3"></i>address: {item.address}</h5>
                                    <p className="text-secondary my-1"><i className="fas fa-phone me-3"></i>phone: {item.phone}</p>
                                    <p className="text-secondary"><i className="fas fa-envelope me-3"></i>email: {/* {store.user.email} */}</p>
                                </Col>
                                <Col xs={1} md={1} className="mt-2">
                                    <span
                                        className="fas fa-pencil-alt"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/${item.id}`)}>
                                    </span>
                                    <span
                                        className="fas fa-trash-alt"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteContact(item.id)}>
                                    </span>
                                    <div>
                                        <Link to='/professorsdetails' className="btn btn btn-outline-secondary border-0 mt-5 float-end">
                                            <>+detalles</>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
            </ListGroup>
        </div>
    );
}