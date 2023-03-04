import React, {useEffect} from 'react';
import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {HizbQaurter, QuranGoz2, QuranPages, SuraList} from "./quranData";
import {ModalsContainer} from "./components/ModalsContainer/ModalsContainer";

function App() {


    // useEffect(() => {
    //     const jsonData = SuraList.map((item, index) => {
    //         const [start, ayaCount, order, ruks, arabicName, frankName, englishName, suraType, pageStart, pageEnd] = item
    //         return {
    //             index: index + 1,
    //             arabicName,
    //             englishName,
    //             frankName,
    //             ayaCount,
    //             suraType,
    //             pageStart,
    //             pageEnd
    //         }
    //     })
    //
    //     console.log(JSON.stringify(jsonData))
    // }, [])

    useEffect(() => {
        const jsonData = HizbQaurter.map((item, index) => {
            const [sura, aya] = item
            return {
                quarterIndex: index + 1,
                suraNumber: sura > 114 ? 114 : sura,
                ayaNumber: aya,
                pageNumber: 1,
                // page: (()=>{
                //     return QuranPages.filter((p, pageIndex) => {
                //         const [suraN, ayaN] = p
                //         if (suraN === sura && ayaN === aya) {
                //             return pageIndex + 1
                //         }
                //     })
                // })()[0]
            }
        })

        // console.log(JSON.stringify(jsonData))
    }, [])

    // useEffect(() => {
    //     const jsonData = QuranPages.map((item, index) => {
    //         const [sura, aya] = item
    //         return {
    //             pageNumber: (index + 1) > 604 ? 604 : index + 1,
    //             suraNumber: sura > 114 ? 114 : sura,
    //             ayaNumber: aya
    //         }
    //     })
    //
    //
    //     // console.log(jsonData.length)
    //
    //     console.log(JSON.stringify(jsonData))
    // }, [])

    // useEffect(() => {
    //     const jsonData = QuranGoz2.map((item, index) => {
    //         const [sura, aya] = item
    //         return {
    //             goz2Number: (index + 1) > 30 ? 30 : index + 1,
    //             suraNumber: sura > 114 ? 114 : sura,
    //             ayaNumber: aya
    //         }
    //     })
    //
    //
    //     // console.log(jsonData.length)
    //
    //     console.log(JSON.stringify(jsonData))
    // }, [])

    return (
        <div className="App">
            <ModalsContainer/>
            <Container>
                <Header/>
                <Quran/>
            </Container>
        </div>
    );
}

export default App;
