import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { dateFormatting } from "../../../../utils";

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-bottom">
					<h3>{title}</h3>
					<div className="post-card-info">
						<div className="post-card-info-left">
							<Icon
								classIcon="fa-calendar-o"
								margin="0 8px 0 0"
								size="18px"
								inactive={true}
							/>
							{dateFormatting(publishedAt)}
						</div>
						<div className="post-card-info-right">
							<Icon
								classIcon="fa-comment-o"
								margin="0 8px 0 0"
								size="18px"
								inactive={true}
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	border: 1px solid #000;
	margin: 20px;

	& img {
		display: block;
		width: 100%;
	}

	& .post-card-bottom {
		border-top: 1px solid #000;
		padding: 5px 10px 10px;

		& h3 {
			font-size: 16px;
		}
	}

	& .post-card-info {
		margin-top: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& .post-card-info-left,
	& .post-card-info-right {
		display: flex;
		align-items: center;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
