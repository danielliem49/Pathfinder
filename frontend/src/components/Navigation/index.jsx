
import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { AboutModalContext } from '../../App';
import { IncompleteModalContext } from '../../App';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const { showAboutModal, setShowAboutModal } = useContext(AboutModalContext)
    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext)

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login"><button className='nav-login-button'>Log In</button></NavLink>
            </>
        );
    }

    return (
        <div className='nav-container'>

            <div className='nav-leftside'>
                <div>
                    <NavLink to="/">
                        <div className='nav-logo'></div>
                    </NavLink>
                </div>

                <div className='nav-leftside-element'>
                    <div>Explore</div>
                </div>

                <div className='nav-leftside-element'>
                    <div onClick={() => setShowIncompleteModal(true)}>Pathfinder+</div>
                </div>
            </div>


            <div className='nav-rightside'>
                <div className='nav-rightside-element'>
                    <div onClick={() => setShowAboutModal(true)}>About</div>
                </div>
                {sessionLinks}
            </div>

        </div>
    );
}

export default Navigation;

