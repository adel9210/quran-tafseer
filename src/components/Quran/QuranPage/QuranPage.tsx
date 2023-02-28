import './QuranPage.scss';
import {ForwardedRef, forwardRef} from "react";

export const QuranPage = forwardRef((props: { pageNumber: string }, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className='quran-page page' ref={ref}>
        <div className='page-content'>
            <img className='quran-page__img' src={require(`../../../assets/images/pages/${props.pageNumber}.png`)}
                 alt='3'/>
        </div>
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
});
