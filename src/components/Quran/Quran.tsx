import React from "react";
import {QuranPage} from "./QuranPage/QuranPage";
import {QuranTafseer} from "./QuranTafseer/QuranTafseer";
import './Quran.scss';
import {setFilter} from "../../redux/quran.slice";
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../redux/selectors";
import HTMLFlipBook from "react-pageflip";
import {QuranMarker} from "./QuranMarker/QuranMarker";
import {DemoBook} from "./FlipExample";

const isPageValid = (page: number) => {
    return page > 0 && page <= 604
}

export const Quran = () => {
    const dispatch = useDispatch();
    const {filter} = useSelector(getTafseerState)
    return <div className='quran-container'>
        <div className='quran'>
            <DemoBook />
            {/*<div className="quran__view">*/}
            {/*    <QuranPage/>*/}
            {/*    <QuranMarker/>*/}
            {/*    <QuranTafseer/>*/}
            {/*</div>*/}
        </div>
    </div>
}
