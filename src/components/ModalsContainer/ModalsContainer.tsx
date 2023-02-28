import {Modal} from "../ui-components/Modal/Modal";
import {SuraModal} from "../ui-components/SuraModal/SuraModal";
import {AyaModal} from "../ui-components/AyaModal/AyaModal";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getActiveModals} from "../../redux/selectors";
import {setActiveModal} from "../../redux/quran.slice";
import {PageModal} from "../ui-components/PageModal/PageModal";
import {ModalTypes} from "../../types";
import {Goz2Modal} from "../ui-components/Goz2Modal/Goz2Modal";

export const ModalsContainer = () => {
    const dispatch = useDispatch()

    const {isSuraModalOpen, isAyaModalOpen, isPageModalOpen, isGoz2ModalOpen} = useSelector(getActiveModals)
    const resetModal = useCallback((activateModalKey: ModalTypes) => {
        dispatch(setActiveModal({[activateModalKey]: false}))
    }, [])


    return <>
        {isSuraModalOpen && <Modal title='إختر السورة' onClose={() => resetModal('isSuraModalOpen')}>
            <SuraModal/>
        </Modal>
        }

        {isAyaModalOpen && <Modal title='إختر الايه' onClose={() => resetModal('isAyaModalOpen')}>
            <AyaModal/>
        </Modal>
        }
        {isPageModalOpen && <Modal title='إختر الصفحة' onClose={() => resetModal('isPageModalOpen')}>
            <PageModal/>
        </Modal>
        }

        {isGoz2ModalOpen && <Modal title='إختر الجزء' onClose={() => resetModal('isGoz2ModalOpen')}>
            <Goz2Modal/>
        </Modal>
        }
    </>
}
