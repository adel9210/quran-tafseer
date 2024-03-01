import './TafseerModal.scss'
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";

export const TafseerModal = () => {
    const {filter} = useSelector(getTafseerState)

    return <iframe style={{width: '100%', height: '100%'}} src={filter?.tafseerIframeURL}></iframe>

}
