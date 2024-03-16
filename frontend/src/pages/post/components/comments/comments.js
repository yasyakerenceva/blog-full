import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../../store/selectors";
import { addCommentAsync } from "../../../../store/actions";
import { PROP_TYPE, ROLE } from "../../../../constants";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import styled from "styled-components";
import { dateFormatting } from "../../../../utils";

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState("");
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		if (!content) return;

		dispatch(addCommentAsync(postId, content));
		setNewComment("");
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						onChange={({ target }) => setNewComment(target.value)}
						placeholder="Комментарий..."
					></textarea>
					<Icon
						classIcon="fa-paper-plane-o"
						margin="10px 0 0 5px"
						size="20px"
						onClick={() => {
							onNewCommentAdd(postId, newComment);
						}}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={dateFormatting(publishedAt)}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	margin-top: 25px;
	width: 580px;

	& .new-comment {
		display: flex;
		align-items: flex-start;
		height: 120px;

		& textarea {
			font-size: 16px;
			width: calc(100% - 25px);
			height: 100%;
			resize: none;
		}
	}

	& .comments {
		width: 100%;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
