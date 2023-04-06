
import { useContext } from "react"
import { IncompleteModalContext } from "../../App"
import { Modal } from "../../context/modal"
import logo from "../../assets/pathfinder-icon.png"
import './IncompleteModal.css'

export default function IncompleteModal() {

    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext);
    return (
        <>
            {showIncompleteModal && (
                <Modal onClose={() => setShowIncompleteModal(false)}>
                    <div className="modal-background" style={{ width: '600px', height: '480px' }}>
                        <button className="modal-close-button" onClick={() => setShowIncompleteModal(false)}>&#10005;</button>
                        <div className="incomplete-container">
                            <div className="incomplete-sorry-msg">Lost the trail!</div>
                            <img src={logo} style={{ width: '150px', height: 'auto' }}></img>
                            <div className="incomplete-blurb-msg">
                                <div>
                                    Sorry about this!
                                </div>
                                <br></br>
                                <div style={{ textAlign: 'center' }}>
                                    Our team is working on getting this feature to you as soon as we can.
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}