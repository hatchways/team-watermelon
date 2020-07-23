import React, { useContext } from 'react';
import FriendCard from './FriendCard.js';
import AuthContext from '../state_management/AuthContext';

export default function SuggestedFriends(props) {
	const authContext = useContext(AuthContext);

	return (
		<>
			{props.usersData
				.filter((friend) => friend._id !== authContext.id && !authContext.friends_list.includes(friend._id))
				.map((friend) => (
					<FriendCard
						key={friend._id}
						id={friend._id}
						name={friend.name}
						profile_picture={friend.profile_picture}
					/>
				))}
		</>
	);
}
