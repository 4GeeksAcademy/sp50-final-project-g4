import React, { useContext } from "react";
import { Context } from "../store/appContext";


export default function Error404() {
	const { store, actions } = useContext(Context);

	return (
    <section id='hero' className="p-5">
      <div className="d-flex align-items-center container" style={{ minHeight:"60vh", background:"url(../../bghero.png)", backgroundSize: "auto 100%", backgroundPosition: "right", backgroundRepeat: "no-repeat",}}>
        
        <div className="">
          <h1 className=" text-black-50 fw-light mb-4" style={{fontSize:"4rem"}}>
            Error 404 <span className="fw-bold" style={{color:"#053d42"}}>Page NOT FOUND</span>
          </h1>
          <h4 className="text-black-50 fs-5" style={{color:"#0b95a2"}}> Regrese al Inicio</h4>
        </div>

      </div>
    </section>
	);
};