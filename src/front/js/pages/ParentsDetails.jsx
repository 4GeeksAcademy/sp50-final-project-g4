import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Col, Container, Row } from "react-bootstrap";


export const ParentsDetails = () => {
	const { store, actions } = useContext(Context);
	const students = store.students;
	console.log(students);
	// const parents = store.parents;
	const parent = store.currentParent;
	console.log(parent);
	// const params = useParams();
	// const subindice = params.idParent;
	// const person = store.parents[subindice];
	// const ParentsDetails = actions.getParentsDetails();
	const users = store.users;


	const filterUser = users.filter(user => user.id == parent.user_id)
	const filterStudents = students.filter(student => student.parent_id == parent.id)
	console.log(filterStudents);

	// useEffect(async () => {
	// 	// await actions.getParentsDetails(subindice)
	// }, [])

	return (
		<Container fluid className="w-75">
			<Container className="w-75">
				<Card className="text-light border-0 my-5">
					<Row>
						<Col className="card-parent-details">
							<Card.Body>
								<Card.Title>{parent.name} {parent.lastname}</Card.Title>
								<Card.Text>Email: {filterUser[0].email}</Card.Text>
								<Card.Text>Dirección: {parent.address}</Card.Text>
								<Card.Text>Teléfono: {parent.phone}</Card.Text>

								<Card.Text>Hijos:</Card.Text>
								{!filterStudents ?
									<p>No tiene hijos asignado</p>
									:
									<>
										{
											filterStudents.map((item) =>
												<Card.Text key={item.id}>- {item.name} {item.lastname}</Card.Text>
											)
										}
									</>
								}

							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<Link to="/parents">
				<button className="btn ms-5" type="submit" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
		</Container >
	);
};