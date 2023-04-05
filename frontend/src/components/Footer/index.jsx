
import './Footer.css';
import { AboutModalContext } from '../../App';
import { IncompleteModalContext } from '../../App';
import { useContext } from 'react';
import logo from '../../assets/pathfinder-icon.png';

function Footer() {

    const { showAboutModal, setShowAboutModal } = useContext(AboutModalContext)
    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext)

    return (
        <>

            <div className='footer1-container'>
                <div className='footer1-upper-container'>
                    <div className='footer1-column'>
                        <img className='footer1-column-icon' src='https://cdn-assets.alltrails.com/assets/packs/78a67d41bec5447294b6.svg'></img>
                        <div className='footer1-column-header'>1% for the Planet</div>
                        <div className='footer1-column-text'>A portion of all PathFinder profits goes to protecting the wild places we cherish.</div>
                    </div>
                    <div className='footer1-column'>
                        <img className='footer1-column-icon' src='https://cdn-assets.alltrails.com/assets/packs/1f1ca79c343b9453fa26.svg'></img>
                        <div className='footer1-column-header'>10,000 trees (and counting)</div>
                        <div className='footer1-column-text'>From new member invites to employee anniversaries, we celebrate by giving to One Tree Planted.</div>
                    </div>
                    <div className='footer1-column'>
                        <img className='footer1-column-icon' src='https://cdn-assets.alltrails.com/assets/packs/523a835c8893649bf889.svg'></img>
                        <div className='footer1-column-header'>No trace on the trail</div>
                        <div className='footer1-column-text'>As a Leave No Trace partner, we’re committed to keeping outdoor spaces clean, safe, and kind.</div>
                    </div>
                </div>
                <button className="footer1-donate-button" onClick={() => setShowIncompleteModal(true)}>Get Pathfinder+ and give back</button>
            </div>


            <div className='footer2-container'>

                <img className="footer-logo" src={logo} ></img>

                <div className="footer-links-container">
                    <div className="footer-mobileapp-container">
                        <img src="https://cdn-assets.alltrails.com/assets/images/stores/apple-app-store-en-US.svg" className="footer-mobileapp-links" onClick={() => setShowIncompleteModal(true)}>
                        </img>
                        <img src="https://cdn-assets.alltrails.com/assets/images/stores/google-play-badge-en-US.svg" className="footer-mobileapp-links" onClick={() => setShowIncompleteModal(true)}>
                        </img>
                    </div>
                    <div>
                        <a className='footer-contact-link' href="https://github.com/Edbeans/Orcastra" target='_blank'>
                            Github
                        </a>
                        <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}> | </span>
                        <span className="footer-contact-link" onClick={() => setShowAboutModal(true)}>
                            About
                        </span>
                    </div>
                </div>

                <div className="footer-lower-container">
                    <div className="footer-lower">
                        <div className="brand-rights">
                            2023 Pathfinder, LLC All Rights Reserved
                        </div>
                        <div className="brand-trademark">
                            PATHFINDER is a registered trademark of Pathfinder, LLC in the United States as well as certain other jurisdictions.
                        </div>
                        <div className="brand-policies">
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Privacy Policy</span>
                            <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Terms</span>
                            <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Cookie Policy</span>
                        </div>
                    </div>
                    <select className="footer-language-dropdown" onClick={() => setShowIncompleteModal(true)}>
                        <option value="" disabled selected>English (US)</option>
                    </select>
                </div>

            </div>
        </>
    )
}

export default Footer