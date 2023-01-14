import './QuranMarker.scss';

export const QuranMarker = () => {
    return <div className='quran-marker'>
        <img className='quran-marker__img' src={require('../../../assets/images/marker.png')} alt='Marker'/>
    </div>
}
