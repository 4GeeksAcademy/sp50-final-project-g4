import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const ProfessorsAdmin = () => {
    const { store, actions } = useContext(Context);
    const professors = store.professors;
    const navigate = useNavigate();


    const handleDetails = (item) => {
        actions.setCurrentProfessor(item);
        navigate(`/professors/${item.id}`);
    }
    const handleEdit = (item) => {
        actions.setCurrentProfessor(item)
        navigate('/formprofessors')
    }


    return (
        <div className="container">

            <h1 className="text-center">Profesores</h1>
            <ListGroup className="container">
                {professors.map((item, index) =>
                    <ListGroup.Item className="list-group-item container-fluid mb-4" key={index}>
                        <Row className="p-1 mb-4">
                            <Col xs={11} md={11} className="mt-2">
                                <h4>{item.name} {item.lastname}</h4>
                                <h5 className="text-secondary mt-3"><i className="fas fa-map-marker-alt me-3"></i>address: {item.address}</h5>
                                <p className="text-secondary my-1"><i className="fas fa-phone me-3"></i>phone: {item.phone}</p>
                            </Col>
                            <Col xs={1} md={1} className="mt-2">
                                <span
                                    className="fas fa-pencil-alt"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(item)}>
                                </span>
                                <div>
                                    <Link
                                        to={`/professors/${item.id}`}
                                        className="btn btn-outline-secondary border-0 mt-5 float-end"
                                        onClick={() => handleDetails(item)}
                                    >
                                        +detalles
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Link to="/homeadmin">
                <button className="btn ms-5" type="button" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
                    Atrás
                </button>
            </Link>
        </div>
    );
}