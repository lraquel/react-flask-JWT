import React from 'react'
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";



export const Profile = () => {
    const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getAccount(store.myAccount.id);
  }, [])
    
    return (
  
      <div className="container-xl px-3 px-md-4 ">
            <h2 className="text-decoration-underline  my-3">Mi Perfil</h2>


            <div className="row">
                <div className=" col-md-2">

                    <div className="abs-center panel  d-flex  justify-content-end ">
                        <div className="panel-title">
                              <h3 className="text-title">Usuario: {store.myAccount?.name} {store.myAccount?.lastname}</h3>
                              <h5 className="text-title">Username: {store.myAccount?.username}  </h5>
                              <h5 className="text-title">Email: {store.myAccount?.email} </h5>
              
                        </div>
  
                     </div>
  
                </div>
            </div>

        </div>    

    );
};