import './QuranPage.scss';
import {QuranDataPageDetails} from "../../../quranData";
import {Highlighter} from "./Highlighter/Highlighter";

export const QuranPage = () => {
    return <div className='quran-page'>
        <img className='quran-page__img' src={require('../../../assets/images/3.png')} alt='3'/>
        {
            QuranDataPageDetails.map(({highlighterId, ayaNumber, styles}, index) => {
                const [width, top, left] = styles
                return <Highlighter
                    key={ayaNumber + index}
                    top={top}
                    left={left}
                    width={width}
                    ayaNumber={ayaNumber}
                    highlighterId={highlighterId}/>
            })

        }
    </div>
}
