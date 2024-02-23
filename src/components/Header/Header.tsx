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
import {QuranPlayer} from "../QuranPlayer/QuranPlayer";

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
    {value: 'SalahBathman_64kbps', label: 'صلاح باعثمان'},
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

interface Props {
    showLogo?: boolean
    showPlayer?: boolean
}

export const Header = (props: Props) => {
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)
    const [selectedSura, setSelectedSura] = useState<Sura>()
    const {showLogo , showPlayer } = props

    const onModalSelectClick = (type: ModalTypes) => {
        dispatch(setActiveModal({[type]: true}))
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
                {showLogo && <Col md={2} className='co-left-border'>
                    <img src={require('../../assets/images/logo.png')} alt='Logo' height={190}/>
                </Col>}
                <Col xs={12} md={5} className='co-left-border'>
                    <div className='header__pair'>
                        <div className='header__pair__item'>
                            {/*<div className='header__pair__item__control'>*/}
                            {/*    <label className='header__pair__item__control__label'>البحث</label>*/}
                            {/*    <input className='co-input' placeholder='إختر'/>*/}
                            {/*</div>*/}
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
                <Col xs={12} md={5}>
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
                            {/*<div className='header__pair__item__control'>*/}
                            {/*    <label className='header__pair__item__control__label'>لغة التفسير</label>*/}
                            {/*    <Select styles={style}*/}
                            {/*            options={tafseerLanguage}*/}
                            {/*            onChange={(item) => {*/}
                            {/*                dispatch(setFilter({*/}
                            {/*                    key: 'tafseerLang',*/}
                            {/*                    value: item?.value || ''*/}
                            {/*                }))*/}
                            {/*            }}*/}
                            {/*            isDisabled={true}*/}
                            {/*            placeholder='عربي'/>*/}
                            {/*</div>*/}
                        </div>
                        {
                            showPlayer && <QuranPlayer/>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}


