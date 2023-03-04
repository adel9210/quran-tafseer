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


    return <div className='goz2-list'>
        {!filter?.currentPage && <p>قم بإختيار الجزء اولا</p>}

        <h2 className='goz2-list__heading'>الجزء</h2>

        <div className='goz2-list__items'>
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
        <h2 className='goz2-list__heading'>الأرباع</h2>
        <div className='goz2-list__hezb'>
            <div className='goz2-list__hezb__container'>
                <h2 className='goz2-list__hezb__container__heading button'>الحزب الأول</h2>
                {
                    Array(4).fill(1).map((_, index) => {
                        const id = index + 1
                        return <Button
                            onClick={() => onSelect({key: 'currentQuarter', value: id.toString()})}
                            className={id === (filter && Number(filter?.currentQuarter)) ? 'active' : ''}
                            key={index}>{id.toString()}</Button>
                    })
                }
            </div>
            <div className='goz2-list__hezb__container'>
                <h2 className='goz2-list__hezb__container__heading button'>الحزب الثانى</h2>
                {
                    Array(4).fill(1).map((_, index) => {
                        const id = index + 5
                        return <Button
                            onClick={() => onSelect({key: 'currentQuarter', value: id.toString()})}
                            className={id === (filter && Number(filter?.currentQuarter)) ? 'active' : ''}
                            key={index}>{id.toString()}</Button>
                    })
                }
            </div>
        </div>
    </div>
}
