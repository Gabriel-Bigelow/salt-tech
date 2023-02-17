import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navlist.css';

function renderNavLoc (navLoc, focusedProduct) {
    let number = 0;
    let inProductsDirectory = false;

    function nameKey (sub) {
        if (sub === '>') {
            number++;
            return `nav-list-${sub}-${number}`;
        }
        return `nav-list-${sub}`;
    }

    const elements = navLoc.map(sub => {
        let formattedSub;
        if (parseInt(sub) && focusedProduct) {
            console.log(focusedProduct);
            formattedSub = focusedProduct.name;
        } else {
            formattedSub = sub[0].toUpperCase().concat(sub.substring(1));
        }

        if (sub === 'products') inProductsDirectory = true;
        
        return sub !== '>' ? <NavLink key={nameKey(sub)} className={sub === navLoc[navLoc.length-1] ? 'color-light-slate' : 'color-slate'} to={sub === 'Home' ? '/': `/${sub}`}><li  id={sub === navLoc[navLoc.length-1] ? 'current-subdirectory' : undefined}>{formattedSub}</li></NavLink>
            : <li key={nameKey(sub)} id={sub === navLoc[navLoc.length-1] ? 'current-subdirectory' : undefined}>{formattedSub}</li>
    });

    return elements;
}

export default function Navlist (props) {
    const { focusedProduct } = props;
    const location = useLocation();

    const subdirectories = location.pathname.replaceAll('/',' > ').split(' ').slice(1);
    subdirectories.unshift('Home');

    while (!subdirectories[subdirectories.length-1] || subdirectories[subdirectories.length-1] === '>') {
        subdirectories.splice(subdirectories.length-1, 1);
    }

    return subdirectories.length > 1 ? (
        <div id="nav-list">
            <ul>
                {renderNavLoc(subdirectories, focusedProduct)}
            </ul>
        </div>
    ) : undefined;
}