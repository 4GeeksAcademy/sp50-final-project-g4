import React, { useContext, useState } from "react";
import login from "../../styles/login.css"
//import LogoURL from "../../img/BabySteps.png";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();
        actions.login(email, password)
    };

    return (
        <div class="wrapper">
            <div class="login-box" >
                <div class="login-header" >
                    {/* <img className = "" src={LogoURL}       /> */}
                </div>
                <form onSubmit={e => login(e)}>
                    <div class="input-box">
                        <input type="text" id="user" class="input-field" onChange={e => setEmail(e.target.value)} placeholder="email" required />


                        <i class="bx bx-user icon"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" id="pass" class="input-field" onChange={e => setPassword(e.target.value)} autocomplete="off" placeholder="password" />
                        <i class="bx bx-lock-alt icon" id="show-password">
                        </i>
                    </div>

                    <div class="input-box">
                        <input type="submit" class="input-submit" value="Accede" style={{ backgroundColor: "#086972" }} />
                    </div>

                </form>
                <button onClick={()=>navigate("/professors_1")}>professors</button>
            </div>

        </div>
    );
};