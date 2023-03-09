
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

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
                    <div>Shop</div>
                </div>
            </div>


            <div className='nav-rightside'>
                <div className='nav-rightside-element'>
                    <div>Help</div>
                </div>
                {sessionLinks}
            </div>

        </div>
    );
}

export default Navigation;

