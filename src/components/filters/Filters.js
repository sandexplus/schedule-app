import { useEffect, useState } from 'react';
import './Filters.scss';

const Filters = (props) => {

    const [subgroup, setSubgroup] = useState(null);
    const [filteredSubject, setFilteredSubject] = useState('');
    const [showAllTable, setShowAllTable] = useState(true);

    const onChangeSubgroup = (subg) => {
        if (subgroup === subg){
            setSubgroup(null)
            props.onChangeSubgroup(null);
            return
        }
        setSubgroup(subg)
        props.onChangeSubgroup(subg);
    }

    const onChangeFilteredSubject = (e) => {
        const {value} = e.target;
        setFilteredSubject(value)
        
        props.onChangeFilteredSubject(value);
    }

    const onChangeCheckbox = () => {
        setShowAllTable(!showAllTable)     

        props.onChangeCheckbox()
    }

    useEffect(() => {
        if (localStorage.getItem('subgroup')){
            setSubgroup(+localStorage.getItem('subgroup'))
        }
        if (localStorage.getItem('filteredSubject')){
            setFilteredSubject(localStorage.getItem('filteredSubject'))
        }
    }, [subgroup, filteredSubject])
    

    const btnClass = 'filters__subgroup-item';
    const btnClassActive = 'filters__subgroup-item btn_active';

    return (
        <section className="filters">
            <div className="container">
                <div className="filters__wrapper">
                    <div className="filters__subgroup">
                        <div className="filters__title">
                            Подгруппа
                        </div>
                        <div className="filters__subgroup-wrapper">
                            <button className={subgroup === 1 ? btnClassActive : btnClass} onClick={() => onChangeSubgroup(1)}>1</button>
                            <button className={subgroup === 2 ? btnClassActive : btnClass} onClick={() => onChangeSubgroup(2)}>2</button>
                        </div>
                    </div>
                    <div className="filters__choosen">
                        <div className="filters__title">
                            Дисциплина по выбору
                        </div>
                        <select name="" id="" 
                            className="filters__choosen-wrapper"
                            onChange={onChangeFilteredSubject}>
                            <option value="null" 
                                className="filters__choosen-item">Выберите дисциплину по выбору</option>
                            {props.schedule.length > 1 ? <ChoosenClass schedule={props.schedule}/> : null}
                        </select>
                        
                    </div>
                    <div className="filters__all-table">
                        <div className="filters__title">Показать все расписание</div>
                        <input type="checkbox" className='filters__checkbox' onChange={onChangeCheckbox}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ChoosenClass = (props) => {
    const arrOfSubjects = [];
    const subjects = props.schedule[4].schedule.map(item => {
        return (
            item.data.map((itemm, i) => {
                const {subgroup, subject} = itemm;
                let exp;
                for (let i of arrOfSubjects){
                    if (subject === i){
                        return exp;
                    }
                }
                if (subgroup === 'choosen'){
                    exp = <option key={i} 
                        value={subject} 
                        className="filters__choosen-item">{subject}
                    </option>
                    arrOfSubjects.push(subject);
                }
                return exp
            })
        )
    })

    return subjects;
}

export default Filters;