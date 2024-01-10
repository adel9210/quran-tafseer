import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {ModalsContainer} from "./components/ModalsContainer/ModalsContainer";
import {BrowserRouter, RouterProvider} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <ModalsContainer/>
            <Container>
                <Header/>
                <Quran/>
            </Container>
        </div>
        </BrowserRouter>
    );
}

export default App;
