import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface QuranSliceType {
    highlighterHoverId: string
    highlighterActiveId: string,
    modal: {
        isSuraModalOpen: boolean
        isAyaModalOpen: boolean
        isPageModalOpen: boolean,
    },
    filter?: {
        currentPage?: number,
        currentSura?: string,
        currentAya?: string,
    }
}

const initialState: QuranSliceType = {
    highlighterHoverId: '',
    highlighterActiveId: '',
    modal: {
        isSuraModalOpen: false,
        isAyaModalOpen: false,
        isPageModalOpen: false,
    },
    filter: {
        currentSura: '0'
    }
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
            console.log(state.modal)
        },
        setValue: (state, {payload}) =>{
            state.filter = {...state.filter, [payload.key]: payload.value}
        }

    },
})

// Action creators are generated for each case reducer function
export const {changeHighlighterHoverId, changeHighlighterActiveId, setActiveModal, setValue} = quranSlice.actions

export default quranSlice.reducer
