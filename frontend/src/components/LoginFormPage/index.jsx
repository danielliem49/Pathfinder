import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import logo from '../../assets/pathfinder-icon.png'
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const handleDemoLogin = () => {
        setCredential('demo@user.io');
        setPassword('password');
    }

    return (
        <>
            <div className="login-body">
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form-header">
                            <h1>Welcome back.</h1>
                            <h1>Log in and start exploring.</h1>
                        </div>


                        <ul className="login-errors">
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>

                        <div className='login-form-input-group'>
                            <input className="login-inputs" type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required />
                            <span className="login-input-labels">Email Address</span>
                        </div>

                        <div className='login-form-input-group'>
                            <input className="login-inputs" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <span className="login-input-labels">Password</span>
                        </div>

                        <img class="icon" src={logo} width="100" height="100" alt="Pathfinder Icon"></img>

                        <button className="type1-button" type="submit">Log In</button>
                            <hr />
                        <button className="type1-button" type="submit" onClick={handleDemoLogin}>Demo Log In</button>
                    </form>

                    <div className="login-signup-link-group">
                        <span>Don't have an account? </span>
                        <NavLink to="/signup" className="login-signup-link">Sign Up for free</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginFormPage;