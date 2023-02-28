import {Button} from "../Button/Button";
import './PageModal.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {setActiveModal, setFilter} from "../../../redux/quran.slice";
import {filterTypes} from "../../../types";


export const PageModal = () => {
    const {filter} = useSelector(getTafseerState)
    const dispatch = useDispatch()

    const onSelect = (data: { key: filterTypes, value: string }) => {
        dispatch(setFilter(data))
        dispatch(setActiveModal({['isPageModalOpen']: false}))
    }


    return <div className='list'>
        {!filter?.currentPage && <p>قم بإختيار الصفحة اولا</p>}

        {
            Array(604).fill('1').map((page, index) => {
                const pageNumber = index + 1
                return <Button key={pageNumber}
                               className={pageNumber === (filter && Number(filter?.currentPage)) ? 'active' : ''}
                               onClick={() => onSelect({key: 'currentPage', value: pageNumber.toString()})}>
                    <span>{pageNumber}</span>
                </Button>

            })
        }
    </div>
}
