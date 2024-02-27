import React, {useEffect, useState} from "react";
import {QuranPage} from "./QuranPage/QuranPage";
import {QuranTafseer} from "./QuranTafseer/QuranTafseer";
import './Quran.scss';
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../redux/selectors";
import {QuranMarker} from "./QuranMarker/QuranMarker";
import {setBulkFilters, setFilter} from "../../redux/quran.slice";
import {useLocation} from 'react-router-dom';
import {QuranPlayer} from "../QuranPlayer/QuranPlayer";
import {isMobile} from "../../lib";

const isPageValid = (page: number) => {
    return page > 0 && page <= 604
}

export const Quran = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {filter} = useSelector(getTafseerState)
    const isMobileDevice = isMobile()
    const [zoomLevel, setZoomLevel] = useState(100);

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

    const objectToUrlParams = (obj: Record<string, string | number>): string => {
        return Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    const updateUrlWithParams = (paramsObject: any): void => {
        const currentUrl = new URL(window.location.href);
        const urlParams = objectToUrlParams(paramsObject);

        // Set or update the query parameters
        currentUrl.search = urlParams;

        // Replace the current URL with the updated one
        window.history.replaceState(null, '', currentUrl.toString());
    }

    useEffect(() => {
        updateUrlWithParams(filter)
    }, [filter]);


    const calculateZoomLevel = () => {
        const deviceWidth =  document.documentElement.clientWidth || document.body.clientWidth;
        const paddingSize = 30;
        const imageWidth = 456;
        if (deviceWidth < 960) {
            const calculatedZoomLevel = ((deviceWidth - paddingSize) / imageWidth) * 100;
            setZoomLevel(calculatedZoomLevel > 100 ? 100 : calculatedZoomLevel);
        }
    };

    useEffect(() => {
        calculateZoomLevel();
        window.addEventListener('resize', calculateZoomLevel);

        return () => {
            window.removeEventListener('resize', calculateZoomLevel);
        };
    }, []);


    useEffect(() => {
        const getUrlParams = (search: string): Record<string, string> => {
            const params = new URLSearchParams(search);
            const paramsObject: Record<string, string> = {};

            params.forEach((value, key) => {
                paramsObject[key] = value;
            });

            return paramsObject;
        };

        const urlParams = getUrlParams(location.search) as any;
        if (Object.entries(urlParams).length) {
            dispatch(setBulkFilters(urlParams))
        }
    }, [location.search, dispatch]);


    return <div className='quran-container'>
        <div className={`quran ${isMobileDevice ? 'quran--mobile' : ''}`}>
            <div className="quran__view"
                 style={{flexDirection: Number(filter?.currentPage) % 2 === 0 ? 'row-reverse' : 'row', zoom: `${zoomLevel}%`}}>
                <QuranPage/>
                {/*{!isMobileDevice && <QuranMarker/>}*/}
                <QuranTafseer/>
            </div>

            {
                !isMobile() && <div className='quran__controls'>
                    <a href="" onClick={(e) => handleNavigation(e, 'prev')} title='Prev'>

                        <svg width="69px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             fill="#000000">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>arrow-right-circle</title>
                                <desc>Created with Sketch Beta.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Icon-Set-Filled" transform="translate(-310.000000, -1089.000000)" fill="#00a79d">
                                        <path
                                            d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z"
                                            id="arrow-right-circle"></path>
                                    </g>
                                </g>
                            </g>

                        </svg>
                        {/*<img src={require('../../assets/images/arrow-right.svg').default} alt=''/>*/}
                    </a>
                    <a href="" onClick={(e) => handleNavigation(e, 'next')} title='Next'>

                        <svg width="69px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             fill="#000000">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"><title>arrow-left-circle</title>
                                <desc>Created with Sketch Beta.</desc>
                                <defs></defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Icon-Set-Filled" transform="translate(-258.000000, -1089.000000)" fill="#00a79d">
                                        <path
                                            d="M281,1106 L270.414,1106 L274.536,1110.12 C274.926,1110.51 274.926,1111.15 274.536,1111.54 C274.145,1111.93 273.512,1111.93 273.121,1111.54 L267.464,1105.88 C267.225,1105.64 267.15,1105.31 267.205,1105 C267.15,1104.69 267.225,1104.36 267.464,1104.12 L273.121,1098.46 C273.512,1098.07 274.145,1098.07 274.536,1098.46 C274.926,1098.86 274.926,1099.49 274.536,1099.88 L270.414,1104 L281,1104 C281.552,1104 282,1104.45 282,1105 C282,1105.55 281.552,1106 281,1106 L281,1106 Z M274,1089 C265.164,1089 258,1096.16 258,1105 C258,1113.84 265.164,1121 274,1121 C282.836,1121 290,1113.84 290,1105 C290,1096.16 282.836,1089 274,1089 L274,1089 Z"
                                            id="arrow-left-circle"></path>
                                    </g>
                                </g>
                            </g>

                        </svg>
                        {/*<img src={require('../../assets/images/arrow-left.svg').default} alt=''/>*/}
                    </a>
                </div>
            }

            <div className='quran__player'>
                {isMobileDevice && <QuranPlayer/>}
            </div>
        </div>
    </div>
}
