import './QuranTafseer.scss'
import {TafseerText} from "./TafseerText/TafseerText";
import {AyaTafseer} from "../../../quranData";
import {ForwardedRef, forwardRef, useEffect, useState} from "react";
import {getTafseerState} from "../../../redux/selectors";
import {useSelector} from "react-redux";
import {getPageTafseer} from "../../../services/client.service";

export const QuranTafseer = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
    const {filter} = useSelector(getTafseerState)
    const [tafseerPageText, setTafseerPageText] = useState<AyaTafseer[]>()


    useEffect(() => {
        (async () => {
            const response = await getPageTafseer(filter?.tafseerLang || 'ar', Number(filter?.currentPage))
            setTafseerPageText(response)
        })()
    }, [filter])

    return <div className='quran-tafseer' ref={ref}>
        {
            tafseerPageText?.map(({text, highlighterId}, index) => {
                return <TafseerText highlighterId={highlighterId} key={index} text={text} ayaNumber={highlighterId}/>
            })
        }
    </div>
});
