import PropTypes from "prop-types";
import { useState } from "react";
import { PROP_TYPE } from "../../../../constants";
import { Icon } from "../../../../components";
import { TableRow } from "../table-row/table-row";
import styled from "styled-components";
import { dateFormatting, request } from "../../../../utils";

const UserRowContainer = ({
	className,
	id: userId,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(
			() => {
				setInitialRoleId(newUserRoleId);
			},
		);
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-col">{login}</div>
				<div className="registered-at-col">
					{dateFormatting(registeredAt)}
				</div>
				<div className="role-col">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						classIcon="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(userId, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon
				classIcon="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onUserRemove}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;

	& select {
		font-size: 14px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
