import './Header.scss'
import Select from "react-select";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import 'react-h5-audio-player/src/styles.scss'
import {SelectModal} from "../ui-components/SelectModal/SelectModal";
import {useDispatch, useSelector} from "react-redux";
import {changeHighlighterActiveId, setActiveModal, setFilter, setSuraInfo} from "../../redux/quran.slice";
import {getTafseerState} from "../../redux/selectors";
import {useCallback, useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {getSuraDetails, getSuraList} from "../../services/client.service";
import {ModalTypes, Sura} from "../../types";

const tafseerOptions = [
    {value: 'th3labe', label: 'الثعلبي'},
    {value: 'option 1', label: 'السعدي'},
    {value: 'option 2', label: 'البغوي'},
    {value: 'option 3', label: 'ابن كثير'},
    {value: 'option 4', label: 'القرطبي'},
    {value: 'option 5', label: 'الطبري'},
]

const tafseerLanguage = [
    {value: 'ar', label: 'عربي التفسير الميسر'},
    {value: 'en', label: 'English - Sahih International'},
]

const sheikhOptions = [
    {value: 'Husary_64kbps', label: 'الحصري'},
    {value: 'Nasser_Alqatami_128kbps', label: 'ناصر القطامي'},
    {value: 'Abdul_Basit_Murattal_64kbps', label: 'عبدالباسط عبدالصمد'},
    {value: 'Minshawy_Murattal_128kbps', label: 'المنشاوي'},
    {value: 'Alafasy_64kbps', label: 'مشاري العفاسي'},
]

const style = {
    control: (base: any) => ({
        ...base,
        // This line disable the blue border
        boxShadow: 'none',
        '&:hover, &:active': {
            borderColor: '#00A79D',
            outlineColor: '#00A79D',
        }
    })
};

export const Header = () => {
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)
    const [selectedSura, setSelectedSura] = useState<Sura>()
    const [shouldPlay, setShouldPlay] = useState(false);
    const playerRef = useRef<any>();

    console.log('STATE IS', filter)

    const getCurrentLink = useCallback(() => {
        const sura = Number(filter?.currentSura).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})
        const aya = Number(filter?.currentAya).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})
        const sheikh = filter?.currentSheikh;

        setHighlighterId()
        return `https://quran.ksu.edu.sa/ayat/mp3/${sheikh}/${sura}${aya}.mp3`
    }, [filter])

    const onModalSelectClick = (type: ModalTypes) => {
        dispatch(setActiveModal({[type]: true}))
    }

    const getHighlighterIdConcatWithSuraAndAya = () => {
        return `${filter?.currentSura}_${filter?.currentAya}`
    }


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

    useEffect(() => {
        if (filter?.currentSura) {
            const response = getSuraDetails(Number(filter.currentSura))
            setSelectedSura(response)
        }

    }, [filter])

    return <div className='header'>
        <Container>
            <Row>
                <Col md={2} className='co-left-border'>
                    <img src={require('../../assets/images/logo.png')} alt='Logo' height={190}/>
                </Col>
                <Col md={5} className='co-left-border'>
                    <div className='header__pair'>
                        <div className='header__pair__item'>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>البحث</label>
                                <input className='co-input' placeholder='إختر'/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>التفسير</label>
                                <Select isDisabled={true} styles={style} options={tafseerOptions}
                                        placeholder='الثعلبي'/>
                            </div>
                        </div>
                        <div className='header__pair__item'>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>السورة</label>
                                <SelectModal value={selectedSura?.arabicName} placeholder='إختر'
                                             onClick={() => onModalSelectClick('isSuraModalOpen')}/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>الأية</label>
                                <SelectModal placeholder='إختر' value={filter?.currentAya}
                                             onClick={() => onModalSelectClick('isAyaModalOpen')}/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>الصفحة</label>
                                <SelectModal value={filter?.currentPage} placeholder='إختر'
                                             onClick={() => onModalSelectClick('isPageModalOpen')}/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>الجزء</label>
                                <SelectModal value={filter?.currentGoz2} placeholder='إختر'
                                             onClick={() => onModalSelectClick('isGoz2ModalOpen')}/>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={5}>
                    <div className='header__pair'>
                        <div className='header__pair__item'>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>القارئ</label>
                                <Select
                                    defaultValue={sheikhOptions[0]}
                                    styles={style} options={sheikhOptions}
                                    onChange={(item) => {
                                        console.log(item?.value)
                                        dispatch(setFilter({
                                            key: 'currentSheikh',
                                            value: item?.value || ''
                                        }))
                                    }}
                                    placeholder='إختر'/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>لغة التفسير</label>
                                <Select styles={style}
                                        options={tafseerLanguage}
                                        onChange={(item) => {
                                            dispatch(setFilter({
                                                key: 'tafseerLang',
                                                value: item?.value || ''
                                            }))
                                        }}
                                        placeholder='إختر'/>
                            </div>
                        </div>
                        <div className='header__pair__item header__pair__item__control'>
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
                                // onPause={e => setShouldPlay(false)}
                                autoPlayAfterSrcChange={shouldPlay}
                                onEnded={goToNextAya}
                                // other props here
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}


const CustomStopButton = (props: { onClick: () => void }) => {
    return <button onClick={props.onClick} aria-label="Stop"
                   className="rhap_button-clear rhap_main-controls-button rhap_play-pause-button"
                   type="button">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M15 9H9V15H15V9Z" fill="#868686"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      fill="#868686"></path>
            </g>
        </svg>
    </button>
}