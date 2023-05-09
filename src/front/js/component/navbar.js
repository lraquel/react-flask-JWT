import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';

export const Navbar = ({ user }) => {
	const { actions } = useContext(Context);
	const navigate = useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<span className="navbar-brand mx-2 rounded-circle">
						<Image src="https://img.freepik.com/premium-vector/welcome-home-lettering-with-cute-house-hand-drawn-trendy-vector-illustration-with-colored-houses_479163-26.jpg?size=626&amp;ext=jpg" height="60px" roundedCircle />
					</span>
				</Link>


				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Dropdown button
					</button>
					<ul class="dropdown-menu">
						<li><Link to="/registre" className="nav-link">Register</Link></li>
						<li><Link to="/login" className="nav-link" >Login</Link></li>
						{
							user ? (
								<li className="nav-item">
									<Link to="/profile" className="nav-link" >Profile</Link>
								</li>

							) :
								(
									<div></div>
								)}
						{
							user ? (
								<button className="btn btn-outline-danger me-md-2" onClick={e => actions.cerrarSesion(navigate)}>cerrar sesión</button>
							) : (
								<div></div>
							)
						}
					</ul>
				</div>


			</div>
		</nav>
	);
};
