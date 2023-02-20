import { NavLink, useLocation } from 'react-router-dom';
import './navlist.css';

function renderNavLoc (navLoc, focusedProduct) {
    let number = 0;

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

        if (sub !== ">" && sub !== navLoc[navLoc.length-1]) {
            return <NavLink key={nameKey(sub)} className={sub === navLoc[navLoc.length-1] ? 'color-light-slate' : 'color-slate'} to={sub === 'Home' ? '/': `/${sub}`}><li  id={sub === navLoc[navLoc.length-1] ? 'current-subdirectory' : undefined}>{formattedSub}</li></NavLink>
        } else if (sub !== ">") {
            return <li key={nameKey(sub)} className={sub === navLoc[navLoc.length-1] ? 'color-light-slate' : 'color-slate'} id={sub === navLoc[navLoc.length-1] ? 'current-subdirectory' : undefined}>{formattedSub}</li>
        } else {
            return <li key={nameKey(sub)} id={sub === navLoc[navLoc.length-1] ? 'current-subdirectory' : undefined}>{formattedSub}</li>
        }        
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