import React, {useCallback} from 'react';
import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import {Modal} from "./components/ui-components/Modal/Modal";
import {SuraModal} from "./components/ui-components/SuraModal/SuraModal";
import {useDispatch, useSelector} from "react-redux";
import {getActiveModals} from "./redux/selectors";
import {setActiveModal, setValue} from "./redux/quran.slice";
import {AyaModal} from "./components/ui-components/AyaModal/AyaModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";

function App() {
    const {isSuraModalOpen, isAyaModalOpen, isPageModalOpen} = useSelector(getActiveModals)
    const dispatch = useDispatch()

    const resetModal = useCallback((activateModalKey: string) => {
        dispatch(setActiveModal({[activateModalKey]: false}))
    }, [])

    const onSelectValue = ({value, key}: { key: string, value: string }, modalId: string) => {
        dispatch(setValue({value, key}))
        resetModal(modalId)
    }

    return (
        <div className="App">
            {isSuraModalOpen && <Modal title='إختر السورة' onClose={() => resetModal('isSuraModalOpen')}>
                <SuraModal onSelect={(data) => onSelectValue(data, 'isSuraModalOpen')}/>
            </Modal>
            }

            {isAyaModalOpen && <Modal title='إختر الايه' onClose={() => resetModal('isAyaModalOpen')}>
                <AyaModal onSelect={(data) => onSelectValue(data, 'isAyaModalOpen')}/>
            </Modal>
            }
            <Container >
                <Header/>
                <Quran/>
            </Container>
        </div>
    );
}

export default App;
