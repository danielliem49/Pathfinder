import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className={"user-icon-container"}>
                <div className="profile-dropdown">
                    <div className="welcome-greeting">Welcome,</div>
                    <div style={{ fontSize: '24px', marginLeft: '6px' }}>{`${user.firstName} ${user.lastName}`}</div>
                    <div style={{ marginLeft: '6px' }}>{user.email}</div>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
                <div className="user-icon">
                </div>
            </div>
        </>
    );
}

export default ProfileButton;