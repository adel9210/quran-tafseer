import './Highlighter.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {changeHighlighterActiveId, changeHighlighterHoverId} from "../../../../redux/quran.slice";

interface Props {
    top: number,
    left: number,
    width: number,
    ayaNumber: string,
    highlighterIndex: number,
    isSingleHighlighter: boolean
}

export const Highlighter = (props: Props) => {
    const {top, width, left, ayaNumber, highlighterIndex, isSingleHighlighter} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const dispatch = useDispatch()


    const style = {
        width: width + 'px',
        top: top + 'px',
        left: left + 'px'
    }

    const onMouseOver = () => {
        dispatch(changeHighlighterHoverId(getHighlighterId()))
        const element = document.getElementById(ayaNumber)
        scrollToElement(element)
    }

    const onMouseLeave = () => {
        dispatch(changeHighlighterHoverId(''))
    }

    const onClick = () => {
        dispatch(changeHighlighterActiveId(getHighlighterId()))
        const element = document.getElementById(ayaNumber)
        scrollToElement(element)
    }

    const getHighlighterId = () => {
        if (isSingleHighlighter) {
            return `${ayaNumber}_${highlighterIndex}`
        }

        return `${ayaNumber}`
    }

    const scrollToElement = (elementRef: any) => {
        let element = elementRef
        element.scrollIntoView();
    }


    return <a onClick={onClick} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} style={style}
              id={`${ayaNumber}_${highlighterIndex}`}
              className={
                  `highlighter ${highlighterActiveId === getHighlighterId() ? 'active' : ''} ${highlighterHoverId === getHighlighterId() ? 'hover' : ''}`
              }/>
}
