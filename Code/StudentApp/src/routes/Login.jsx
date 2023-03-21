import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// import styles from '@/styles/Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const {login} = useAuthContext(); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    login(username);
    console.log(username);
    navigate('/profile', {replace: true});
    };

  return (
    <div>
      <h1>Login</h1>
      <div >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

