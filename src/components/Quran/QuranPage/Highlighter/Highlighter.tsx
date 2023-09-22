import './Highlighter.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {changeHighlighterActiveId, changeHighlighterHoverId, setFilter} from "../../../../redux/quran.slice";

interface Props {
    top: number,
    left: number,
    width: number,
    height: number,
    ayaNumber: number,
    highlighterId: string,
}

export const Highlighter = (props: Props) => {
    const {top, width, left,height = 30, ayaNumber, highlighterId} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const dispatch = useDispatch()

    const style = {
        width,
        top,
        left,
        height
    }

    const onMouseOver = () => {
        dispatch(changeHighlighterHoverId(getHighlighterId()))
        const element = document.getElementById('tafseer_' + highlighterId)
        scrollToElement(element)
    }

    const onMouseLeave = () => {
        dispatch(changeHighlighterHoverId(''))
    }

    const onClick = () => {
        dispatch(changeHighlighterActiveId(getHighlighterId()))
        dispatch(setFilter({ key: 'currentAya', value:ayaNumber.toString()}))
        const element = document.getElementById(highlighterId)
        scrollToElement(element)
    }

    const getHighlighterId = () => {
        return `${highlighterId}`
    }

    const scrollToElement = (elementRef: any) => {
        // elementRef.scrollIntoView();
    }


    return <a onClick={onClick} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} style={style}
              id={`${highlighterId}`}
              className={
                  `highlighter ${highlighterActiveId === getHighlighterId() ? 'active' : ''} ${highlighterHoverId === getHighlighterId() ? 'hover' : ''}`
              }/>
}
