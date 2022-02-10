import { Component } from 'react';
import './Filters.scss';

class Filters extends Component {
    render () {
        return (
            <section className="filters">
                <div className="container">
                    <div className="filters__wrapper">
                        <div className="filters__subgroup">
                            <div className="filters__title">
                                Подгруппа
                            </div>
                            <div className="filters__subgroup-wrapper">
                                <button className="filters__subgroup-item">1</button>
                                <button className="filters__subgroup-item">2</button>
                            </div>
                        </div>
                        <div className="filters__master">
                            <div className="filters__title">Преподаватель</div>
                            <input type="text" className="filters__master-input" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Filters;