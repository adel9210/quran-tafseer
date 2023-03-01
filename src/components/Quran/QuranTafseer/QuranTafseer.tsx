import './QuranTafseer.scss'
import {TafseerText} from "./TafseerText/TafseerText";
import {QuranDataPageTafseerDetails} from "../../../quranData";
import {ForwardedRef, forwardRef} from "react";

export const QuranTafseer = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
    // const {filter} = useSelector(getTafseerState)

    return <div className='quran-tafseer' ref={ref}>
        {
            QuranDataPageTafseerDetails.map(({text, highlighterId}, index) => {
                return <TafseerText highlighterId={highlighterId} key={index} text={text} ayaNumber={highlighterId}/>
            })
        }
    </div>
});
