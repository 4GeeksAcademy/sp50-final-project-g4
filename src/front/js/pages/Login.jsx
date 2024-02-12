import React, { useContext, useState, useSyncExternalStore } from "react";
import "../../styles/login.css"
import LogoURL from '../../img/Babysteps.png';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();
        actions.login(email, password)
        if (!store.profile.is_admin == true) {
            navigate('/homeadmin');
        } else if (store.user.is_professor) {
            navigate('/');
        } else {
            navigate('/')
        }
    };

    return (
        <div className="wrapper">
            <div className="login-box" >
                <div className="login-header" >
                    <img className = "" src={LogoURL} />
                </div>
                <form onSubmit={e => login(e)}>
                    <div className="input-box">
                        <input type="text" id="user" className="input-field" onChange={e => setEmail(e.target.value)} placeholder="email" required />


                        <i className="bx bx-user icon"></i>
                    </div>
                    <div className="input-box">
                        <input type="password" id="pass" className="input-field" onChange={e => setPassword(e.target.value)} autoComplete="off" placeholder="password" required />
                        <i className="bx bx-lock-alt icon" id="show-password">
                        </i>
                    </div>

                    <div className="input-box">
                        <input type="submit" className="input-submit" value="Accede" style={{ backgroundColor: "#086972" }} />
                    </div>

                </form>
                <button onClick={()=>navigate("/professors_1")}>professors</button>
            </div>

        </div>
    );
};