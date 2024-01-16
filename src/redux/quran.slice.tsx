import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {filterTypes, Sura, Tafseer} from "../types";
import {
    getGoz2Details,
    getPageDetails,
    getPageDetailsBySuraAndAyaNumber,
    getQuarterDetail,
    getSuraList,
    getSuraQuarter
} from "../services/client.service";

export interface QuranSliceType {
    highlighterHoverId: string
    highlighterActiveId: string,
    activeSuraInfo: Sura,
    activeTafseerPage:Tafseer[];
    modal?: {
        isSuraModalOpen?: boolean
        isAyaModalOpen?: boolean
        isPageModalOpen?: boolean,
        isGoz2ModalOpen?: boolean,
        isTafseerModalOpen?: boolean,
        isMobileFilterModalOpen?: boolean,
    },
    filter?: {
        currentPage?: string,
        currentSura?: string,
        currentAya?: string,
        currentGoz2?: string,
        currentQuarter?: string,
        currentSheikh?: string,
        tafseerLang?: 'ar' | 'en'
    }
}

const initialState: Partial<QuranSliceType> = {
    filter: {
        currentAya: '1',
        currentSura: '1',
        currentPage: '1',
        currentGoz2: '1',
        currentQuarter: '1',
        currentSheikh: 'Husary_64kbps',
        tafseerLang: 'ar'
    }
}

// https://quran.ksu.edu.sa/ayat/mp3/Alafasy_64kbps/001007.mp3

const getSuraGoz2 = (pageStart: number = 1) => {
    if (pageStart <= 20) {
        return '1'
    }

    return Math.round((pageStart) / 20).toString()
}

const getSuraByGoz2Number = (goz2Number: number) => {
    return getSuraList().filter(sura => sura.pageEnd >= goz2Number * 20 - 20)[0]
}

const getSuraByPageNumber = (pageNumber: number) => {
    return getSuraList().filter(sura => sura.pageEnd >= pageNumber)[0]
}

const getAyaByPageNumber = (pageNumber: number) => {
    return getPageDetails(pageNumber)[0]
}

const getAyaByGoz2Number = (goz2Number: number) => {
    return getGoz2Details(goz2Number)[0]
}

const getPageByGoz2Number = (goz2Number: number) => {
    if (goz2Number === 1) {
        return '1'
    }

    return (goz2Number * 20 - 20 + 2).toString()
}

const getPageBySuraAndAyaNumber = (suraNumber: number, ayaNumber: number) => {
    return getPageDetailsBySuraAndAyaNumber(suraNumber, ayaNumber)[0]
}

const getQuarterDetails = (quarterIndex: number) => {
    return getQuarterDetail(quarterIndex)[0]
}

export const quranSlice = createSlice({
    name: 'quran',
    initialState,
    reducers: {
        changeHighlighterHoverId: (state, {payload}) => {
            state.highlighterHoverId = payload
        },
        changeHighlighterActiveId: (state, {payload}) => {
            state.highlighterActiveId = payload
        },
        setActiveModal: (state, action: PayloadAction<Record<string, boolean>>) => {
            state.modal = {...state.modal, ...action.payload}
        },
        setSuraInfo: (state, action: PayloadAction<Sura>) => {
            state.activeSuraInfo = action.payload
        },
        setFilter: (state, action: PayloadAction<{ key: filterTypes, value: string }>) => {
            if (action.payload.key !== 'currentAya'){
                state.highlighterActiveId = ''
                state.highlighterHoverId = ''
            }

            let filter = {...state.filter, [action.payload.key]: action.payload.value}
            const sura = state.activeSuraInfo;
            switch (action.payload.key) {
                case 'currentSura':
                    filter = {
                        ...filter,
                        currentAya: '1',
                        currentPage: sura?.pageStart.toString(),
                        currentGoz2: getSuraGoz2(sura?.pageStart),
                        currentQuarter: getSuraQuarter(sura?.index || 0)
                    }
                    break
                case 'currentGoz2':
                    filter = {
                        ...filter,
                        currentPage: getPageByGoz2Number(Number(filter.currentGoz2)),
                        currentSura: getSuraByGoz2Number(Number(filter.currentGoz2)).index.toString(),
                        currentAya: getAyaByGoz2Number(Number(filter.currentGoz2)).ayaNumber.toString(),
                        currentQuarter: '1'
                    }
                    break
                case 'currentQuarter':
                    filter = {
                        ...filter,
                        currentSura: getQuarterDetails(Number(filter.currentQuarter) + Number(filter.currentGoz2) * 8 - 8).suraNumber.toString(),
                        currentAya: getQuarterDetails(Number(filter.currentQuarter) + Number(filter.currentGoz2) * 8 - 8).ayaNumber.toString(),
                        currentPage: getQuarterDetails(Number(filter.currentQuarter) + Number(filter.currentGoz2) * 8 - 8).pageNumber.toString(),
                    }
                    break
                case 'currentPage':
                    filter = {
                        ...filter,
                        currentSura: getSuraByPageNumber(Number(filter.currentPage))?.index?.toString(),
                        currentAya: getAyaByPageNumber(Number(filter.currentPage)).startAyaNumber.toString()
                    }
                    break
                case 'currentAya':
                    filter = {
                        ...filter,
                        currentPage: getPageBySuraAndAyaNumber(Number(filter.currentSura), Number(filter.currentAya))?.pageNumber.toString(),
                    }
                    break

            }
            state.filter = {...filter}
        },
        setBulkFilters: (state, action: PayloadAction<any>) =>{
                state.filter = action.payload
        },
        setPageTafseer: (state, action: PayloadAction<Tafseer[]>) =>{
            state.activeTafseerPage = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    changeHighlighterHoverId,
    changeHighlighterActiveId,
    setActiveModal,
    setFilter,
    setBulkFilters,
    setSuraInfo,
    setPageTafseer
} = quranSlice.actions

export default quranSlice.reducer
