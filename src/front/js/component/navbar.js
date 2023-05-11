import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';

export const Navbar = ({ user }) => {
	const { actions } = useContext(Context);
	const navigate = useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<span className="navbar-brand mx-2 rounded-circle">
						<Image src="https://img.freepik.com/premium-vector/simple-calligraphy-house-with-heart-real-vector-icon-consept-comfort-protection-architecture_81863-4652.jpg" height="30px" roundedCircle />
					</span>
				</Link>

				<span className="navbar-brand mx-2 rounded-circle">
					{
						user ? (
							<Badge bg="light" text="dark" href="#/action-3"><Link to="/profile" className="nav-link" >Perfil Usuario</Link></Badge>
						) :
							(
								<div></div>
							)}
				</span>

				<DropdownButton id="dropdown-basic-button" variant="outline-warning" className="mx-3" title="Registrarse/Iniciar Sesión">
					<Dropdown.Item href="#/action-1"><Link to="/registre" className="nav-link">Registrarse</Link></Dropdown.Item>
					<Dropdown.Item href="#/action-2"><Link to="/login" className="nav-link" >Iniciar Sesión</Link></Dropdown.Item>

				</DropdownButton>





			</div>
		</nav>
	);
};
