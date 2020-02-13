import axios from 'axios'

// creates a single axios instance, acting as a mock database
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // get all of our events
  getCharacters() {
    return apiClient.get('/characters')
  },
  // get a SINGLE event, by id
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },

  // add a new thing to database
  addTile(tile) {
    return apiClient.post('/characters', tile)
  }


}