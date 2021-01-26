import React, { useState, useEffect, useRef } from 'react'
import Hero from '../../components/Hero'
import Filters from '../../components/Filters'
import WantedList from '../../components/WantedList'
import axios from 'axios'
import API from '../../utils/API'

// array of crimes and the queries for getting them from the api
const crimes = [
    {
        name: 'Capitol Riot',
        queries: ['capitol']
    },
    {
        name: 'Human Trafficking',
        queries: ['human trafficking']
    },
    {
        name: 'Homicide',
        queries: ['homicide', 'murder']
    },
    {
        name: 'Case of the Week',
        queries: ['case of the week']
    },
    {
        name: 'Counterintelligence',
        queries: ['counterintelligence']
    },
    {
        name: 'Kidnappings & missing persons',
        queries: ['kidnapping', 'missing persons']
    },
    {
        name: "Cyber's Most Wanted",
        queries: ["cyber's most wanted"]
    },
    {
        name: 'China Threat',
        queries: ['china threat']
    },
    {
        name: "Ten Most Wanted Fugitives",
        queries: ["ten most wanted fugitives"]
    },
    {
        name: "Endangered Child Alert Program",
        queries: ["endangered child alert program"]
    },
    {
        name: "Operation Legend",
        queries: ["operation legend"]
    },
    {
        name: "Crimes against children",
        queries: ["crimes against children"]
    },
    {
        name: "Bank Robbers",
        queries: ["bank robbers"]
    },
    {
        name: "Terrorists",
        queries: ["terrorists"]
    },
]

export default function Home() {  
    const wantedPeople = useRef([])
    const setWantedPeople = data => {
        wantedPeople.current = data
    }

    const [wantedPeopleToDisplay, setWantedPeopleToDisplay] = useState([])

    const [filters, setFilters] = useState({
        subject: [],
        sex: [],
        location: '',
        reward: null
    })

    useEffect(() => {
        // make request to fbi api for list of all wanted persons
        // because api only allows for max of 50 records per page, amount requests needed will have to be determined after first api call
        // getAllWanted(1)
    }, [])

    const getAllWanted = () => {
        // make request to server for wanted persons info
        API.getAllWanted().then(res => {
            console.log(res.data)
            // store wanted people data in ref hook
            setWantedPeople(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const updateWantedPeople = (peopleArr=[]) => {
        console.log(peopleArr)
    }

    return (
        <>
            <Hero />
            <WantedList />
            <Filters
                filters={filters}
                setFilters={filters}
            />
        </>
    )
}
