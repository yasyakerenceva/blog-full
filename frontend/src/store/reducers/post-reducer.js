import { ACTION_TYPE } from "../type";

const initialPostState = {
	id: "",
	title: "",
	imageUrl: "",
	content: "",
	publishedAt: "",
	comments: [],
};

export const postReducer = (state = initialPostState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_POST_DATA: {
			return {
				...state,
				...payload,
			};
		}
		case ACTION_TYPE.ADD_COMMENT: {
			return {
				...state,
				comments: [...state.comments, payload],
			};
		}
		case ACTION_TYPE.REMOVE_COMMENT: {
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== payload,
				),
			};
		}
		case ACTION_TYPE.RESET_POST_DATA: {
			return initialPostState;
		}
		default:
			return state;
	}
};
