import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../store/Pets/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Button } from "react-bootstrap";
import axiosInstance from "../utils/axios";

function AdoptPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { pets, loading } = useSelector((state) => state.petReducer);

  const [reqLoading, setReqLoading] = useState(false);
  const [message, setMessage] = useState("");

  const requestAdoption = async (id) => {
    setReqLoading(true);
    await axiosInstance
      .post("/pet/reqAdoption", { id })
      .then(({ data }) => {
        if (data.success) {
          setMessage("Requested the pet owner for adoption.");
        }
      })
      .finally(() => {
        setReqLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const AdoptData = ({ pet }) => {
    if (id === pet.id) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12 col-lg-6 image__container">
              <img src={pet.url} alt={pet.name} />
            </div>
            <div className="about col-sm-12 col-md-6 px-5 ">
              {message && <Alert variant="success">{message}</Alert>}
              <p className="about__name">{pet.name}</p>
              <p className="about__category">Category: {pet.category}</p>
              <p className="about__breed">Breed: {pet.breed}</p>
              <p className="about__about">About: {pet.about}</p>
              <p className="about__contact">
                Contact: <a href={`tel:${pet.contact}`}>{pet.contact}</a>
              </p>
              <Button onClick={() => requestAdoption(pet.id)}>
                Request for adoption
              </Button>
            </div>

            <div className=""></div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container-fluid">
      {loading || reqLoading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="ma-2 adopt__container__single">
          {pets
            ? pets.map((pet, index) => (
                <AdoptData key={index} index={index} pet={pet} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}

export default AdoptPage;
