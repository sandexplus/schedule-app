import { Component } from 'react';

import './App.scss';

import Header from '../header/Header';
import Filters from '../filters/Filters';
import Schedule from '../schedule/Schedule';

class App extends Component{
    timeOfCourses = [
        {
            timeStartHours: 8,
            timeStartMinutes: 0,
            timeEndHours: 9,
            timeEndMinutes: 35
        },
        {
            timeStartHours: 9,
            timeStartMinutes: 45,
            timeEndHours: 11,
            timeEndMinutes: 20
        },
        {
            timeStartHours: 11,
            timeStartMinutes: 30,
            timeEndHours: 13,
            timeEndMinutes: 5
        },
        {
            timeStartHours: 13,
            timeStartMinutes: 45,
            timeEndHours: 15,
            timeEndMinutes: 20
        },
        {
            timeStartHours: 15,
            timeStartMinutes: 30,
            timeEndHours: 17,
            timeEndMinutes: 5
        },
        {
            timeStartHours: 17,
            timeStartMinutes: 15,
            timeEndHours: 18,
            timeEndMinutes: 50
        }
    ]

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