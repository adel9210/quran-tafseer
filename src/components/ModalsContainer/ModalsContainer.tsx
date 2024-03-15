import {Modal} from "../ui-components/Modal/Modal";
import {SuraModal} from "../ui-components/SuraModal/SuraModal";
import {AyaModal} from "../ui-components/AyaModal/AyaModal";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getActiveModals, getTafseerState} from "../../redux/selectors";
import {setActiveModal} from "../../redux/quran.slice";
import {PageModal} from "../ui-components/PageModal/PageModal";
import {ModalTypes} from "../../types";
import {Goz2Modal} from "../ui-components/Goz2Modal/Goz2Modal";
import {TafseerModal} from "../ui-components/TafseerModal/TafseerModal";
import {MobileFilterModal} from "../ui-components/MobileFilterModal/MobileFilterModal";
import {TafseerIframeModal} from "../ui-components/TafseerIframeModal/TafseerIframeModal";
import {isMobile} from "../../lib";

export const ModalsContainer = () => {
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)

    const {
        isSuraModalOpen,
        isAyaModalOpen,
        isPageModalOpen,
        isGoz2ModalOpen,
        isTafseerIframeModalOpen,
        isTafseerModalOpen,
        isMobileFilterModalOpen
    } = useSelector(getActiveModals);

    const resetModal = useCallback((activateModalKey: ModalTypes) => {
        dispatch(setActiveModal({[activateModalKey]: false}))
    }, [])


    return <>
        {isSuraModalOpen && <Modal key={1} title='إختر السورة' onClose={() => resetModal('isSuraModalOpen')}>
            <SuraModal/>
        </Modal>
        }

        {isAyaModalOpen && <Modal key={2} title='إختر الايه' onClose={() => resetModal('isAyaModalOpen')}>
            <AyaModal/>
        </Modal>
        }
        {isTafseerModalOpen && <Modal key={3} title='' onClose={() => resetModal('isTafseerModalOpen')}>
            <TafseerIframeModal/>
        </Modal>
        }

        {isPageModalOpen && <Modal key={4} title='إختر الصفحة' onClose={() => resetModal('isPageModalOpen')}>
            <PageModal/>
        </Modal>
        }


        {isMobileFilterModalOpen &&
            <Modal isOutSideClose={true} key={5} style={{zIndex: 19}} title='بحث' onClose={() => resetModal('isMobileFilterModalOpen')}>
                <MobileFilterModal/>
            </Modal>
        }


        {isTafseerIframeModalOpen &&
            <Modal isOutSideClose={true} key={5} style={{zIndex: 19}} title='' onClose={() => resetModal('isTafseerIframeModalOpen')}>
                <TafseerIframeModal/>
            </Modal>
        }

        {isGoz2ModalOpen && <Modal key={6} title='إختر الجزء' onClose={() => resetModal('isGoz2ModalOpen')}>
            <Goz2Modal/>
        </Modal>
        }
    </>
}
