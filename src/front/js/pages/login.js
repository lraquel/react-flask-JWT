import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";


export const Login = () => {
    const { store, actions } = useContext(Context);
    return (
        <div>
            <div className="container text-center col-3 mt-5 was-validated">
                <div className="input-group m-3">
                    <span className="input-group-text" id="basic-addon3">Username</span>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        aria-label="username"
                        aria-describedby="basic-addon3"
                        onChange={actions.handleChange}
                        value={store.user.username}
                        required
                    />
                </div>
                <div className=" input-group m-3">
                    <label htmlFor="Password" className="input-group-text">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="Password_login"
                        onChange={actions.handleChange}
                        value={store.user.password}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-secondary" onClick={() => actions.handleUserLogin()}>
                    Ingresar
                </button>
            </div>
        </div>
    );
};

