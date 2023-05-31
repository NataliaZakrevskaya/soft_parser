import axios from "axios";
const token = localStorage.getItem('sellershub-token')
export const instance = axios.create( {
  headers: { Authorization: `Bearer ${token}` }
} );