import './TafseerText.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {getTafseerState} from "../../../../redux/selectors";

interface Props {
    text: string,
    ayaNumber: string,
    highlighterId: string
}

export const TafseerText = (props: Props) => {
    const {text, ayaNumber, highlighterId} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const {filter} = useSelector(getTafseerState)

    return <div
        style={{direction: filter?.tafseerLang === 'en' ? 'ltr' : 'rtl'}}
        className={`tafseer-text ${highlighterActiveId === ayaNumber ? 'active' : ''} ${highlighterHoverId === ayaNumber ? 'hover' : ''}`}
        id={`tafseer_${highlighterId}`}>
        <h3 style={{
            marginInlineStart: filter?.tafseerLang === 'en' ? '0' : '10px',
            marginInlineEnd: filter?.tafseerLang === 'en' ? '10px' : '0',
        }} className='tafseer-text__aya-number'>( {ayaNumber} ) </h3>
        <h2 className='tafseer-text__aya-text'>
            {text}
        </h2>
    </div>
}
