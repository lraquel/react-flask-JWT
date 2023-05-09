const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {
                name: "",
                lastname: "",
                username: "",
                email: "",
                password: ""
            },

			token: "",
			myAccount: {
                id: ""
            },




		},
		actions: {
		
			cerrarSesion: (navigate) => {
                setStore({user: {
                    name: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: ""
                }, 
                token: "",
            
            })
            navigate("/")
            },

			handleChange: (e) => {
                let { user } = getStore();

                const {
                    target: { value, name },
                } = e;
                setStore({
                    user: {
                        ...user,
                        [name]: value,
                    },
                });
            },
            handleUserRegister: () => {
                const { user } = getStore();
                fetch("http://127.0.0.1:3001/users", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                    .then(res => res.json())
                    .then(data => {
                        alert("Usuario Creado Satisfactoriamente");
                        setStore({
                            user: {
                                name: "",
                                lastname: "",
                                username: "",
                                email: "",
                                password: ""
                            },
                        });
                        console.log(data);
                    })
                    .catch(error => {
                        alert("Ocurrio un error al registrar al Usuario" + error.message);
                        console.log(error)
                    });
            },
            handleUserLogin: (e) => {
                const { user, token, myAccount } = getStore();
                fetch("http://127.0.0.1:3001/login", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user),
                })
                    .then(res => res.json())
                    .then((data) => {
                        setStore({
                            token: data.token,
                            myAccount: {
                                ...myAccount,
                                id: data.id
                            }
                        })
                        console.log(data)
                        console.log(getStore());
                    })
                    .catch(error => console.log(error));
                setStore({
                    user: {
                        username: "",
                        password: ""
                    },
                });
            },

			getAccount: (id) => {

                fetch("http://localhost:5000/users/" + id, {
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "GET",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setStore({ myAccount: data })

                    })
                    .catch(error => console.log(error));

            },





		}
	};
};

export default getState;
