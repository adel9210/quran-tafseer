import {QuranPageImage} from "./QuranPageImage";
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {useRef} from "react";
import {setFilter} from "../../../redux/quran.slice";
import './QuranPage.scss';

export const QuranPage = () => {
    const { filter } = useSelector(getTafseerState);
    const dispatch = useDispatch();
    const startX = useRef<number | null>(null); // Define startX as a ref

    const handleTouchStart = (e: any) => {
        console.log(e.touches[0])
        startX.current = e.touches[0].clientX; // Set startX when touch starts
    };

    const handleTouchMove = (e: any) => {
        if (startX.current === null) {
            return;
        }

        const deltaX = e.touches[0].clientX - startX.current;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                console.log('Prev');
                const nextPage = (Number(filter?.currentPage) + 1).toString();
                dispatch(setFilter({ key: 'currentPage', value: nextPage }));
            } else {
                console.log('Next');
                const prevPage = (Number(filter?.currentPage) - 1).toString();
                dispatch(setFilter({ key: 'currentPage', value: prevPage }));
            }
            startX.current = null; // Reset startX after navigation
        }
    };

    const gerPageNumber = () => {
        return filter?.currentPage;
    };

    return (
        <div
            className='quran-page page'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <div className='page-content'>
                <QuranPageImage pageNumber={gerPageNumber() || ''} />
            </div>
        </div>
    );
};
