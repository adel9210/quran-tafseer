import './QuranPage.scss';
import {ForwardedRef, forwardRef} from "react";
import {QuranPageImage} from "./QuranPageImage";
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";

export const QuranPage = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
    const {filter} = useSelector(getTafseerState)

    const gerPageNumber = () => {
        return filter?.currentPage
    }
    return <div className='quran-page page' ref={ref}>
        <div className='page-content'>
            <QuranPageImage pageNumber={gerPageNumber() || ''}/>
        </div>
    </div>
});
