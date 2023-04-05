
import { useContext } from "react"
import { AboutModalContext } from "../../App"
import { Modal } from "../../context/modal"
import './AboutModal.css'
import danielHeadshot from "../../assets/daniel-headshot.png"
import linkedin from "../../assets/linkedincrop.png"
import github from "../../assets/github.png"
import portfolio from "../../assets/user-icon.png"

export default function AboutModal() {

    const { showAboutModal, setShowAboutModal } = useContext(AboutModalContext)
    return (

        <>
            {showAboutModal && (
                <Modal onClose={() => setShowAboutModal(false)}>
                    <div className="modal-background" style={{ width: '600px', height: '650px' }}>
                        <button className="modal-close-button" onClick={() => setShowAboutModal(false)}>&#10005;</button>
                        <div className="about-container">
                            <div className="about-meetme">Meet the creator:</div>
                            <div className="agi-info">
                                <img src={danielHeadshot}></img>
                                <div className="agi-header">
                                    <h1>Daniel Liem</h1>
                                    <div className="agi-contact">
                                        <a href="https://github.com/danielliem49" target="_blank" rel="noopener noreferrer" style={{ filter: 'invert(1)' }}>
                                            <img src={github} alt="Github Link" />
                                        </a>
                                        <a href="https://www.linkedin.com/in/danielliem49/" target="_blank" rel="noopener noreferrer" style={{ filter: 'invert(1)' }} >
                                            <img src={linkedin} alt="LinkedIn Link" />
                                        </a>
                                        <a href="https://danielliem49.github.io/" target="_blank" rel="noopener noreferrer">
                                            <img src={portfolio} alt="Portfolio Link" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="agi-description">A full stack engineer with a background in the aerospace industry. I have strong passions for coding, innovation, and designing swanky web applications.
                            <br></br>
                            <br></br>
                            In my free time you can find me playing chess, exercising with friends, or dabbling in art and music.
                            <br></br>
                            <br></br>
                            Please reach out if you want to get in touch!
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>

    )
}