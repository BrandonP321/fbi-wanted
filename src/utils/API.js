import axios from 'axios'

const APIENDPOINT = process.env.REACT_APP_APIENDPOINT || 'http://localhost:8000'

export default {
    getAllWanted: function() {
        return axios.get(APIENDPOINT + '/wanted')
    },
    getWantedPerson: function(id) {
        return axios.get(APIENDPOINT + '/wanted/person/' + id)
    }
}