import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push(`/`)
    };

    return (
        <>
            <div className="user-icon-container" onMouseLeave={handleMouseLeave}>
                <div className="user-icon" onMouseEnter={handleMouseEnter}>
                </div>
                <div className={isHovering ? "profile-dropdown" : "profile-dropdown disabled"}>
                    <div className="welcome-greeting">Welcome,</div>
                    <div style={{ fontSize: '24px', marginLeft: '6px' }}>{`${user.firstName} ${user.lastName}`}</div>
                    <div style={{ marginLeft: '6px' }}>{user.email}</div>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
            </div>
        </>
    );
}

export default ProfileButton;