import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const StudentsDetails = () => {
	const { store, actions } = useContext(Context);
	const student = store.currentStudent;
	const parents = store.parents
	const groups = store.groups;


	const filterParents = parents.filter(parent => parent.id == student.parent_id)
	const filterGroups = groups.filter(group => group.id == student.group_id)


	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title>Nombre: {student.name} {student.lastname}</Card.Title>
								<Card.Text>Fecha de Nacimiento: {student.date_of_birth.slice(5, 16)} </Card.Text>
								<Card.Text>Padre: {filterParents[0].name} {filterParents[0].lastname}</Card.Text>
								<Card.Text>Teléfono Padre: {filterParents[0].phone}</Card.Text>
								<Card.Text>Grupo: {filterGroups[0].name}</Card.Text>
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