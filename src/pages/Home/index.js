import React, { useState } from 'react'
import Hero from '../../components/Hero'
import Filters from '../../components/Filters'
import WantedList from '../../components/WantedList'

export default function Home() {
    const [filters, setFilters] = useState({
        subject: [],
        sex: [],
        location: '',
        reward: null
    })

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
