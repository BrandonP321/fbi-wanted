import axios from 'axios'

export default {
    getAllWanted: function() {
        return axios.get('http://localhost:8000/wanted')
    }
}