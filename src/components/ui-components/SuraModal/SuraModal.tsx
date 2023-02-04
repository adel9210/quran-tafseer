import {Button} from "../Button/Button";
import {SuraList} from "../../../quranData";
import './SuraModal.scss'

export const SuraModal = () => {
    return <div className='list'>
        {
            SuraList.map((sura, index) => {
                const suraName = sura[4]
                return <Button key={suraName}>
                    <span style={{display: "block"}}>{index + 1}</span>
                    <span>{suraName}</span>
                </Button>

            })
        }
    </div>
}