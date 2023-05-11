import React from "react";
import Image from 'react-bootstrap/Image';
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="container-fluid ">

			<div className="area">
				<div className="d-flex justify-content-center  ">
					<div className="d-flex p-2 align-items-center mt-5">
						<span className="navbar-brand mx-2 rounded-circle">
							<Image src="https://img.freepik.com/premium-vector/welcome-home-lettering-with-cute-house-hand-drawn-trendy-vector-illustration-with-colored-houses_479163-26.jpg?size=626&amp;ext=jpg" height="400px" roundedCircle />
						</span>
					</div>
				</div>


			</div>


		</div>

	);
};
