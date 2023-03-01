import {Button} from "../Button/Button";
import './Goz2Modal.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {setActiveModal, setFilter} from "../../../redux/quran.slice";
import {filterTypes} from "../../../types";


export const Goz2Modal = () => {
    const {filter} = useSelector(getTafseerState)
    const dispatch = useDispatch()

    const onSelect = (data: { key: filterTypes, value: string }) => {
        dispatch(setFilter(data))
        dispatch(setActiveModal({['isGoz2ModalOpen']: false}))
    }


    return <div className='list'>
        {!filter?.currentPage && <p>قم بإختيار الجزء اولا</p>}

        {
            Array(30).fill('1').map((goz2, index) => {
                const goz2Number = index + 1
                return <Button key={goz2Number}
                               className={goz2Number === (filter && Number(filter?.currentGoz2)) ? 'active' : ''}
                               onClick={() => onSelect({key: 'currentGoz2', value: goz2Number.toString()})}>
                    <span>{goz2Number}</span>
                </Button>

            })
        }
    </div>
}
