import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface QuranSliceType {
    highlighterHoverId: string
    highlighterActiveId: string,
    currentPage?: number,
    currentSura?: string,
    currentAya?: string,
    modal: {
        isSuraModalOpen: boolean
        isAyaModalOpen: boolean
        isPageModalOpen: boolean,
    }
}

const initialState: QuranSliceType = {
    highlighterHoverId: '',
    highlighterActiveId: '',
    modal: {
        isSuraModalOpen: false,
        isAyaModalOpen: false,
        isPageModalOpen: false,
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
            // const keyName: Partial<Pick<QuranSliceType, 'modal'>>
            state.modal = {...state.modal, ...action.payload}
            console.log(state.modal)
        }

    },
})

// Action creators are generated for each case reducer function
export const {changeHighlighterHoverId, changeHighlighterActiveId, setActiveModal} = quranSlice.actions

export default quranSlice.reducer
