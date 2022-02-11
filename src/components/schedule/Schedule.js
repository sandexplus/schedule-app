import { Component } from "react";
import './Schedule.scss'

import CheckWeek from "../checkWeek/CheckWeek";


class Schedule extends Component {
    state = {
        schedule: [],
        links: []
    }

    componentDidMount = () => {
        this.setState({
            schedule: this.props.schedule
        })
    }

    getLinks = () => {
        fetch('https://schedule-omsu.herokuapp.com/links')
            .then(res => res.json())
            .then(data => {
                this.setState({links: data})
            })
    }

    render () {
        return (
            <section className="schedule">
                <div className="container">
                    <div className="schedule__table">
                        <View schedule={this.props.schedule} 
                        subgroup={this.props.subgroup}
                        filteredSubject={this.props.filteredSubject}
                        showAllTable={this.props.showAllTable}
                        links={this.state.links}/>
                    </div>
                </div>
            </section>            
        )
    }
}

const View = (props) => {
    const table = props.schedule.map((day, i) => {
        const days = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        let today = new Date().getDay();
        const header = (
            <div key={i}>
                <div className="schedule__table_day" style={days[today] === day.dayOfWeek ? {backgroundColor: '#0079db'} : {backgroundColor: '#75c1ff'}}>
                    {day.dayOfWeek}
                </div>
                <div className="schedule__table_title" key={i + 100}>
                    <div className="schedule__table_number">№</div>
                    <div className="schedule__table_subgroup">п/г</div>
                    <div className="schedule__table_type">Тип</div>
                    <div className="schedule__table_time">Время</div>
                    <div className="schedule__table_class">Предмет</div>
                    <div className="schedule__table_master">Преподаватель</div>
                    <div className="schedule__table_cabinet">Кабинет</div>
                </div>
            </div>
        )
        return props.schedule[i].data.map((item, i) => {
            let {subgroup, weeksStart, weeksEnd, type, time, subject, master, cabinet} = item;

            if (i === 0){
                return header;
            }
            if (props.filteredSubject !== subject && props.filteredSubject !== 'null' && subgroup === 'choosen'){
                return (
                    <>
                    </>
                )
            }
            let currentWeek = CheckWeek();

            if (props.showAllTable){
                if (currentWeek > weeksEnd || currentWeek < weeksStart){
                    return (
                        <>
                        </>
                    )
                }
            }
            if (subgroup && subgroup !== 1 && subgroup !== 2 && subgroup !== 'choosen'){
                if (currentWeek % 2 === 0){
                    subgroup = subgroup.even;
                } else {
                    subgroup = subgroup.odd;
                }
            }
            if (props.subgroup !== subgroup && subgroup !== 'choosen' && subgroup !== 'object' && props.subgroup !== null && subgroup !== null){
                return (
                    <>
                    </>
                )
            }
            if (!subgroup){
                subgroup = '1/2';
            }
            if (subgroup === 'choosen'){
                subgroup = 'в/д';
            }

            let borLeft;
            switch (type){
                case 'Лаб':
                    borLeft = '#9999ff';
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
            const link = props.links.map(link => {
                if (link.name === master){
                    return link.link
                }
                return '';
            });
            let divLink;
            if (link[0] === undefined){
                divLink = <div className="schedule__table_class">{subject}</div>
            } else {
                divLink = <a href={link} className="schedule__table_class" target="_blank" rel="noreferrer">{subject}</a>
            }

            return (                   
                <div className="schedule__table_subject" style={{borderLeft: `2px solid ${borLeft}`, backgroundColor: bg}}key={i + 1000}>
                    <div className="schedule__table_number">{i}</div>
                    <div className="schedule__table_subgroup">{subgroup}</div>
                    <div className="schedule__table_type">{type}</div>
                    <div className="schedule__table_time">{`${time.timeStartHours}.${time.timeStartMinutes}-${time.timeEndHours}.${time.timeEndMinutes}`}</div>
                    {divLink}
                    <div className="schedule__table_master">{master}</div>
                    <div className="schedule__table_cabinet">{cabinet}</div>
                </div>
            )
        })
    })

    return table
}

export default Schedule;