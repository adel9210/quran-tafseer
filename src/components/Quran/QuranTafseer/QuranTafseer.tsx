import './QuranTafseer.scss'
import {TafseerText} from "./TafseerText/TafseerText";
import {QuranPageTafseer} from "../../../quranData";

export const QuranTafseer = () => {
    return <div className='quran-tafseer'>

        {
            Object.keys(QuranPageTafseer).map((key) => {
                return <TafseerText text={QuranPageTafseer[key]} ayaNumber={key}/>
            })
        }
    </div>
}
