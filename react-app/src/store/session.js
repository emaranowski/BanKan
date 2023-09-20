// constants
// const GET_USER = "session/GET_USER";
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// const getUser = (user) => {
// 	return {
// 		type: GET_USER,
// 		user
// 	}
// };

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

// // THUNK: GET USER
// export const thunkGetUser = (userId) => async (dispatch) => {
// 	// console.log('*** in thunkGetUser, userId:', userId);
// 	const res = await fetch(`/api/auth/${userId}`, { method: "GET" });
// 	// console.log('*** in thunkGetUser, res:', res);

// 	if (res.ok) {
// 		const user = await res.json();
// 		// console.log('*** in thunkGetUser, RES OK user:', user);
// 		dispatch(getUser(user));
// 		return user;
// 	} else {
// 		const errors = await res.json();
// 		// console.log('*** in thunkGetUser, RES NOTOK errors:', errors);
// 		return errors;
// 	}
// };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		// case GET_USER:
		// 	return { user: action.payload };
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
};
