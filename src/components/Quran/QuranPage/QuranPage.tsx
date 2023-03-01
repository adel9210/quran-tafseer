import './QuranPage.scss';
import {ForwardedRef, forwardRef} from "react";
import {QuranTafseer} from "../QuranTafseer/QuranTafseer";
import {QuranPageImage} from "./QuranPageImage";

export const QuranPage = forwardRef((props: { pageNumber: string }, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className='quran-page page' ref={ref}>
        <div className='page-content'>
            {Number(props?.pageNumber) % 2 === 1 && <QuranPageImage pageNumber={props.pageNumber}/>}
            {Number(props?.pageNumber) % 2 === 0 && <QuranTafseer/>}
        </div>

    </div>
});
