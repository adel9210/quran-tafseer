import './TafseerText.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

interface Props {
    text: string,
    ayaNumber: string
}

export const TafseerText = (props: Props) => {
    const {text, ayaNumber} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)

    return <div
        className={`tafseer-text ${highlighterActiveId === ayaNumber ? 'active' : ''} ${highlighterHoverId === ayaNumber ? 'hover' : ''}`}
        id={ayaNumber}>
        <h3 className='tafseer-text__aya-number'>( {ayaNumber} ) </h3>
        <h2 className='tafseer-text__aya-text'>
            {text}
        </h2>
    </div>
}
