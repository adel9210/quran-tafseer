import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {filterTypes, Sura} from "../types";
import {getSuraList} from "../services/client.service";

export interface QuranSliceType {
    highlighterHoverId: string
    highlighterActiveId: string,
    activeSuraInfo: Sura,
    modal?: {
        isSuraModalOpen?: boolean
        isAyaModalOpen?: boolean
        isPageModalOpen?: boolean,
        isGoz2ModalOpen?: boolean,
    },
    filter?: {
        currentPage?: string,
        currentSura?: string,
        currentAya?: string,
        currentGoz2?: string,
        currentSheikh?:string
    }
}

const initialState: Partial<QuranSliceType> = {
    filter: {
        currentAya: '1',
        currentSura: '1',
        currentPage: '1',
        currentGoz2: '1',
        currentSheikh: 'Husary_64kbps'
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
            let filter = {...state.filter, [action.payload.key]: action.payload.value}
            const sura = state.activeSuraInfo;
            switch (action.payload.key) {
                case 'currentSura':
                    filter = {
                        ...filter,
                        currentAya: '1',
                        currentPage: sura?.pageStart.toString(),
                        currentGoz2: getSuraGoz2(sura?.pageStart)
                    }
                    break
                case 'currentGoz2':
                    filter = {
                        ...filter,
                        currentPage: (Number(filter.currentGoz2) * 20 - 20 + 2).toString(),
                        currentSura: getSuraByGoz2Number(Number(filter.currentGoz2)).index.toString(),
                    }
                    break
                case 'currentPage':
                    filter = {
                        ...filter,
                        currentSura: getSuraByPageNumber(Number(filter.currentPage)).index.toString(),
                    }
                    break

            }
            state.filter = {...filter}
        }

    },
})

// Action creators are generated for each case reducer function
export const {
    changeHighlighterHoverId,
    changeHighlighterActiveId,
    setActiveModal,
    setFilter,
    setSuraInfo
} = quranSlice.actions

export default quranSlice.reducer
