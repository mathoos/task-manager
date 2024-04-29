import {Link} from "react-router-dom";
import Nav from "../components/Nav";

import { projets } from '../data/projets';
import "./Home.scss";

function Home() {

    return (
        <div className="home">
            <Nav/>
            <div className="container">
                {projets.map(({ title }) => (
                <Link key={title} to={`/dashboard/${title}`}>
                    {title}
                </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;