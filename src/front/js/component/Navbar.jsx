import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
		{
			localStorage.getItem("token") ?
		
				<nav className="navbar navbar-light bg-light">
					<div className="container">
						<Link to="/">
							<span className="navbar-brand mb-0 h1">BabySteps</span>
						</Link>
						<div className="ml-auto">
							<Link to="/demo">
								<button className="btn btn-primary" style={{ backgroundColor: "#086972" }}>Cerrar Sesión</button>
							</Link>
						</div>
					</div>
				</nav>
				:
				""
		}
	</>
	)
};