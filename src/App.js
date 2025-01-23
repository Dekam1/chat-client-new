import React from 'react';
import { nanoid } from 'nanoid'
import { Routes, Route } from 'react-router-dom';
import Main from "./components/Main";
import Chat from './components/Chat';

function App() {
	React.useEffect(() => {
		localStorage.getItem('userId') || localStorage.setItem('userId', nanoid())
	}, [])

	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/chat/:roomId' element={<Chat />} />
		</Routes>
	);
}

export default App;
