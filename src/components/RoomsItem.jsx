export default function RoomsItem({ room, roomId, handleSelect, activeRoom }) {

	const addActiveClass = () => {
		return roomId === activeRoom
			? 'rooms__item rooms__item_active'
			: 'rooms__item'
	}

	return (
		<li onClick={() => handleSelect(roomId)} className={addActiveClass()}>{room}</li>
	);
};