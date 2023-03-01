import React from "react";
import {QuranPage} from "./QuranPage/QuranPage";
import {QuranTafseer} from "./QuranTafseer/QuranTafseer";
import './Quran.scss';
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../redux/selectors";
import {QuranMarker} from "./QuranMarker/QuranMarker";
import {setFilter} from "../../redux/quran.slice";

const isPageValid = (page: number) => {
    return page > 0 && page <= 604
}

export const Quran = () => {
    const dispatch = useDispatch();
    const {filter} = useSelector(getTafseerState)

    const handleNavigation = (event: React.MouseEvent, state: 'next' | 'prev') => {
        event.preventDefault()
        const nextPage = (Number(filter?.currentPage) + (state === 'next' ? 1 : -1))

        if (!isPageValid(nextPage)) {
            return;
        }

        if (state === 'next') {
            dispatch(setFilter({
                key: 'currentPage',
                value: nextPage.toString()
            }))
        } else {
            dispatch(setFilter({
                key: 'currentPage',
                value: nextPage.toString()
            }))
        }
    }

    return <div className='quran-container'>
        <div className='quran'>
            <div className="quran__view"
                 style={{flexDirection: Number(filter?.currentPage) % 2 === 0 ? 'row-reverse' : 'row'}}>
                <QuranPage/>
                <QuranMarker/>
                <QuranTafseer/>
            </div>

            <div className='quran__controls'>
                <a href="" onClick={(e) => handleNavigation(e, 'prev')} title='Prev'>
                    <img src={require('../../assets/images/right-arrow.png')} alt=''/>
                </a>
                <a href="" onClick={(e) => handleNavigation(e, 'next')} title='Next'>
                    <img src={require('../../assets/images/left-arrow.png')} alt=''/>
                </a>
            </div>
        </div>
    </div>
}
