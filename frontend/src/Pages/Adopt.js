import React, { useEffect, useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/adopt.css";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../store/Pets/actions";

function Adopt() {
  const dispatch = useDispatch();
  const { pets, loading } = useSelector((state) => state.petReducer);
  const searchRef = useRef();

  const search = async () => {
    dispatch(getPets(searchRef.current.value));
  };

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const AdoptCard = ({ pet }) => {
    return (
      <div className="col-sm-12 col-lg-4 my-4">
        {pet.name ? (
          <Link to={`/adopt/${pet.id}`}>
            <Card>
              <Card.Img variant="top" src={pet.url} alt={pet.name} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.category}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ) : null}
      </div>
    );
  };

  const Search = () => {
    return (
      <InputGroup className="my-3">
        <Form.Control placeholder="Search" ref={searchRef} />
        <Button
          variant="primary"
          onClick={() => {
            search();
          }}
        >
          Search
        </Button>
      </InputGroup>
    );
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="row adopt__container">
          <Search />
          {pets
            ? pets.map((pet, index) => (
                <AdoptCard key={index} index={index} pet={pet} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}

export default Adopt;
