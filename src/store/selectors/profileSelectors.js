import { auth } from "../../services/firebase"

export function getPortfolio(state) { if (state.userData[auth.currentUser.uid]) { return state.userData[auth.currentUser.uid].portfolio} else { return {} } };