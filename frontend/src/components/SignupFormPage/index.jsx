import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ first_name, last_name, email, password }))
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
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <div className="signup-body">
                <div className="signup-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-form-header">
                            <h1>Sign up today. </h1>
                            <h1>And start your next adventure.</h1>
                        </div>
                        <ul className="signup-errors">
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>

                        <div className='signup-form-input-group'>
                            <input className="signup-inputs" type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required />
                            <span className="signup-input-labels">First Name</span>
                        </div>

                        <div className='signup-form-input-group'>
                            <input className="signup-inputs" type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} required />
                            <span className="signup-input-labels">Last Name</span>
                        </div>

                        <div className='signup-form-input-group'>
                            <input className="signup-inputs" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <span className="signup-input-labels">Email</span>
                        </div>

                        <div className='signup-form-input-group'>
                            <input className="signup-inputs" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <span className="signup-input-labels">Password</span>
                        </div>

                        <div className='signup-form-input-group'>
                            <input className="signup-inputs" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <span className="signup-input-labels">Confirm Password</span>
                        </div>

                        <div className="icon"></div>

                        <button className="type1-button" type="submit">Create a free account</button>
                    </form>

                    <div className="signup-login-link-group">
                        <span>Already have an account? </span>
                        <NavLink to="/login" className="signup-login-link">Log in</NavLink>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SignupFormPage;