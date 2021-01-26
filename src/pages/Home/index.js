import React, { useState, useEffect, useRef } from 'react'
import Hero from '../../components/Hero'
import Filters from '../../components/Filters'
import WantedList from '../../components/WantedList'
import axios from 'axios'
import API from '../../utils/API'
import './index.css'

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
        sex: [],
        location: '',
    })

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
            endIndex = page * 10 + 9
        } else {
            // else less than 10 people are left to be displayed so end index is last index of arr
            endIndex = filteredWantedPeople.length - 1
        }

        // update state with array of 10 people to display
        setDisplayedPeople(filteredWantedPeople.slice(startIndex, endIndex))
    }, [page, filteredWantedPeople])

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

    const updateWantedPeople = (peopleArr = []) => {
        console.log(peopleArr)
    }

    const pageUp = () => {
        setPage(page + 1)
    }

    const pageDown = () => {
        setPage(page - 1)
    }

    return (
        <>
            <Hero />
            <div className='content-wrapper'>
                <WantedList 
                    wantedPeople={displayedPeople}
                />
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
        </>
    )
}
