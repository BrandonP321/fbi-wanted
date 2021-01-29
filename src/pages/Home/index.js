import React, { useState, useEffect, useRef } from 'react'
import Hero from '../../components/Hero'
import Filters from '../../components/Filters'
import WantedList from '../../components/WantedList'
import axios from 'axios'
import API from '../../utils/API'
import './index.css'
import ImgModal from '../../components/ImgModal'

export default function Home() {
    const wantedPeople = useRef([])
    const setWantedPeople = data => {
        wantedPeople.current = data
    }

    const [filteredWantedPeople, setFilteredWantedPeople] = useState([])

    const [displayedPeople, setDisplayedPeople] = useState([])

    // current page of list of wanted people, starts counting at 0 but will be displayed as 1
    const [page, setPage] = useState(0)

    const [filters, setFilters] = useState({
        subject: [],
        sex: '',
        keyword: '',
    })

    const [showImgModal, setShowImgModal] = useState(false)
    const [imgToShow, setImgToShow] = useState(null)

    useEffect(() => {
        // make request to fbi api for list of all wanted persons
        getAllWanted()
    }, [])

    useEffect(() => {
        // when either the page or the arr of filtered wanted people is updated, update arr of people displayed on the page
        const startIndex = page * 10
        let endIndex
        // check if end index is less than or equal to largest index in the arr of filtered people
        if (page * 10 + 9 <= filteredWantedPeople.length - 1) {
            // expression allows for 10 people to be displayed at a time
            endIndex = page * 10 + 10
        } else {
            // else less than 10 people are left to be displayed so end index is last index of arr
            endIndex = filteredWantedPeople.length
        }
        console.log(startIndex, endIndex)
        // update state with array of 10 people to display
        setDisplayedPeople(filteredWantedPeople.slice(startIndex, endIndex))
    }, [page, filteredWantedPeople])

    useEffect(() => {
        // when img modal is being show, prevent page from being scrolled
        if (showImgModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showImgModal])

    useEffect(() => {
        // when filters state is changed, apply filter to all wanted people
        if (filters.subject.length > 0 || filters.sex || filters.keyword) {
            applyFilter()
        } else {
            // else no filters are applied so filtered arr can be set to array of all people
            setFilteredWantedPeople(wantedPeople.current)
        }
    }, [filters])

    const getAllWanted = () => {
        // make request to server for wanted persons info
        API.getAllWanted()
            .then(res => {
                console.log(res.data)
                // store wanted people data in ref hook
                setWantedPeople(res.data)

                // people to display can also be set at this point as no filters have been placed yet
                setFilteredWantedPeople(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const applyFilter = () => {
        let filteredArr = []
        // filter by subjects if there are any subjects to filter by
        if (filters.subject.length > 0) {
            const subjectFilteredArr = wantedPeople.current.filter(person => {
                // iterate over subjects arr for wanted person
                for (let i = 0; i < person.subjects.length; i++) {
                    const subject = person.subjects[i]

                    // iterate over subjects arr in filter and compare filter with current subject in person's arr
                    for (let i = 0; i < filters.subject.length; i++) {
                        const filterSubject = filters.subject[i].toLowerCase();
                        // create regex for comparing subject to filter
                        const regex = new RegExp(`\\b${filterSubject}`, 'i')
                        // test regex on subject string
                        const isMatch = regex.test(subject)
                        // if regex matches, return true, to keep this person in the new filtered array
                        if (isMatch) return true
                    }
                }

                // if nothing has been returned yet, we can return false since there is no match
                return false
            })
            // set filteredArr to new arr
            filteredArr = subjectFilteredArr;
        }

        // now filter by sex
        // if filteredArr was just filtered by subject, we can just filter filteredArr
        if (filters.sex) {
            let arrToFilter;
            // set array to filter to filteredArr only if it has people in it, else we must filter then entire array of wanted people
            if (filteredArr.length > 0) arrToFilter = filteredArr
            else arrToFilter = wantedPeople.current

            const sexFilteredArr = arrToFilter.filter(person => {
                // return true if person's sex matches filter
                if (person.sex && person.sex.toLowerCase() === filters.sex.toLowerCase()) {
                    return true
                } else {
                    return false
                }
            })  
            
            // set filteredArr to new sexFilteredArr
            filteredArr = sexFilteredArr;
        }

        // filter by name
        // if filteredArr is empty, we must filter entire array of wanted people
        if (filters.keyword) {
            let arrToFilter;
            // set array to filter to either filteredArr or entire arr of wanted people
            if (filteredArr.length > 0) arrToFilter = filteredArr
            else arrToFilter = wantedPeople.current;

            const keywordFilteredArr = arrToFilter.filter(person => {
                // create regex to test for name match
                const regex = new RegExp(`\\b${filters.keyword}`, 'i')
                
                // due to the fbi api not providing a clear name for every person, we will test 
                // the regex on multiple parts of the person's obj
                let isMatch;
                // on each test, if there is a match return true to add the person to the filtered arr
                if (person.title && regex.test(person.title)) return true
                else if (person.details && regex.test(person.details)) return true
                else if (person.remarks && regex.test(person.remarks)) return true
                else {
                    // if no matches, return false
                    return false
                }
            })

            // set filteredArr to nameFilteredArr
            filteredArr = keywordFilteredArr
        }

        // set state of filtered people to new array of filtered people
        setFilteredWantedPeople(filteredArr)
    }

    const pageUp = () => {
        setPage(page + 1)
    }

    const pageDown = () => {
        setPage(page - 1)
    }

    const openImgInModal = (src) => {
        // set state with src of img to show
        setImgToShow(src)
        setShowImgModal(true)
    }

    const closeImgModal = () => {
        setImgToShow(null)
        setShowImgModal(false)
    }

    return (
        <>
            <Hero />
            <div className='content-wrapper'>
                <WantedList 
                    wantedPeople={displayedPeople}
                    openImgInModal={openImgInModal}
                />
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                    page={page}
                    setPage={setPage}
                    wantedArr={filteredWantedPeople}
                    pageUp={pageUp}
                    pageDown={pageDown}
                />
            </div>
            <ImgModal 
                show={showImgModal} 
                src={imgToShow}
                closeImgModal={closeImgModal}
            />
        </>
    )
}
