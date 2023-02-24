import './QuranTafseer.scss'
import {TafseerText} from "./TafseerText/TafseerText";
import {QuranDataPageTafseerDetails} from "../../../quranData";

export const QuranTafseer = () => {
    return <div className='quran-tafseer'>
        {
            QuranDataPageTafseerDetails.map(({text, highlighterId}, index) => {
                return <TafseerText highlighterId={highlighterId} key={index} text={text} ayaNumber={highlighterId}/>
            })
        }
    </div>
}
