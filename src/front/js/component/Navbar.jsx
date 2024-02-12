import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.isLogged();
	}, [])

	return (
		<>
					<nav className="container-fluid navbar navbar-light bg-light">
						<div className="container">
							<Link to="/">
								<span className="navbar-brand mb-0 h1">BabySteps</span>
							</Link>
			{
				localStorage.getItem("token")/* actions.isLogged() */ ?

							<div className="ml-auto">
								<Link to="/login">
									<button className="btn btn-primary" style={{ backgroundColor: "#086972" }} onClick={()=>actions.logOut()}>Cerrar Sesión</button>
								</Link>
							</div>
					:
					""
				}
				</div>
			</nav>
		</>
	)
};
