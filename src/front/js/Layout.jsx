import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Import pages or views
import { Home } from "./pages/Home.jsx";
import { Single } from "./pages/Single.jsx";

import { FormParents } from "./pages/FormParents.jsx";
import { HomeAdmin } from "./pages/HomeAdmin.jsx";
import { FormProfessors } from "./pages/FormProfessors.jsx";
import { FormStudents } from "./pages/FormStudents.jsx";
import { ProfessorsAdmin } from "./pages/ProfessorsAdmin.jsx";
import { ParentsAdmin } from "./pages/ParentsAdmin.jsx";
import { ParentsDetails } from "./pages/ParentsDetails.jsx";

// Import components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// import Card from "./component/Card.jsx";
// import { Cards } from "./component/Cards.jsx";
import { Login } from "./pages/Login.jsx";


import { StudentsAdmin } from "./pages/StudentsAdmin.jsx";
import { ProfessorsDetails } from "./pages/ProfessorsDetails.jsx";
import { StudentsDetails } from "./pages/StudentsDetails.jsx";
import {Professors_1} from "./pages/Professors_1.jsx";
import { Parents_1 } from "./pages/Parents_1.jsx";




// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route index element={<Login />} />
                        <Route element={<Login />} path="/login" />
                        <Route element={<HomeAdmin />} path="/homeadmin" />
                        <Route element={<FormParents />} path="/formparents" />
                        <Route element={<FormProfessors />} path="/formprofessors" />
                        <Route element={<FormProfessors />} path="/formprofessors/:idProfessor" />
                        <Route element={<FormStudents />} path="/formstudents" />
                        <Route element={<ProfessorsAdmin />} path="/professors" />
                        <Route element={<ParentsAdmin />} path="/parentsadmin" />
                        <Route element={<StudentsAdmin />} path="/studentsadmin" />
                        <Route element={<ProfessorsDetails />} path="/professors/:idProfessor" />
                        <Route element={<ParentsDetails />} path="/parentsdetails" />
                        <Route element={<StudentsDetails />} path="/studentsdetails" />
                        {/* <Route element={<Profesores />} path="/profesores" /> */}
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                        {/* <Route element={<Cards />} path="/card" /> */}
                        <Route element={<Professors_1 />} path="/professors_1" />
                        <Route element={<Parents_1 />} path="/parents_1" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};


export default injectContext(Layout);
