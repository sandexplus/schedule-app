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

    state = {
        subgroup: null,
        schedule: [],
        filteredSubject: 'null',
        showAllTable: true
    }

    componentDidUpdate = () => {
        localStorage.setItem('subgroup', this.state.subgroup);
        localStorage.setItem('filteredSubject', this.state.filteredSubject);
    }

    componentDidMount = () => {
        if (localStorage.getItem('subgroup')){
            this.onChangeSubgroup(+localStorage.getItem('subgroup'))
        }
        if (localStorage.getItem('filteredSubject')){
            this.onChangeFilteredSubject(localStorage.getItem('filteredSubject'))
        }
        fetch('https://schedule-omsu.herokuapp.com/data')
            .then(res => res.json())
            .then(data => {
                this.setState({schedule: data})
            })
    }

    onChangeSubgroup = (subgroup) => {
        this.setState({
            subgroup: subgroup
        });
    }

    onChangeFilteredSubject = (filteredSubject) => {
        this.setState({
            filteredSubject: filteredSubject
        })
    }

    onChangeCheckbox = () => {
        this.setState({
            showAllTable: !this.state.showAllTable
        })
    }

    render (){
        return (
            <>
                <Header group="СПБ-901-01" faculty="Факультет компьютерных наук"/>
                <Filters onChangeSubgroup={this.onChangeSubgroup} 
                    onChangeFilteredSubject={this.onChangeFilteredSubject} 
                    schedule={this.state.schedule}
                    onChangeCheckbox={this.onChangeCheckbox}/>
                <Schedule subgroup={this.state.subgroup} 
                    schedule={this.state.schedule}
                    filteredSubject={this.state.filteredSubject}
                    showAllTable={this.state.showAllTable}/>
            </>
        );
    }
}

export default App;