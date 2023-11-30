import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <div className ="home">
        <Link to="/adopt"><Button className ="home__button" size="lg">Adopt a pet</Button></Link>
        <Link to="/donate"><Button className ="home__button" size="lg">Donate a pet</Button></Link>
    </div>
  );
}

export default Home;
