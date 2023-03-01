import {QuranDataPageDetails} from "../../../quranData";
import {Highlighter} from "./Highlighter/Highlighter";

interface Props {
    pageNumber: string
}

export const QuranPageImage = (props: Props) => {
    return <>
        <img className='quran-page__img' src={require(`../../../assets/images/pages/${props?.pageNumber}.png`)}
             alt='3'/>
        {
            QuranDataPageDetails.map(({highlighterId, ayaNumber, styles}, index) => {
                const [width, top, left] = styles
                return <Highlighter
                    key={ayaNumber + index}
                    top={top}
                    left={left}
                    width={width}
                    ayaNumber={ayaNumber}
                    highlighterId={highlighterId}/>
            })
        }
    </>
}
