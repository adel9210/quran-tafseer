import React, {useCallback, useState} from 'react';
import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import {Modal} from "./components/ui-components/Modal/Modal";
import {SuraModal} from "./components/ui-components/SuraModal/SuraModal";
import {useDispatch, useSelector} from "react-redux";
import {getActiveModals} from "./redux/selectors";
import {setActiveModal} from "./redux/quran.slice";

function App() {
    const {isSuraModalOpen, isAyaModalOpen, isPageModalOpen} = useSelector(getActiveModals)
    const dispatch = useDispatch()

    const resetModal = useCallback((activateModalKey:string) => {
        dispatch(setActiveModal({[activateModalKey]: false}))
    }, [])

    return (
        <div className="App">
            {isSuraModalOpen && <Modal title='إختر السورة' onClose={()=> resetModal('isSuraModalOpen')}>
                <SuraModal/>
            </Modal>
            }
            <Header/>
            <Quran/>
        </div>
    );
}

export default App;
