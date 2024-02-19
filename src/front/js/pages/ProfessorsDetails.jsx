import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const ProfessorsDetails = () => {
	const { store, actions } = useContext(Context);
	const professor = store.currentProfessor;
	const users = store.users;
	const groups = store.groups;


	const filterUser = users.filter(user => user.id == professor.user_id)
	const filterGroups = groups.filter(group => group.professor_id == professor.id)
	console.log(filterGroups);


	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5 pb-2">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title className="py-2">{professor?.name} {professor?.lastname}</Card.Title>
								<Card.Text>Email: {filterUser[0]?.email}</Card.Text>
								<Card.Text>Dirección: {professor?.address}</Card.Text>
								<Card.Text className="pb-2">Teléfono: {professor?.phone}</Card.Text>
								<Card.Text>Grupo: {filterGroups[0]?.name}</Card.Text>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<Link to='/professors'>
				<button className="btn ms-5" type="submit" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
		</Container >
	);
};