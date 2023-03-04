import axios from "axios";
import {Sura} from "../types";
import List from '../mock/quran-sura.json'
import Quarters from '../mock/quran-hazb-quarter.json'
import Pages from '../mock/quran-pages.json'
import Goz2Items from '../mock/quran-goz2.json'

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

export const getSuraQuarter = (suraNumber: number): string => {
    const item = Quarters.filter(quarter => quarter.suraNumber === suraNumber)
    const firstQuarter = item[0]
    return (Math.round(firstQuarter.quarterIndex / 8) + 1).toString()
}

export const getPageDetails = (pageNumber: number): typeof Pages=> {
    return Pages.filter(page => page.pageNumber === pageNumber)
}

export const getQuarterDetail = (quarterIndex: number): typeof Quarters=> {
    return Quarters.filter(quarter => quarter.quarterIndex === quarterIndex)
}

export const getGoz2Details = (goz2Number: number): typeof Goz2Items=> {
    return Goz2Items.filter(page => page.goz2Number === goz2Number)
}
