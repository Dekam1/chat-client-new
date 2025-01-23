export default function MessageItem({ text, currentUser }) {
	return (
		<li className={currentUser ? 'messages__item messages__item_outgoing' : 'messages__item messages__item_incoming'}>
			<span>{text}</span>
		</li>
	);
};