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
import {useEffect, useState} from "react";

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
    const [clickCount, setClickCount] = useState(0);

    const style = {
        width,
        top,
        left,
        height
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if (clickCount === 1) {
                console.log('Single tap');
            } else if (clickCount === 2) {
                dispatch(setActiveModal({isTafseerModalOpen: true}))
            }
            setClickCount(0);
        }, 300); // Adjust the timeout based on your needs (e.g., 300ms for double click)

        return () => clearTimeout(timer);
    }, [clickCount]);

    const onMouseOver = () => {
        dispatch(changeHighlighterHoverId(getHighlighterIdConcatWithSuraAndAya()))
        const element = document.getElementById('tafseer_' + getHighlighterIdConcatWithSuraAndAya())
        if (element) {
            scrollToElement(element)
        }
    }

    const onMouseLeave = (e:any) => {
        dispatch(changeHighlighterHoverId(''))
    }

    const onClick = (e:any) => {
        dispatch(changeHighlighterActiveId(getHighlighterIdConcatWithSuraAndAya()))
        dispatch(setFilter({key: 'currentAya', value: ayaNumber.toString()}))

        if (!isMobile()){
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

    const handleTouchEnd = () => {
        setClickCount((prev) => prev + 1);
    };

    return <div>
        <a
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onTouchEnd={handleTouchEnd}

            style={style}
            id={`${highlighterId}`}
            className={
                `highlighter ${highlighterActiveId === getHighlighterIdConcatWithSuraAndAya() ? 'active' : ''} ${highlighterHoverId === getHighlighterIdConcatWithSuraAndAya() ? 'hover' : ''}`
            }/>
    </div>
}
