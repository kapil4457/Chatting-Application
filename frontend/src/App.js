import './App.css';
import {Routes , Route} from 'react-router-dom'
import {Button} from '@chakra-ui/react'
import Home from './components/Home';
import ChatPage from './components/ChatPage';
function App() {
  return (
   <div className='App'>
    <Routes >
      <Route path='/' element={<Home/>} />
      <Route path='/chats' element={<ChatPage/>}/>
    </Routes>
   </div>
  );
}

export default App;
