import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function UserPets({   data, loading, error }) {
  



  const PetsCard = ({ pet }) => {
    return (
      <div className="col-sm-12 col-lg-4 my-4">
        {pet.name ? (
          <Card>
            <Card.Img variant="top" src={pet.images[0]} alt={pet.name} />
            <Card.Body>
              <Card.Title>{pet.name}</Card.Title>
              <Card.Text style={{ display: "inline", marginRight: "10px" }}>
                {pet.category}
              </Card.Text>
              <Link to="/">
                <span >
                  <i className="fa fa-lg fa-trash-o" aria-hidden="true"></i>
                </span>
              </Link>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="row adopt__container">
          {data && data.length !== 0 ? (
            data.map((pet, index) => (
              <PetsCard key={index} index={index} pet={pet} />
            ))
          ) : (
            <h1 style={{ margin: "auto" }}>No Pets given for adoption</h1>
          )}
        </div>
      )}
    </div>
  );
}



export default UserPets;
