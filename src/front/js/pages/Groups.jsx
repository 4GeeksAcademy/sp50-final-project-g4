import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Groups = () => {
    const { store, actions } = useContext(Context);
    const professors = store.professors;
    const groups = store.groups;


    const filterProfessor = professors.filter(professor => professor.id == groups.profesor_id)


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
        </div>
    );
};

