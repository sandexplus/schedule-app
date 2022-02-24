import './Header.scss';

import { Component } from 'react';

import CheckWeek from '../checkWeek/CheckWeek';

class Header extends Component {

    componentDidMount = () => {
        if (!localStorage.getItem('group')){
            localStorage.setItem('group', this.props.schedule[4].group)
        }
    }
    
    render(){
        return(
            <header className="header">
                <div className="container">
                    <h1 className="header__title">
                        {`Расписание группы ${localStorage.getItem('group')}`}
                    </h1>
                    <h2 className="header__subtitle">
                        {this.props.faculty}
                    </h2>
                    <h2 className="header__subtitle">{`Неделя ${CheckWeek()}`}</h2>
                    <button className="header__change-faculty">
                        Изменить факультет или группу
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;