import React from "react";
import {QuranPage} from "./QuranPage/QuranPage";
import {QuranTafseer} from "./QuranTafseer/QuranTafseer";
import {QuranMarker} from "./QuranMarker/QuranMarker";
import './Quran.scss';

export const Quran = () => {
    return <div className='quran-container'>
        <div className='quran'>
            <div className="quran__view">
                <QuranPage/>
                <QuranMarker/>
                <QuranTafseer/>
            </div>
            <div className='quran__controls'>
                <a href="">
                    <img src={require('../../assets/images/right-arrow.png')}  alt=''/>
                </a>
                <a href="">
                    <img src={require('../../assets/images/left-arrow.png')}  alt=''/>
                </a>
            </div>
        </div>
    </div>
}
