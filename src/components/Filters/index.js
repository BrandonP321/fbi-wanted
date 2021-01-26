import React from 'react'
import FilterCollapse from '../FilterCollapse'
import './index.css'

export default function Filters(props) {

    return (
        <div className='filters-wrapper'>
            <FilterCollapse>
                <FilterCollapse.Header>
                    <h3 className='filter-header-text'>Crime</h3>
                </FilterCollapse.Header>
                <FilterCollapse.Body>
                    <p>I am a body</p>
                </FilterCollapse.Body>
            </FilterCollapse>
            <FilterCollapse>
                <FilterCollapse.Header>
                    <h3 className='filter-header-text'>Gender</h3>
                </FilterCollapse.Header>
                <FilterCollapse.Body>
                    <p>I am a body</p>
                </FilterCollapse.Body>
            </FilterCollapse>
            <FilterCollapse>
                <FilterCollapse.Header>
                    <h3 className='filter-header-text'>State</h3>
                </FilterCollapse.Header>
                <FilterCollapse.Body>
                    <p>I am a body</p>
                </FilterCollapse.Body>
            </FilterCollapse>
        </div>
    )
}