import axios from 'axios'
import { config } from '../config'

const axiosInstance = axios.create({
  baseURL: config.JOKE_API,
  timeout: 10 * 1000,
})

export const jokeAxios = axiosInstance
