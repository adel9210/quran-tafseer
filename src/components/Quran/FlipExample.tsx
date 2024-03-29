import React, {useCallback, useEffect, useRef, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import {QuranPage} from "./QuranPage/QuranPage";
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../redux/selectors";

export const DemoBook = () => {
    const flipBookRef = useRef<any>()
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)
    const [activePage, setActivePage] = useState<number>()

    const onPage = useCallback((event: Record<string, number>) => {
        // setActivePage((oldValue) => {
        //     const newValue = event.data
        //     if (newValue !== oldValue) {
        //         dispatch(setFilter({
        //             key: 'currentPage',
        //             value: newValue.toString()
        //         }))
        //     }
        //     return newValue
        // })

    }, [activePage])


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
                setTimeout(() => {
                    const nextPage = Number(filter?.currentPage)
                    flip.flip?.(nextPage)
                }, 500)
            }
        }
    }, [filter])

    return (
        <div>
            {/*@ts-ignore*/}
            {/*<HTMLFlipBook*/}
            {/*    width={950 / 2}*/}
            {/*    height={690}*/}
            {/*    maxShadowOpacity={0.5}*/}
            {/*    showCover={false}*/}
            {/*    mobileScrollSupport={false}*/}
            {/*    className="demo-book"*/}
            {/*    ref={flipBookRef}*/}
            {/*    onFlip={onPage}*/}
            {/*    startPage={1}*/}
            {/*    startZIndex={1}*/}
            {/*>*/}
                {
                    Array.from(Array(604).keys()).map((page) => {
                        return <QuranPage key={page}/>
                    })
                }

            {/*</HTMLFlipBook>*/}
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

