import {Button} from "../Button/Button";
import './AyaModal.scss'
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {SuraList} from "../../../quranData";

interface Props {
    onSelect: ({value, key}: { key: string, value: string }) => void
}

export const AyaModal = (props: Props) => {
    const {filter} = useSelector(getTafseerState)

    const arrayRange = (start: number, stop: number, step: number) =>
        Array.from(
            {length: (stop - start) / step + 1},
            (value, index) => start + index * step
        );

    return <div className='list'>
        {!filter?.currentSura && <p>قم بإختيار السورة اولا</p>}

        {
            filter?.currentSura && arrayRange(0, SuraList[+filter?.currentSura][1], 1).map((sura, index) => {
                const AyaNumber = index
                return <Button key={AyaNumber}
                               className={index === (filter && Number(filter?.currentAya)) ? 'active' : ''}
                               onClick={() => props.onSelect({key: 'currentAya', value: (index + 1).toString()})}>
                    <span>{AyaNumber + 1}</span>
                </Button>

            })
        }
    </div>
}