import React, {useEffect} from 'react';
import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {SuraList} from "./quranData";
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

    return (
        <div className="App">
            <ModalsContainer />
            <Container>
                <Header/>
                <Quran/>
            </Container>
        </div>
    );
}

export default App;
