import './Header.scss';

const Header = (props) => {
    return(
        <header className="header">
            <div className="container">
                <h1 className="header__title">
                    {`Расписание группы ${props.group}`}
                </h1>
                <h2 className="header__subtitle">
                    {props.faculty}
                </h2>
                <button className="header__change-faculty">
                    Изменить факультет или группу
                </button>
            </div>
        </header>
    );
}

export default Header;