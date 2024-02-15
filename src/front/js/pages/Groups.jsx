import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Groups = () => {
    const { store, actions } = useContext(Context);
    const professors = store.professors;
    const groups = store.groups;
    const navigate = useNavigate();


    const filterProfessor = professors.filter(professor => professor.id == groups.profesor_id)


    const handleGetBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (store.profile.is_admin) {
            actions.getGroups();
            actions.getProfessors();
            actions.getStudents();
        }
    }, [])


    return (
        <div className='containter-fluid'>
            <div className='my-5 d-flex justify-content-center align-items-center'>
                <div className="" style={{ width: "18rem" }}>
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3>Grupos</h3>
                    </div>
                    <ul className="list-group list-group-flush" >
                        {groups.map((item, index) =>
                            <li className="list-group-item" key={index} style={{ height: "41px" }}>{item.name} {/* - {filterProfessor[0].name} {filterProfessor[0].lastname} */}</li>
                        )}
                    </ul>
                </div>
            </div>
            <Link to="/homeadmin" className="btn d-flex justify-content-center align-items-center">
				<button className="btn" type="button" style={{ marginBottom: "68px", backgroundColor: "#0fc1d1" }} role="button">
					Atrás
				</button>
			</Link>
        </div>
    );
};

