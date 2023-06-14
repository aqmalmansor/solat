import { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../containers/Home';
import HomeMobile from '../containers/HomeMobile';

const NavRoutes: FunctionComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Navigate replace to='/' />} />
            <Route path='/m' element={<HomeMobile/>} />
        </Routes>
    )
}

export default NavRoutes;