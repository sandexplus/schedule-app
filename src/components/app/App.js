import { useState, useEffect } from 'react';

import './App.scss';

import Header from '../header/Header';
import Filters from '../filters/Filters';
import Schedule from '../schedule/Schedule';
import Spinner from '../spinner/Spinner';

const App = () => {
    const [subgroup, setSubgroup] = useState(null);
    const [filteredSubject, setFilteredSubject] = useState('null');
    const [showAllTable, setShowAllTable] = useState(true);
    const [schedule, setSchedule] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('subgroup')){
            onChangeSubgroup(+localStorage.getItem('subgroup'))
        }
        if (localStorage.getItem('filteredSubject')){
            onChangeFilteredSubject(localStorage.getItem('filteredSubject'))
        }
        
    }, [])

    const loadData = () => {
        fetch(`http://localhost:3000/data`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setSchedule(data)
        })
    }

    const loadLinks = () => {
        fetch(`http://localhost:3000/links`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setLinks(data)
        })
    }

    useEffect(() => {
        loadData();
        loadLinks();
    }, [])


    useEffect(() => {
        localStorage.setItem('subgroup', subgroup);
        localStorage.setItem('filteredSubject', filteredSubject);
    }, [subgroup, filteredSubject])

    const onChangeSubgroup = (subg) => {
        setSubgroup(subg)
    }

    const onChangeFilteredSubject = (filSubject) => {
        setFilteredSubject(filSubject)
    }

    const onChangeCheckbox = () => {
        setShowAllTable(!showAllTable)
    }

    return (
        <>
            {
                schedule.length > 1 ? 
                (
                <>
                    <Header schedule={schedule} faculty="Факультет компьютерных наук"/>
                    <Filters onChangeSubgroup={onChangeSubgroup} 
                    onChangeFilteredSubject={onChangeFilteredSubject} 
                    schedule={schedule}
                    onChangeCheckbox={onChangeCheckbox}/>
                    </>
                ):
                null
            }
            {
                links.length > 1 ?
                <Schedule subgroup={subgroup} 
                schedule={schedule}
                filteredSubject={filteredSubject}
                showAllTable={showAllTable}
                links={links}/> :
                <Spinner/>
            }
        </>
    );
}


export default App;