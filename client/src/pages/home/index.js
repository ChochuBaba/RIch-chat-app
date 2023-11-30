import { Collapse } from 'bootstrap';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Add this

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); // Add this

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      navigate('/chat', { replace: true });
    }
    else 
    {
      console.log('nahi mila daya');
      alert('please enter the input fields');
    }

    // Redirect to /chat
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 >{`<>Weird Whatsapp</>`}</h1>
        <input
          className={styles.input}
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='group 1'>Group 1</option>
          <option value='group 2'>Group 2</option>
          <option value='group 3'>Group 3</option>
          <option value='group 4'>Group 4</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
      
    </div>
  );
};

export default Home;

