import React from 'react'
import './index.css'

export default function Hero() {
    return (
        <div className='hero'>
            <img src='./assets/img/capitol-far.jpg'/>
            <div className='overlay'></div>
            <div className='text-wrapper'>
                <h1>FBI <br />WANTED</h1>
            </div>
        </div>
    )
}
