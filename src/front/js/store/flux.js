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
            userProfile: {}




        },
        actions: {

            cerrarSesion: (navigate) => {
                setStore({
                    user: {
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
                const { user, token } = getStore();
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


            fetchUsers: () => {
                const { token } = getStore();
                const URL = "http://127.0.0.1:3001/users/list";

                const CONFIG = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    method: "GET",
                }

                fetch(URL, CONFIG)
                    .then((res) => {
                        console.log(res);
                        return res.json();


                    })
                    .then((data) => {
                        console.log(data);
                        setStore({ userProfile: data.result })

                    })
                    .catch(error => console.log(error));

            },



        }




    }
};


export default getState;
