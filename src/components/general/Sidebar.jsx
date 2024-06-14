import { NavLink, Link } from 'react-router-dom';

import {
    HOME_ROUTE,
    IMPROVE_LETTER_ROUTE,
    GENERATE_LETTER_ROUTE,
    ACCOUNT_ROUTE,
    MAIN_ROUTE,
} from "../../utils/Consts";

import './general.css';

const Sidebar = () => {
    const renderNavLink = (to, label, icon) => (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? 'sidebar-item active-sidebar-item' : 'sidebar-item'}
        >
            <img src={icon} alt={label} />
            <span dangerouslySetInnerHTML={{ __html: label }} />
        </NavLink>
    );

    return (
        <div className="sidebar">
            <Link className="logo" to={MAIN_ROUTE}>
                <img src="/icons/main-logo.svg" alt="Write My Mail" />
            </Link>
            <ul className="sidebar-menu">
                <li>
                    {renderNavLink(HOME_ROUTE, 'Главная', '/icons/home.svg')}
                </li>
                <li>
                    {renderNavLink(IMPROVE_LETTER_ROUTE, 'Улучшение письма', '/icons/improve.svg')}
                </li>
                <li>
                    {renderNavLink(GENERATE_LETTER_ROUTE, 'Генерация<br>с нуля', '/icons/generate.svg')}
                </li>
                <li>
                    {renderNavLink(ACCOUNT_ROUTE, 'Аккаунт', '/icons/account.svg')}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
