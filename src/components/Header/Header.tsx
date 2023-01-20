import './Header.scss'
import Select from "react-select";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import 'react-h5-audio-player/src/styles.scss'
const options = [
    {value: 'option 1', label: 'الخيار رقم 5'},
    {value: 'option 2', label: 'الخيار رقم 5'},
    {value: 'option 3', label: 'الخيار رقم 5'}
]

export const Header = () => {
    return <div className='header'>
        <div className='header__pair'>
            <div className='header__pair__item'>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>البحث</label>
                    <Select options={options}/>
                </div>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>التفسير</label>
                    <Select options={options}/>
                </div>
            </div>
            <div className='header__pair__item'>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>السورة</label>
                    <Select options={options}/>
                </div>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>الأية</label>
                    <Select options={options}/>
                </div>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>الصفحة</label>
                    <Select options={options}/>
                </div>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>الجزء</label>
                    <Select options={options}/>
                </div>

            </div>
        </div>
        <div className='header__pair'>
            <div className='header__pair__item'>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>القارئ</label>
                    <Select options={options}/>
                </div>
                <div className='header__pair__item__control'>
                    <label className='header__pair__item__control__label'>إعدادات التكرار</label>
                    <Select options={options}/>
                </div>
            </div>
            <div className='header__pair__item'>
                <AudioPlayer
                    style={{direction: 'ltr'}}
                    autoPlay
                    src="https://quran.ksu.edu.sa/ayat/mp3/Husary_64kbps/002007.mp3"
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />
            </div>
        </div>
    </div>
}

