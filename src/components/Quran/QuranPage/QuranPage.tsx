import './QuranPage.scss';
import {ForwardedRef, forwardRef} from "react";
import {Highlighter} from "./Highlighter/Highlighter";
import {QuranDataPageDetails} from "../../../quranData";
import {QuranTafseer} from "../QuranTafseer/QuranTafseer";

export const QuranPage = forwardRef((props: { pageNumber: string }, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className='quran-page page' ref={ref}>
        <div className='page-content'>
            {Number(props?.pageNumber) % 2 === 1 && <img className='quran-page__img' src={require(`../../../assets/images/pages/${props.pageNumber}.png`)}
                 alt='3'/> }
            {Number(props?.pageNumber) % 2 === 0 && <QuranTafseer/> }
            {/*{*/}
            {/*    QuranDataPageDetails.map(({highlighterId, ayaNumber, styles}, index) => {*/}
            {/*        const [width, top, left] = styles*/}
            {/*        return <Highlighter*/}
            {/*            key={ayaNumber + index}*/}
            {/*            top={top}*/}
            {/*            left={left}*/}
            {/*            width={width}*/}
            {/*            ayaNumber={ayaNumber}*/}
            {/*            highlighterId={highlighterId}/>*/}
            {/*    })*/}
            {/*}*/}
        </div>

    </div>
});
