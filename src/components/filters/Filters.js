import { Component } from 'react';
import './Filters.scss';

class Filters extends Component {
    state = {
        subgroup: null,
        schedule: [],
        filteredSubject: '',
        showAllTable: false
    }

    onChangeSubgroup = (subgroup) => {
        if (this.state.subgroup === subgroup){
            this.setState({
                subgroup: null
            });
            this.props.onChangeSubgroup(null);
            return
        }
        this.setState({
            subgroup: subgroup
        });
        this.props.onChangeSubgroup(subgroup);
    }

    onChangeFilteredSubject = (e) => {
        const {value} = e.target;
        this.setState({
            filteredSubject: value
        });
        
        this.props.onChangeFilteredSubject(value);
    }

    onChangeCheckbox = () => {
        this.setState({
            showAllTable: !this.state.showAllTable
        })        

        this.props.onChangeCheckbox()
    }

    componentDidMount = () => {
        this.setState({
            schedule: this.props.schedule
        })
    }

    
    render () {
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
                                <button className={this.state.subgroup === 1 ? btnClassActive : btnClass} onClick={() => this.onChangeSubgroup(1)}>1</button>
                                <button className={this.state.subgroup === 2 ? btnClassActive : btnClass} onClick={() => this.onChangeSubgroup(2)}>2</button>
                            </div>
                        </div>
                        <div className="filters__choosen">
                            <div className="filters__title">
                                Дисциплина по выбору
                            </div>
                            <select name="" id="" 
                                className="filters__choosen-wrapper"
                                onChange={this.onChangeFilteredSubject}>
                                <option value="null" 
                                    className="filters__choosen-item">Выберите дисциплину по выбору</option>
                                <ChoosenClass schedule={this.props.schedule}/>
                            </select>
                            
                        </div>
                        <div className="filters__all-table">
                            <div className="filters__title">Показать все расписание</div>
                            <input type="checkbox" className='filters__checkbox' onChange={this.onChangeCheckbox}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const ChoosenClass = (props) => {
    const arrOfSubjects = [];
    const subjects = props.schedule.map(item => {
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
                    exp = <option id={i} 
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