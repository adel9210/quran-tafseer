import React, {useEffect, useRef, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import {QuranPage} from "./QuranPage/QuranPage";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../redux/quran.slice";
import {getTafseerState} from "../../redux/selectors";

export const DemoBook = () => {
    const flipBookRef = useRef<any>()
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)
    const [activePage, setActivePage] = useState<number>()

    const onPage = (event: Record<string, number>) => {
        setActivePage(event.data)
        // dispatch(setFilter({
        //     key: 'currentPage',
        //     value: event.data.toString()
        // }))
    };


    const handleNavigation = (event: React.MouseEvent, state: 'next' | 'prev') => {
        event.preventDefault()
        if (state === 'next') {
            flipBookRef?.current?.pageFlip().flipPrev();
        } else {
            flipBookRef?.current?.pageFlip().flipNext();
        }
    }


    useEffect(() => {
        if (Number(filter?.currentPage) !== activePage) {
            const flip = flipBookRef?.current?.pageFlip()
            if (flip){
                flip.turnToPage?.(Number(filter?.currentPage))
            }
        }
    }, [filter])

    return (
        <div>
            {/*@ts-ignore*/}
            <HTMLFlipBook
                width={950 / 2}
                height={690}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="demo-book"
                ref={flipBookRef}
                onFlip={onPage}
            >
                {
                    Array.from(Array(604).keys()).map((page) => <QuranPage key={page}
                                                                                     pageNumber={(page + 1).toString()}/>)
                }

            </HTMLFlipBook>
            <div className='quran__controls'>
                <a href="" onClick={(e) => handleNavigation(e, 'prev')}>
                    <img src={require('../../assets/images/right-arrow.png')} alt=''/>
                </a>
                <a href="" onClick={(e) => handleNavigation(e, 'next')}>
                    <img src={require('../../assets/images/left-arrow.png')} alt=''/>
                </a>
            </div>
        </div>
    );
}

