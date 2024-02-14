import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const StudentsDetails = () => {
	const { store, actions } = useContext(Context);
	// const currentParent = store.currentParent;
	// const params = useParams();
	// const subindice = params.idParent;
	// const person = store.parents[subindice - 1];
	// const ParentsDetails = actions.getParentsDetails();

	useEffect(() => {
		// actions.getCharactersDetails(subindice)
	}, [])

	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title>Estudiante 1</Card.Title>
								<Card.Text>Nombre: </Card.Text>
								<Card.Text>Dirección: </Card.Text>
								<Card.Text>Fecha de Nacimiento: </Card.Text>
								<Card.Text>Padre: </Card.Text>
								<Card.Text>Teléfono Padre: </Card.Text>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<Link to="/studentsadmin">
				<button className="btn ms-5" type="submit" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
		</Container >
	);
};