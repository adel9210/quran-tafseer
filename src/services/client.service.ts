import axios from "axios";
import {Sura} from "../types";
import List from '../mock/quran-sura.json'

export const axiosInstance = axios.create({
    baseURL: '/mock',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export const getSuraList = (): typeof List => {
    return List
}

export const getSuraDetails = async (suraIndex: number) => {
    const response = await axiosInstance.get<Sura[]>('/quran-sura.json')
    return response.data.filter(sura => sura.index === suraIndex)[0]
}


export const getSuraDetailsByGoz2Id = async (goz2Index: number) => {
    const response = await axiosInstance.get<Sura[]>('/quran-sura.json')
    const sura = response.data.filter(sura => sura.pageEnd >= (goz2Index * 20) - 20)[0]
    // setSuraInfo(sura)
    return sura
}
