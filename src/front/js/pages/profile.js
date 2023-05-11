import React from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";




export const Profile = () => {
  const { store, actions } = useContext(Context);
  const usuario = store.userProfile;
  const navigate = useNavigate()
  useEffect(() => {
    actions.fetchUsers();
  }, []
  )

  return (

    <div className="container">
      <div className="d-flex justify-content-end mt-5" >
        {
          store.userProfile ? (
            <button className="btn btn-outline-danger rounded-pill btn-sm me-md-2" onClick={e => actions.cerrarSesion(navigate)}>cerrar sesión</button>
          ) : (
            <div></div>
          )
        }
      </div>
      <div className="row d-flex justify-content-center gap-3">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card bg-light" style={{ minWidth: "400px" }}>
            <h2 className=" text-center bg-light">Mi Perfil</h2>
            <img className="card-img-top" src="https://img.freepik.com/premium-vector/abstract-hexagon-technology-background-cyber-security-concept_35029-652.jpg?size=626&amp;ext=jpg&amp;ga=GA1.2.1832030905.1683567945&amp;semt=sph" alt="character" />
            <div className="card-body">
              <h2 className="card-title">Nombre y Apellido: </h2>
              <h5 className="card-text">{usuario?.name} {usuario?.lastname}</h5>
              <h5 className="card-text">Username: {usuario?.username}</h5>
              <h5 className="card-text">Emai: {usuario?.email}</h5>

            </div>
          </div>
        </div>

      </div>
    </div>

  );
};