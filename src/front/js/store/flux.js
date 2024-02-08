const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAdmin: false,
			isLogged: false,
			token: "",
			user: {},
			profile: {},
			professors: {},
			parents: {},
			students: {},
			isProfessor: false,
			parents: {}, // agregar al login y logout
			notifications: {}, // agregar al login y logout
			globalNotifications: {} // agregar al login y logout
			// Falta mas 
		},
		actions: { 
			login: async (email, password) => {
				console.log(email, password);
				const opt = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password }),
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", opt)
					const data = await resp.json()
					console.log(data)
					setStore({ 
						isLogged: true,
						user: data.results.user,
						profile: data.results.profile,
						token: data.access_token,
						isProfessor: data.results.user.is_professor
					});
					if (data.results.profile.is_admin) {
						setStore({
							isAdmin: data.results.profile.is_admin,
						})
					}
					localStorage.setItem('token', data.access_token) 
					localStorage.setItem('user', JSON.stringify(data.results.user)) 
					localStorage.setItem('profile', JSON.stringify(data.results.profile)) 
					return data
				} catch (error) {
					console.error(error);
					return false
				}
			},
			isLogged: () => {
				if(localStorage.getItem('token')){
					setStore({
						isLogged: true,
						user: localStorage.getItem('user'),
						profile: localStorage.getItem('profile')
					})
					setStore({isProfessor: getStore().user.is_professor})
					if (getStore().profile.is_admin) {
						setStore({isAdmin: getStore().profile.is_admin})
					}
				}
				else {
					setStore({
						isLogged: false
					})
				}
			},
			logout: () => {
				setStore({
					isLogged: false,
					user: {},
					profile: {},
					isProfessor: false,
					isAdmin: false
				});
				localStorage.clear();
			},
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");  // Use getActions() to call a function within a fuction
			// },
			// getMessage: async () => {
			// 	try {
			// 		// Fetching data from the backend
			// 		const response = await fetch(process.env.BACKEND_URL + "api/hello")
			// 		const data = await response.json()
			// 		setStore({message: data.message})
			// 		return data;  // Don't forget to return something, that is how the async resolves
			// 	} catch(error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	const store = getStore();  // Get the store
			// 	// We have to loop the entire demo array to look for the respective index and change its color
			// 	const demo = store.demo.map((element, i) => {
			// 		if (i === index) element.background = color;
			// 		return element;
			// 	});
			// 	setStore({demo: demo});  // Reset the global store
			// }
		}
	};
};


export default getState;