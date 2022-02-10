import { Component } from 'react';

import './App.scss';

import Header from '../header/Header';
import Filters from '../filters/Filters';
import Schedule from '../schedule/Schedule';

class App extends Component{
    state = {
        
    }


    render (){
        return (
            <>
                <Header group="СПБ-901-01" faculty="Факультет компьютерных наук"/>
                <Filters/>
                <Schedule/>
            </>
        );
    }
}

export default App;