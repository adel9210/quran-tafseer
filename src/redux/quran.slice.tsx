import {createSlice} from '@reduxjs/toolkit'

export interface QuranSliceType {
    currentPage: number,
    highlighterHoverId: string
    highlighterActiveId: string,
}

const initialState: QuranSliceType = {
    currentPage: 3,
    highlighterHoverId: '',
    highlighterActiveId: ''
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

    },
})

// Action creators are generated for each case reducer function
export const {changeHighlighterHoverId, changeHighlighterActiveId} = quranSlice.actions

export default quranSlice.reducer
