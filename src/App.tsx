import React from 'react';
import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Quran/>
        </div>
    );
}

export default App;
