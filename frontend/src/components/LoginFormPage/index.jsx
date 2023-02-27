import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        <div class="container">
            <form class="form" onSubmit={handleSubmit}>
                <div class="form-header">
                    <h1>Welcome back.</h1>
                    <p>Log in and start exploring.</p>
                </div>
                <ul class="errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div class="form-group">
                    <button type="submit">Log In</button>
                    <button type="submit" onClick={handleDemoLogin}>Demo Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormPage;