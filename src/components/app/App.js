import { Component } from 'react';

import './App.scss';

import Header from '../header/Header';

class App extends Component{
    render (){
        return (
            <>
                <Header group="СПБ-901-01" faculty="Факультет компьютерных наук"/>
            </>
        );
    }
}

export default App;