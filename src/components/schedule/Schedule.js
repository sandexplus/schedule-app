import { Component } from "react";
import './Schedule.scss'

import CheckWeek from "../checkWeek/CheckWeek";


class Schedule extends Component {
    state = {
        schedule: []
    }

    componentDidMount = () => {
        fetch('https://schedule-omsu.herokuapp.com//data')
            .then(res => res.json())
            .then(data => {
                this.setState({schedule: data})
            })
    }

    render () {
        return (
            <section className="schedule">
                <div className="container">
                    <div className="schedule__table">
                        <View schedule={this.state.schedule}/>
                    </div>
                </div>
            </section>            
        )
    }
}

const View = (props) => {
    const table = props.schedule.map((day, i) => {
        const header = (
            <>
                <div className="schedule__table_day">
                    {day.dayOfWeek}
                </div>
                <div className="schedule__table_title">
                    <div className="schedule__table_number">№</div>
                    <div className="schedule__table_subgroup">п/г</div>
                    <div className="schedule__table_weeks">Недели</div>
                    <div className="schedule__table_type">Тип</div>
                    <div className="schedule__table_time">Время</div>
                    <div className="schedule__table_class">Предмет</div>
                    <div className="schedule__table_master">Преподаватель</div>
                    <div className="schedule__table_cabinet">Кабинет</div>
                </div>
            </>
        )
        return props.schedule[i].data.map((item, i) => {
            let {subgroup, weeksStart, weeksEnd, type, time, subject, master, cabinet} = item;

            if (i === 0){
                return header;
            }

            let currentWeek = CheckWeek();
            if (currentWeek > weeksEnd || currentWeek < weeksStart){
                return (
                    <>
                    </>
                )
            }

            if (!subgroup){
                subgroup = '1/2';
            }
            if (subgroup === 'choosen'){
                subgroup = 'д/в';
            }
            if (typeof(subgroup) == 'object'){
                subgroup = 'нч/ч'
            }

            let borLeft;
            switch (type){
                case 'Лаб':
                    borLeft = '#ff7a66';
                    break;
                case 'Лек':
                    borLeft = '#99ff99';
                    break;
                case 'Пр':
                    borLeft = '#ff2200';
                    break;
                default:
                    borLeft = '';
            }
            if (time.timeStartMinutes.toString().length === 1){
                time.timeStartMinutes = '0' + time.timeStartMinutes;
                
            }
            if (time.timeEndMinutes.toString().length === 1){
                time.timeEndMinutes = '0' + time.timeEndMinutes;
            }

            let bg = '#fff';
            if (i % 2 === 0){
                bg = '#f8f8ff';
            }

            return (                   
                <div className="schedule__table_subject" style={{borderLeft: `2px solid ${borLeft}`, backgroundColor: bg}}>
                    <div className="schedule__table_number">{i}</div>
                    <div className="schedule__table_subgroup">{subgroup}</div>
                    <div className="schedule__table_weeks">{`${weeksStart}-${weeksEnd} нед.`}</div>
                    <div className="schedule__table_type">{type}</div>
                    <div className="schedule__table_time">{`${time.timeStartHours}.${time.timeStartMinutes}-${time.timeEndHours}.${time.timeEndMinutes}`}</div>
                    <div className="schedule__table_class">{subject}</div>
                    <div className="schedule__table_master">{master}</div>
                    <div className="schedule__table_cabinet">{cabinet}</div>
                </div>
            )
        })
    })

    return table
}

export default Schedule;