import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const StudentsDetails = () => {
	const { store, actions } = useContext(Context);
	const student = store.currentStudent;
	const parents = store.parents
    // const simplifiedDate = date.toISOString().slice(0, 10);



	const filterParents = parents.filter(parent => parent.id == student.parent_id)


	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title>Nombre: {student.name} {student.lastname}</Card.Title>
								<Card.Text>Fecha de Nacimiento: {student.date_of_birth.slice(5, 16)} </Card.Text>
								<Card.Text>Padre: {filterParents[0].name}</Card.Text>
								<Card.Text>Teléfono Padre: {filterParents[0].phone}</Card.Text>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<Link to="/students">
				<button className="btn ms-5" type="submit" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
		</Container >
	);
};