import axios from "axios";
import {Sura} from "../types";

export const axiosInstance = axios.create({
    baseURL: '/mock',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


export const getSuraList = () => {
    return axiosInstance.get<Sura[]>('/quran-sura.json')
}


export const getSuraDetails = async (suraIndex: number) => {
    const response = await axiosInstance.get<Sura[]>('/quran-sura.json')
    return response.data.filter(sura => sura.index === suraIndex)[0]
}
