import './Highlighter.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {
    changeHighlighterActiveId,
    changeHighlighterHoverId,
    setActiveModal,
    setFilter
} from "../../../../redux/quran.slice";
import {isMobile} from "../../../../lib";

interface Props {
    top: number,
    left: number,
    width: number,
    height: number,
    ayaNumber: number,
    surahNumber: number,
    highlighterId: string,
}

export const Highlighter = (props: Props) => {
    const {top, width, left, height = 30, ayaNumber, highlighterId, surahNumber} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const dispatch = useDispatch()

    const style = {
        width,
        top,
        left,
        height
    }

    const onMouseOver = () => {
        dispatch(changeHighlighterHoverId(getHighlighterIdConcatWithSuraAndAya()))
        const element = document.getElementById('tafseer_' + getHighlighterIdConcatWithSuraAndAya())
        if (element) {
            scrollToElement(element)
        }
    }

    const onMouseLeave = () => {
        dispatch(changeHighlighterHoverId(''))
    }

    const onClick = () => {
        dispatch(changeHighlighterActiveId(getHighlighterIdConcatWithSuraAndAya()))
        dispatch(setFilter({key: 'currentAya', value: ayaNumber.toString()}))

        if (isMobile()) {
            dispatch(setActiveModal({isTafseerModalOpen: true}))

        } else {
            const element = document.getElementById(highlighterId)
            scrollToElement(element)
        }
    }

    const getHighlighterIdConcatWithSuraAndAya = () => {
        return `${surahNumber}_${ayaNumber}`
    }

    const scrollToElement = (elementRef: any) => {
        elementRef?.scrollIntoView();
    }


    return <div>
        <a
            onClick={onClick}
            onTouchStart={onClick}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            style={style}
            id={`${highlighterId}`}
            className={
                `highlighter ${highlighterActiveId === getHighlighterIdConcatWithSuraAndAya() ? 'active' : ''} ${highlighterHoverId === getHighlighterIdConcatWithSuraAndAya() ? 'hover' : ''}`
            }/>
    </div>
}
