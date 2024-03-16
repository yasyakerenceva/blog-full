import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../store/selectors";
import { PrivateContent, Title } from "../../components";
import { TableRow, UserRow } from "./components";
import { ROLE } from "../../constants";
import styled from "styled-components";
import { checkAccess, dateFormatting, request } from "../../utils";

const UsersContainer = ({ className }) => {
	const userRole = useSelector(selectUserRole);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request("/users"), request("/users/roles")]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUsers, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`/users/${userId}`, "DELETE").then(() => {
			setShouldUpdateUsers(!shouldUpdateUsers);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<Title mt="60px">Пользователи</Title>
				<div className="table">
					<TableRow>
						<div className="login-col">Логин</div>
						<div className="registered-at-col">
							Дата регистрации
						</div>
						<div className="role-col">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={dateFormatting(registeredAt)}
							roleId={roleId}
							roles={roles.filter(
								({ id }) => Number(id) !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > .table {
		width: 570px;
		margin-top: 30px;
		font-size: 18px;
	}
`;
