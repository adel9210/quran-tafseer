import React from "react";
import {QuranPage} from "./QuranPage/QuranPage";
import {QuranTafseer} from "./QuranTafseer/QuranTafseer";
import {Header} from "../Header/Header";
import {QuranMarker} from "./QuranMarker/QuranMarker";
import './Quran.scss';

export const Quran = () => {
    return <div className='quran'>
        <Header/>
        <div className="quran__view">
            <QuranPage/>
            <QuranMarker/>
            <QuranTafseer/>
        </div>
    </div>
}
