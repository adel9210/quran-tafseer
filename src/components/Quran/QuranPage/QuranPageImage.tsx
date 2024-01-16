import {Aya} from "../../../quranData";
import {Highlighter} from "./Highlighter/Highlighter";
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {useEffect, useState} from "react";
import {getPageHighlighters} from "../../../services/client.service";
import ImageLoader from "./Image";

interface Props {
    pageNumber: string
}

export const QuranPageImage = (props: Props) => {
    const {filter} = useSelector(getTafseerState)
    const [pageHighlighters, setPageHighlighters] = useState<Aya[]>()
    useEffect(() => {
        (async () => {
            const response = await getPageHighlighters(Number(filter?.currentPage))
            setPageHighlighters(response)
        })()
    }, [filter])

    return <>
        <ImageLoader imageUrl={`https://al-th3labe.omgsys.com/quranImages/${props?.pageNumber}.png`} />
        {/*<img className='quran-page__img' src={`https://al-th3labe.omgsys.com/quranImages/${props?.pageNumber}.png`}*/}
        {/*     alt={props.pageNumber}/>*/}
        {
            pageHighlighters?.map(({highlighterId, ayaNumber, styles, surahNumber}, index) => {
                const [width, top, left, height] = styles
                return <Highlighter
                    key={highlighterId}
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    ayaNumber={ayaNumber}
                    surahNumber={surahNumber}
                    highlighterId={highlighterId}/>
            })
        }
    </>
}
