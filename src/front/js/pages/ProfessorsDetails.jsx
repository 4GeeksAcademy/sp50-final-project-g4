import React, { useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const ProfessorsDetails = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const currentProfessor = store.currentProfessor;
	const params = useParams();
	const subindice = params.idProfessor;
	const professor = store.professors[subindice];

	
	
	useEffect(() => {
			actions.getprofessorDetails(subindice);
	}, [])

	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title>{currentProfessor?.name} {currentProfessor?.lastname}</Card.Title>
								<Card.Text>Email:</Card.Text>
								<Card.Text>Dirección: {currentProfessor?.address}</Card.Text>
								<Card.Text>Teléfono: {currentProfessor?.phone}</Card.Text>
								<Card.Text>Hijos:</Card.Text>
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