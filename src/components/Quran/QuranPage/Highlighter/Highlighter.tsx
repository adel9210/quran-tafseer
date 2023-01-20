import './Highlighter.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {changeHighlighterActiveId, changeHighlighterHoverId} from "../../../../redux/quran.slice";

interface Props {
    top: number,
    left: number,
    width: number,
    ayaNumber: number,
    highlighterId: string,
}

export const Highlighter = (props: Props) => {
    const {top, width, left, ayaNumber, highlighterId} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const dispatch = useDispatch()

    const style = {
        width: width,
        top: top,
        left: left
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
        const element = document.getElementById(highlighterId)
        scrollToElement(element)
    }

    const getHighlighterId = () => {
        return `${highlighterId}`
    }

    const scrollToElement = (elementRef: any) => {
        elementRef.scrollIntoView();
    }


    return <a onClick={onClick} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} style={style}
              id={`${highlighterId}`}
              className={
                  `highlighter ${highlighterActiveId === getHighlighterId() ? 'active' : ''} ${highlighterHoverId === getHighlighterId() ? 'hover' : ''}`
              }/>
}
