import {Button} from "../Button/Button";
import {SuraList} from "../../../quranData";
import './SuraModal.scss'
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";

interface Props {
    onSelect: ({value, key}: { key: string, value: string }) => void
}

export const SuraModal = (props: Props) => {
    const {filter} = useSelector(getTafseerState)

    return <div className='Sura-list'>
        {
            SuraList.map((sura, index) => {
                const suraName = sura[4]
                return <div key={suraName}>
                    <Button className={index === (filter && Number(filter?.currentSura)) ? 'active' : ''}
                            key={suraName}
                            style={{width: '100%'}}
                            onClick={() => props.onSelect({key: 'currentSura', value: index.toString()})}>
                        <span style={{display: "block"}}>{index + 1}</span>
                        <span>{suraName}</span>
                    </Button>
                </div>

            })
        }
    </div>
}
