const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
					console.log(getStore().user)

					localStorage.setItem('token', data.access_token)
					localStorage.setItem('user', JSON.stringify(data.results.user))
					localStorage.setItem('profile', JSON.stringify(data.results.profile))
					return data
				} catch (error) {
					console.error(error);
					return false
				}
			},
			getAllStudents: async () => {
				const opt = {
					headers: {
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/students/list", opt)
					const data = await resp.json()
					console.log(data)

				} catch (error) {
					console.error("error-----> ", error)
				}

			},
			getGroupAndStudentsByProfessor: async () => {
				const opt = {
					headers: {
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				}
				try {
					const respGroup_by_Professor = await fetch(process.env.BACKEND_URL + "/api/group_by_professor", opt)
					const dataGroup_by_Professor = await respGroup_by_Professor.json()
					console.log("dataGroup", dataGroup_by_Professor)
					await setStore({
						professorGroups: dataGroup_by_Professor.data[0]
					})
					if (dataGroup_by_Professor.data[0] && dataGroup_by_Professor.data[0].id) {

						const respStudentsByGroup = await fetch(process.env.BACKEND_URL + `/api/student_by_group/${dataGroup_by_Professor.data[0].id}`, opt)
						const dataStudentsByGroup = await respStudentsByGroup.json()
						console.log("dataStudent", dataStudentsByGroup)
						await setStore({
							studentInGroup: dataStudentsByGroup.data
						})
					}
				} catch (error) {
					console.log("error-----> ", error)
				}
			},
			getStudentsByGroup: async () => {
				const opt = {
					headers: {
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				}
				try {
					console.log(getStore().professorGroups)
					const resp = await fetch(process.env.BACKEND_URL + `/api/group_by_professor/${getStore().professorGroups.id}`, opt)
					const data = await resp.json()
					console.log(data)
					await setStore({
						professorGroups: data.data
					})
				} catch (error) {
					console.error("error-----> ", error)
				}

			},

			newNotification: async (sleep, food, hygiene, notif, student) => {
				const opt = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify({
						date: new Date().toISOString(),
						eat: food,
						sleep: sleep,
						poop: !hygiene.includes("No"),
						notes: notif,
						student_id: student
					})
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/notifications`, opt)
					const data = await resp.json()
					console.log(data)

				} catch (error) {
					console.log("error-----> ", error)

				}
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");  // Use getActions() to call a function within a fuction
			},
			getMessage: async () => {
				try {
					// Fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await response.json()
					setStore({ message: data.message })
					return data;  // Don't forget to return something, that is how the async resolves
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();  // Get the store
				// We have to loop the entire demo array to look for the respective index and change its color
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({ demo: demo });  // Reset the global store
			}
		}
	};
};


export default getState;