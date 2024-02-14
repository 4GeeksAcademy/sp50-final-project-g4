import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const StudentsAdmin = () => {
    const { store, actions } = useContext(Context)
    const students = store.students;
    const navigate = useNavigate();

    const handleDeleteContact = (id) => {
        // const updatedContacts = store.contact.filter((item, currentIndex) => {
        //     return currentIndex !== id;
        //     const updatedContacts = store.contact.filter(contact => contact.id !== id);
        // };
        actions.deleteContact(id);
    }


    return (
        <div className="container">

            <h1 className="text-center">Estudiantes</h1>
            <ListGroup className="container">
                {students.map((item, index) =>
                <ListGroup.Item className="list-group-item container-fluid mb-4" key={index}>
                    <Row className="p-1">
                        <Col xs={11} md={11} className="mt-2">
                            <h4>{item.name} {item.lastname}</h4>
                            <h5 className="text-secondary mt-3"><i className="fas fa-map-marker-alt me-3"></i>{item.date_of_birth}</h5>
                            <p className="text-secondary my-1"><i className="fas fa-phone me-3"></i>{/* {item.parent_id} */}</p>
                            <p className="text-secondary"><i className="fas fa-envelope me-3"></i>{/* {item.group_id} */}</p>
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
                                <Link to='/studentsdetails' className="btn btn btn-outline-secondary border-0 mt-5 float-end">
                                    +detalles
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </ListGroup.Item>
                )}
            </ListGroup>
            <Link to="/homeadmin">
				<button className="btn ms-5" type="submit" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
        </div>
    );
}