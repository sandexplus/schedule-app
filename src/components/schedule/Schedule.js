import { useState, useEffect } from "react";
import './Schedule.scss'

import CheckWeek from "../checkWeek/CheckWeek";


const Schedule = (props) => {

    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSchedule(props.schedule)
        setLoading(true);
    }, [])
        //const loadingDiv = this.state.loading ? <Spinner/> : null;
    return (
        <section className="schedule">
            <div className="container">
                <div className="schedule__table">
                    <View schedule={props.schedule} 
                    subgroup={props.subgroup}
                    filteredSubject={props.filteredSubject}
                    showAllTable={props.showAllTable}
                    links={props.links}/>
                </div>
            </div>
        </section>            
    )
}


const View = (props) => {
    const table = props.schedule[4].schedule.map((day, i) => {
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
                    {/* <div className="schedule__table_weeks">неделя</div> */}
                    <div className="schedule__table_type">Тип</div>
                    <div className="schedule__table_time">Время</div>
                    <div className="schedule__table_class">Предмет</div>
                    <div className="schedule__table_master">Преподаватель</div>
                    <div className="schedule__table_cabinet">Кабинет</div>
                </div>
            </div>
        )
        
        return day.data.map((item, i) => {
            
            let {subgroup, weeksStart, weeksEnd, type, time, subject, master, cabinet} = item;
            if (i === 0){
                return header;
            }

            if (subject === ''){
                return (
                    <>
                    </>
                )
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
            if (subgroup && +subgroup !== 1 && +subgroup !== 2 && subgroup !== 'choosen'){
                if (currentWeek % 2 === 0){
                    subgroup = subgroup.even;
                } else {
                    subgroup = subgroup.odd;
                }
            }
            /* if (props.subgroup !== +subgroup && subgroup !== null ){
                return (
                    <>
                    </>
                )
            } */
            if (props.subgroup !== +subgroup && subgroup !== null && props.subgroup !== null && subgroup !== 'choosen' && props.subgroup !== '' && !isNaN(props.subgroup) && subgroup){
                return (
                    <>
                    </>
                )
            }
            /* if (props.subgroup + '' !== subgroup && subgroup !== 'choosen' && subgroup !== 'object' && props.subgroup !== 'null' && subgroup !== 'null'){
                return (
                    <>
                    </>
                )
            } */

            if (!subgroup){
                subgroup = '1/2';
            }
            if (subgroup === 'choosen'){
                subgroup = 'в/д';
            }

            let borLeft;
            switch (type){
                case 'лаб':
                    borLeft = '#9999ff';
                    break;
                case 'лек':
                    borLeft = '#99ff99';
                    break;
                case 'прак':
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

            let divLink
            divLink = <div className="schedule__table_class">{subject}</div>  
            for (let i = 0; i < props.links.length; i++){
                if (props.links[i].name === master && props.links[i].link !== ''){
                    divLink = <a href={props.links[i].link} className="schedule__table_class" target="_blank" rel="noreferrer">{subject}</a>
                    break;
                }             
            }
            return (                   
                <div className="schedule__table_subject" style={{borderLeft: `2px solid ${borLeft}`, backgroundColor: bg}}key={i + 1000}>
                    <div className="schedule__table_number">{i}</div>
                    <div className="schedule__table_subgroup">{subgroup}</div>
                    {/* <div className="schedule__table_weeks">{weeksStart + '-' + weeksEnd}</div> */}
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