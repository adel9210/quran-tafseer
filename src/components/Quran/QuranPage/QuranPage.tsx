import './QuranPage.scss';
import {QuranData} from "../../../quranData";
import {Highlighter} from "./Highlighter/Highlighter";

export const QuranPage = () => {
    return <div className='quran-page'>
        <img className='quran-page__img' src={require('../../../assets/images/3.png')} alt='3'/>
        {
            Object.entries(QuranData).map((aya, ayaIndex) => {
                const [ayaId, ayaHighlighters] = aya
                return ayaHighlighters.map((highlighter, index) => {
                    const [width, top, left, isSingle] = highlighter;

                    return <Highlighter
                        key={ayaId + index} top={top}
                        left={left}
                        width={width}
                        ayaNumber={ayaId}
                        isSingleHighlighter={isSingle === 1}
                        highlighterIndex={index + 1}/>
                })
            })
        }
    </div>
}
