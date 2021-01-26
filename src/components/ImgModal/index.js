import React from 'react'
import './index.css'

export default function ImgModal(props) {
    return (
        <div className={`img-modal-wrapper${props.show ? ' show' : ''}`}>
            <div className='overlay' onClick={props.closeImgModal}></div>
            <img src={props.src} />
            <p className='modal-exit' onClick={props.closeImgModal}>&times;</p>
        </div>
    )
}
