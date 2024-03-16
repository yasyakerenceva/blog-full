import { ACTION_TYPE } from "../type";
import { request } from "../../utils";

export const logout = () => {
	request("/logout", "POST");
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
