import React, { useState, useEffect, useRef } from 'react'
import FilterCollapse from '../FilterCollapse'
import crimes from '../../data/crimes.json'
import './index.css'

const genders = [
    'Male',
    'Female',
    'All'
]

export default function Filters(props) {
    const [isSticky, setIsSticky] = useState(window.pageYOffset > window.innerHeight)

    const filtersDiv = useRef()

    const keywordInput = useRef()

    const filtersHeading = useRef()

    useEffect(() => {
        // create scroll event listener for when to make filters div sticky to top of screen
        window.addEventListener('scroll', event => {
            // when page is scrolled to 100vh, make filters div sticky
            if (window.pageYOffset > window.innerHeight) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })

        // select 'all' gender radio option on load
        document.querySelector('#AllGenderRadio').checked = true
    }, [])

    const updateFilters = () => {
        // get all checked checkboxes and radios
        const subjectNodes = document.querySelectorAll('.crime-checkbox:checked')
        const genderNode = document.querySelector('.gender-radio:checked')

        // create new filters object with selected gender
        const newFilters = {
            sex: genderNode.value !== 'all' ? genderNode.value : '',
            subject: [],
            keyword: keywordInput.current.value
        }
        // iterate over subjectNodes and add theirs values to the filters obj as an array
        subjectNodes.forEach(subject => {
            // break up any comma separated values in the nodes value if any
            const sepValues = subject.value.split(',')

            // spread the new values into the new filters object's subject arr
            newFilters.subject = [...newFilters.subject, ...sepValues]
        })

        // update filters state hook with new obj
        props.setFilters(newFilters)

        // set page back to first page
        props.setPage(0)

        // hide filters div if on mobile
        props.setShowMobile(false)

        // scroll 100vh from top of page to get back to top of results
        window.scrollTo(0, window.innerHeight)
    }

    const handleKeywordInputChange = e => {
        // if user hits 'return' apply the filters since this input field is not in a form
        const key = e.code || e.key
        if (key === 'Enter') {
            updateFilters();
        }
    }

    return (
        <div className={`filters-wrapper${isSticky ? ' sticky' : ''}${props.showMobile ? ' show-mobile' : ''}`} ref={filtersDiv}>
            <p className='mobile-exit-icon' onClick={() => props.setShowMobile(false)}>&times;</p>
            <h2 ref={filtersHeading}>Filters</h2>
            <div className='collapse-wrapper'>
                <FilterCollapse>
                    <FilterCollapse.Header>
                        <h3 className='filter-header-text'>Crime</h3>
                    </FilterCollapse.Header>
                    <FilterCollapse.Body>
                        <form>
                            {crimes.map((crime, index) => {
                                return <div className='crime-filter-wrapper'>
                                    <label for={`crime${index}`}>
                                        <input type='checkbox' className='crime-checkbox' id={`crime${index}`} name='crime-subject' value={crime.queries} />
                                        {crime.name}
                                    </label>
                                </div>
                            })}
                        </form>
                    </FilterCollapse.Body>
                </FilterCollapse>
                <FilterCollapse>
                    <FilterCollapse.Header>
                        <h3 className='filter-header-text'>Gender</h3>
                    </FilterCollapse.Header>
                    <FilterCollapse.Body>
                        <form>
                            {genders.map(gender => {
                                return <div className='gender-filter-wrapper'>
                                    <label for={`${gender}GenderRadio`}>
                                        <input type='radio' className='gender-radio' id={`${gender}GenderRadio`} name='gender' value={gender.toLowerCase()} />
                                        {gender}
                                    </label>
                                </div>
                            })}
                        </form>
                    </FilterCollapse.Body>
                </FilterCollapse>
                <FilterCollapse>
                    <FilterCollapse.Header>
                        <h3 className='filter-header-text'>Search by Keyword</h3>
                    </FilterCollapse.Header>
                    <FilterCollapse.Body>
                        <input ref={keywordInput} className='keyword-search-input' placeholder='Keyword' onKeyDown={handleKeywordInputChange} />
                    </FilterCollapse.Body>
                </FilterCollapse>
            </div>
            <button className='update-search-btn' onClick={updateFilters}>Update Search</button>
            <div className='page-btns-filter'>
                <button className='page-prev' onClick={props.pageDown} disabled={props.page <= 0}>Prev</button>
                <button className='page-next' onClick={props.pageUp} disabled={props.page * 10 + 9 >= props.wantedArr.length}>Next</button>
            </div>
        </div>
    )
}