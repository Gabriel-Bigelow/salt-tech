import './home.css';
import textLogo from '../../images/logoWonB.png'

export default function Home () {


    return (
        <section id="home">
            <div id="home-logo-wrap">
                <img src={textLogo} alt="NaCl tech logo"></img>
            </div>
            
            <p>This is the Home component</p>
        </section>
    )
}