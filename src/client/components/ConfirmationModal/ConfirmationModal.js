import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationModal.scss'

const ConfirmationModal = React.forwardRef(function ConfirmationModal(props, confirmationRef) {
    const {item} = props
    const navigate = useNavigate()
    
    const onModalCancel = e => {
        confirmationRef.current.style.display = 'none';
    }

    const handleRemove = () => {
        fetch('/deleterecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: item})
            }).then(res => res.json())
            .then(res => console.log(res));
        navigate('/home')
    }

    return (
        <div id='newRecipe' ref={confirmationRef} className='modal'>
            <div className='modal-content'>
            <form id='confirm-form' >
                <span onClick={onModalCancel} className='close'>&times;</span>
                <p>{`Are you sure you want to continue deleting ${item}?`} </p>
                <button onClick={handleRemove} className='delete-button'>confirm</button>
            </form>
            </div>
        </div>
    )
})

export default ConfirmationModal;
