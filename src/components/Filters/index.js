import React from 'react'
import FilterCollapse from '../FilterCollapse'
import './index.css'

export default function Filters(props) {
    
    return (
        <div className='filters-wrapper'>
            <FilterCollapse>
                <FilterCollapse.Header>
                    <h1>I am a header</h1>
                </FilterCollapse.Header>
                <FilterCollapse.Body>
                    <p>I am a body</p>
                </FilterCollapse.Body>
            </FilterCollapse>
        </div>
    )
}