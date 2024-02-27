import './TafseerText.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {getTafseerState} from "../../../../redux/selectors";
import {setActiveModal, setFilter} from "../../../../redux/quran.slice";

interface Props {
    text: string,
    ayaNumber: string,
    iframeURL:string,
    highlighterId: string
}

export const TafseerText = (props: Props) => {
    const {text, ayaNumber, highlighterId, iframeURL} = props
    const {highlighterActiveId, highlighterHoverId} = useSelector((state: RootState) => state.quran)
    const {filter} = useSelector(getTafseerState)
    const dispatch = useDispatch()
    console.log('highlighterId', highlighterActiveId)

    const openIframe = (url:string) =>{
        dispatch(setActiveModal({['isTafseerIframeModalOpen']: true}))
        dispatch(setFilter({key: 'tafseerIframeURL', value: url}))
    }

    return <div
        style={{direction: filter?.tafseerLang === 'en' ? 'ltr' : 'rtl'}}
        className={`tafseer-text ${highlighterActiveId === highlighterId ? 'active' : ''} ${highlighterHoverId === highlighterId ? 'hover' : ''}`}
        id={`tafseer_${highlighterId}`}>
        <h3 style={{
            marginInlineStart: filter?.tafseerLang === 'en' ? '0' : '10px',
            marginInlineEnd: filter?.tafseerLang === 'en' ? '10px' : '0',
        }} className='tafseer-text__aya-number'>( {ayaNumber} ) </h3>
        <h2 onClick={()=> openIframe(iframeURL)} className='tafseer-text__aya-text'  dangerouslySetInnerHTML={{ __html: text }}/>
    </div>
}
