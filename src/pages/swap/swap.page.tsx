import { NavLink, Outlet } from 'react-router-dom';

export const Swap = () => {
    return (
        <div>
            <NavLink to={'/swap'}>Swap</NavLink>{' '}
            <NavLink to={'/swap/multi-swap'}>multi-swap</NavLink>
            <Outlet />
        </div>
    );
};
