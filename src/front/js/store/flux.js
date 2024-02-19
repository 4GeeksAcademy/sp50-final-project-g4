const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAdmin: false,
			isLogged: false,
			isProfessor: false,
			token: "",
			user: {},
			users: [],
			profile: {},
			professors: [],
			currentProfessor: null,
			currentParent: null,
			currentStudent: null,
			currentGroup: null,
			parents: [],
			students: [],
			groups: [],
			notifications: [], // agregar al login y logout
			globalNotifications: [] // agregar al login y logout
			// Falta mas 
		},
		actions: {
			login: async (email, password) => {
				const actions = getActions();
				console.log(email, password);
				const opt = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password }),
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", opt)
					if (!resp.ok) {
						console.log('Error: ', resp.status, resp.statusText)
						return  // TODO: aca hay que enviar un mje de que los datos de acceso son incorrectos
					}
					const data = await resp.json()
					localStorage.setItem('token', data.access_token)
					localStorage.setItem('user', JSON.stringify(data.results.user))
					localStorage.setItem('profile', JSON.stringify(data.results.profile))
					console.log(data)
					setStore({
						isLogged: true,
						isAdmin: false,
						user: data.results.user,
						profile: data.results.profile,
						token: data.access_token,
						isProfessor: data.results.user.is_professor
					});
					if (data.results.profile.is_admin) {
						setStore({
							isAdmin: true,
						})
            			actions.getProfessors()
						actions.getParents()
						actions.getStudents()
						actions.getUsers()
						actions.getGroups()
					}
					if (getStore().profile.isProfessor) {
						setStore({ isProfessor: getStore().profile.is_professor })
						actions.getProfessors()  // CERO SEGURA DE ESTO
					} else {
						console.log("soy un padre")
						console.log(getStore().profile.childs)
						const largo = getStore().profile.childs.length
							console.log(largo)
						for (let i=0; i<largo; i++) {
							
							console.log("algo", getStore().profile.childs[i])
							console.log("soy un hijo")
							
							actions.getNotifications(getStore().profile.childs[i].id)
							//console.log(item,typeof(item))
						}
						
					}
					console.log(getStore().user)
					return data
				} catch (error) {
					console.error(error);
					return false
				}
			},
			isLogged: () => {
				if (localStorage.getItem('token')) {
					setStore({
						isLogged: true,
						user: localStorage.getItem('user'),
						profile: localStorage.getItem('profile')
					})
					setStore({ isProfessor: getStore().user.is_professor })
					if (getStore().profile.is_admin) {
						setStore({ isAdmin: getStore().profile.is_admin })
					}
				}
				else {
					setStore({
						isLogged: false
					})
				}
			},
			logOut: () => {
				setStore({
					isLogged: false,
					user: {},
					profile: {},
					isProfessor: false,
					isAdmin: false
				});
				localStorage.clear();
				console.log(localStorage);
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
			getNotifications: async (idStudent) => {
				const url=process.env.BACKEND_URL + '/api/notifications/parents/' + idStudent
				const opt = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				}
				const response = await fetch(url, opt)
				if (!response.ok) {
					console.log("error:", response.status, response.statusText)
					return
				}
				const data= await response.json()
				console.log(data)
				console.log(JSON.stringify(data))
				setStore({ notifications: [...getStore().notifications, data] })
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
			getProfessors: async () => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/professors';
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log({ 'professors': data.professors });
					setStore({ professors: data.professors });
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getParents: async () => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/parents';
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log({ 'parents': data.parents });
					setStore({ parents: data.parents });
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getStudents: async () => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/students';
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log({ 'students': data.students });
					setStore({ students: data.students });
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getUsers: async () => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/users';
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log({ 'user': data.user });
					setStore({ users: data.user });
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getGroups: async () => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/groups';
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log({ 'groups': data.groups });
					setStore({ groups: data.groups });
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			createProfessor: async (newProfessor, newUser) => {
				const actions = getActions();
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(newUser)
				}
				const urlNewUser = process.env.BACKEND_URL + 'api/users';
				const newUserFetch = await fetch(urlNewUser, opt);
				if (newUserFetch.ok) {
					const newUserData = await newUserFetch.json();
					// actions.getUsers();
					const url = process.env.BACKEND_URL + 'api/professors';
					const dataToSend = {...newProfessor, user_id: newUserData.usuario.id}
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': "Bearer " + localStorage.getItem("token")
						},
						body: JSON.stringify(dataToSend)
					}
					const response = await fetch(url, options);
					if (response.ok) {
						console.log(response);
						const data = await response.json();
						console.log({ "professors": data });
						actions.getProfessors();
						actions.getUsers();
						// setStore({ "professors": [...store.professors, data] })
					} else {
						console.log('Error: ', response.status, response.statusText)
					}
				} else {
					console.log('Error newuser:', newUserFetch.status, newUserFetch.statusText);
				}
			},
			updateProfessor: async (idProfessor, editedProfessor) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/professors/' + idProfessor;
				console.log(editedProfessor);
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(editedProfessor)
				};
				const response = await fetch(url, options);
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					console.log({ "professors": data });
					getActions().getProfessors();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			deleteProfessor: async (id) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/professors/' + id;
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					getActions().getProfessors();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getprofessorDetails: async (id) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/professors/' + id;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json()
					console.log(data);
					setStore({ currentProfessor: data })
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			createParent: async (newParent, newUser) => {
				const actions = getActions();
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(newUser)
				}
				const urlNewUser = process.env.BACKEND_URL + 'api/users';
				const newUserFetch = await fetch(urlNewUser, opt);
				if (newUserFetch.ok) {
					const newUserData = await newUserFetch.json();
					// actions.getUsers();
					const url = process.env.BACKEND_URL + 'api/parents';
					const dataToSend = {...newParent, user_id: newUserData.usuario.id}
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': "Bearer " + localStorage.getItem("token")
						},
						body: JSON.stringify(dataToSend)
					}
					const response = await fetch(url, options);
					if (response.ok) {
						console.log(response);
						const data = await response.json();
						console.log({ "parents": data });
						actions.getParents();
						actions.getUsers();
					} else {
						console.log('Error: ', response.status, response.statusText)
					}
				} else {
					console.log('Error newuser:', newUserFetch.status, newUserFetch.statusText);
				}
			},
			updateParent: async (idParent, editedParent) => {
				const url = process.env.BACKEND_URL + 'api/parents/' + idParent;
				console.log(editedParent);
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(editedParent)
				};
				const response = await fetch(url, options);
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					console.log({ "parents": data });
					getActions().getParents();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			createStudent: async (newStudent) => {
				const actions = getActions();
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(newStudent)
				}
				const url = process.env.BACKEND_URL + 'api/students';
				const response = await fetch(url, opt);
				if (response.ok) {
					console.log(response);
					const data = await response.json();
					console.log({ "students": data.Representate });
					actions.getParents();
					actions.getStudents();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			updateStudent: async (idStudent, editedStudent) => {
				const url = process.env.BACKEND_URL + 'api/students/' + idStudent;
				console.log(editedStudent);
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(editedStudent)
				};
				const response = await fetch(url, options);
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					console.log({ "students": data });
					getActions().getStudents();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			createGroup: async (newGroup) => {
				const actions = getActions();
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(newGroup)
				}
				const url = process.env.BACKEND_URL + 'api/admin/group/create';
				const response = await fetch(url, opt);
				if (response.ok) {
					console.log(response);
					const data = await response.json();
					console.log({ "Groups": data.Grupo });
					actions.getParents();
					actions.getGroups();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			updateGroup: async (idGruop, editedGroup) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/admin/group/assign/' + idGruop;
				console.log(editedGroup);
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token")
					},
					body: JSON.stringify(editedGroup)
				};
				const response = await fetch(url, options);
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					console.log({ "groups": data.groups });
					getActions().getGroups();
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			getParentsDetails: async (id) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + 'api/parents/' + id;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': "Bearer " + localStorage.getItem("token")
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json()
					console.log(data);
					setStore({ currentParent: data })
				} else {
					console.log('Error: ', response.status, response.statusText)
				}
			},
			setCurrentProfessor: (item) => { setStore({ currentProfessor: item }) },
			setCurrentParent: (item) => { setStore({ currentParent: item }) },
			setCurrentStudent: (item) => { setStore({ currentStudent: item }) },
			setCurrentGroup: (item) => { setStore({ currentGroup: item }) }
		}
	};
};


export default getState;