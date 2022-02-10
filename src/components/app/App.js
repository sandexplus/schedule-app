import { Component } from 'react';

import './App.scss';

import Header from '../header/Header';
import Filters from '../filters/Filters';

class App extends Component{
    state = {
        
    }


    render (){
        return (
            <>
                <Header group="СПБ-901-01" faculty="Факультет компьютерных наук"/>
                <Filters/>
            </>
        );
    }
}

export default App;