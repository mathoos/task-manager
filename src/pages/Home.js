import {Link} from "react-router-dom";
import Nav from "../components/Nav";
import "./Home.scss";

function Home() {

    return (
        <div className="home">
            <Nav/>
            <div className="container">
                <Link to="/projet">Projet 1</Link>
                <Link to="/projet">Projet 2</Link>
                <Link to="/projet">Projet 3</Link>
            </div>
        </div>
    );
}

export default Home;