import React, { useContext, useState } from "react";
import login from "../../styles/login.css"
//import LogoURL from "../../img/BabySteps.png";
import { Context } from "../store/appContext";


export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        actions.login(email, password)
    };

    return (
        <div className="wrapper">
            <div className="login-box" >
                <div className="login-header" >
                    {/* <img classNameName = "" src={LogoURL}       /> */}
                </div>
                <form onSubmit={e => login(e)}>
                    <div className="input-box">
                        <input type="text" id="user" className="input-field" onChange={e => setEmail(e.target.value)} placeholder="email" required />


                        <i className="bx bx-user icon"></i>
                    </div>
                    <div className="input-box">
                        <input type="password" id="pass" className="input-field" onChange={e => setPassword(e.target.value)} autoComplete="off" placeholder="password" />
                        <i className="bx bx-lock-alt icon" id="show-password">
                        </i>
                    </div>

                    <div className="input-box">
                        <input type="submit" className="input-submit" value="Accede" style={{ backgroundColor: "#086972" }} />
                    </div>

                </form>
            </div>

        </div>
    );
};