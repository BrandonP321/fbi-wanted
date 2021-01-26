// const axios = require('axios')

// var subjects = []

// function getSubjects(page) {
//     if (page === 18) {
//         console.log(subjects)
//         return true
//     } else {
//         return axios.get('https://api.fbi.gov/@wanted?pageSize=50&page=' + page)
//             .then(response => {
//                 console.log(response.data.items.length)

//                 response.data.items.forEach(person => {
//                     person.subjects.forEach(subject => {
//                         if (!subjects.includes(subject)) {
//                             subjects.push(subject)
//                         }
//                     })
//                 })
//                 console.log('page ' + page + ' done')
//                 getSubjects(page + 1)
//             })
//     }
// }

// var locations = []

// function getLocations(page) {
//     if (page === 18) {
//         console.log(locations)
//         return true
//     } else {
//         return axios.get('https://api.fbi.gov/@wanted?pageSize=50&page=' + page)
//             .then(response => {
//                 response.data.items.forEach(person => {
//                     console.log(person.locations)
//                     if (person.locations) {
//                         locations.push(person.location)
//                     }
//                 })
//                 console.log('page ' + page + ' done')
//                 getLocations(page + 1)
//             })
//     }
// }
// getLocations(1)

// // getSubjects(1)

let str = "<p>Hello<p> there my</p> friend</p>"
str = str.replace(/<p>/g, '')
str = str.replace(/<\/p>/g, '')
// str = str.replace(/<p>/g, '')

console.log(str)