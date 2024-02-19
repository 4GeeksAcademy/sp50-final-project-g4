import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Groups = () => {
    const { store, actions } = useContext(Context);
    const groups = store.groups;
    const navigate = useNavigate();


    const handleGetBack = () => {
        navigate(-1)
    }

    const handleEdit = (item) => {
        actions.setCurrentGroup(item)
        navigate('/editgroup')
    }


    return (
        <div className='containter-fluid'>
            <div className='my-5 d-flex justify-content-center align-items-center'>
                <div className="" style={{ width: "18rem" }}>
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3>Grupos</h3>
                    </div>
                    <ul className="list-group list-group-flush" >
                        {groups.map((item, index) =>
                            <li className="list-group-item d-flex justify-content-between" key={index} style={{ height: "41px" }}>
                                {item.name}
                                {/* <span
                                    className="fas fa-pencil-alt"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(item)}>
                                </span> */}
                            </li>
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

