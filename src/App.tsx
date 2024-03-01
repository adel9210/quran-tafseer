import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {ModalsContainer} from "./components/ModalsContainer/ModalsContainer";
import {BrowserRouter} from "react-router-dom";
import {MobileHeader} from "./components/MobileHeader/MobileHeader";
import {isMobile} from "./lib";
import {useEffect} from "react";

function App() {
    const isMobileDevice = isMobile()

    useEffect(() => {
        const preventContextMenu = (e:any) => {
            e.preventDefault();
        };

        document.addEventListener('contextmenu', preventContextMenu);

        return () => {
            document.removeEventListener('contextmenu', preventContextMenu);
        };
    }, []);



    return (
        <BrowserRouter>
            <div className="App">
                <ModalsContainer/>
                <Container>
                    {isMobileDevice ? <MobileHeader/> : <Header showPlayer={true} showLogo={true}/>}
                    <Quran/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
