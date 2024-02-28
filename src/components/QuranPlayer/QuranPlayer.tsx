import AudioPlayer from "react-h5-audio-player";
import {useCallback, useRef, useState} from "react";
import {changeHighlighterActiveId, setFilter, setSuraInfo} from "../../redux/quran.slice";
import {getSuraDetails} from "../../services/client.service";
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../redux/selectors";

export const QuranPlayer = ()=> {
    const [shouldPlay, setShouldPlay] = useState(false);
    const playerRef = useRef<any>();
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)

    const CustomStopButton = (props: { onClick: () => void }) => {
        return <button onClick={props.onClick} aria-label="Stop"
                       className="rhap_button-clear rhap_main-controls-button rhap_play-pause-button"
                       type="button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M15 9H9V15H15V9Z" fill="#868686"></path>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          fill="#868686"></path>
                </g>
            </svg>
        </button>
    }

    const getCurrentLink = useCallback(() => {
        const sura = Number(filter?.currentSura).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})
        const aya = Number(filter?.currentAya).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})
        const sheikh = filter?.currentSheikh;

        setHighlighterId()
        return `https://al-thalabi.com/mp3/${sheikh}/${sura}${aya}.mp3`
    }, [filter])

    const goToNextAya = () => {
        if (ifLastAyaInSurah(filter?.currentAya)) {
            const nextSuraIndex = Number(filter?.currentSura) + 1
            dispatch(setSuraInfo(getSuraDetails(nextSuraIndex)))
            dispatch(setFilter({
                key: 'currentSura',
                value: nextSuraIndex.toString()
            }))
        } else {
            dispatch(setFilter({
                key: 'currentAya',
                value: (Number(filter?.currentAya) + 1).toString()
            }))
        }
    }

    const ifLastAyaInSurah = (aya?: string) => {
        const currentSurah = getSuraDetails(Number(filter?.currentSura))
        return Number(aya) === currentSurah.ayaCount;
    }

    const setHighlighterId = () => {
        dispatch(changeHighlighterActiveId(getHighlighterIdConcatWithSuraAndAya()))
    }

    const getHighlighterIdConcatWithSuraAndAya = () => {
        return `${filter?.currentSura}_${filter?.currentAya}`
    }


    return <div className='header__pair__item header__pair__item__control'>
        <AudioPlayer
            ref={playerRef}
            customAdditionalControls={[<CustomStopButton onClick={() => {
                setShouldPlay(false)
                playerRef.current.audio.current.pause()
            }}/>]}
            style={{direction: 'ltr'}}
            autoPlay={false}
            src={getCurrentLink()}
            onPlay={e => {
                setShouldPlay(true)
            }}
            autoPlayAfterSrcChange={shouldPlay}
            onEnded={goToNextAya}
        />
    </div>
}