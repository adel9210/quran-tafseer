import './TafseerModal.scss'
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {useEffect, useState} from "react";
import {Tafseer} from "../../../types";

export const TafseerModal = () => {
    const {activeTafseerPage, highlighterActiveId} = useSelector(getTafseerState)
    const [tafseer, setTafseer] = useState<Tafseer>()
    const {filter} = useSelector(getTafseerState)


    useEffect(() => {
        const item = activeTafseerPage?.filter(tf => tf.highlighterId === highlighterActiveId)[0];
        setTafseer(item)
    }, [activeTafseerPage])


    // return <div dangerouslySetInnerHTML={{__html: tafseer?.text || ''}}/>
    return <iframe style={{width: '100%', height: '100%'}} src={filter?.tafseerIframeURL}></iframe>

}
