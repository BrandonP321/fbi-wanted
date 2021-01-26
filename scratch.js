const axios = require('axios')

var subjects = []

function getSubjects(page) {
    if (page === 18) {
        console.log(subjects)
        return true
    } else {
        return axios.get('https://api.fbi.gov/@wanted?pageSize=50&page=' + page)
            .then(response => {
                console.log(response.data.items.length)

                response.data.items.forEach(person => {
                    person.subjects.forEach(subject => {
                        if (!subjects.includes(subject)) {
                            subjects.push(subject)
                        }
                    })
                })
                console.log('page ' + page + ' done')
                getSubjects(page + 1)
            })
    }
}

getSubjects(1)