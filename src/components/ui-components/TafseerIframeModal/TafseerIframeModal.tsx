import './styles.scss'

import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";


export const TafseerIframeModal = () => {
    const {filter} = useSelector(getTafseerState)

    return <iframe className='iframe-container' style={{width: '100%', height: '100%'}} src={filter?.tafseerIframeURL}></iframe>

}
