import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../store/Pets/actions";
import { Button, Card } from "react-bootstrap";
import axios from "../utils/axios";

const Donations = () => {
  const dispatch = useDispatch();
  const { loading, donations } = useSelector((state) => state.petReducer);
  const [approveLoading, setApproveLoading] = useState(false);

  const aproveAdoption = async (id) => {
    setApproveLoading(true);
    axios
      .post("/pet/approveAdoption", { id })
      .then(({ data }) => {
        console.log(data);
        dispatch(getDonations());
      })
      .finally(() => {
        setApproveLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getDonations());
  }, [dispatch]);

  const AdoptData = ({ pet }) => {
    return (
      <div className="col-sm-12 col-lg-4 my-4">
        {pet.name ? (
          <Card>
            <Card.Img variant="top" src={pet.url} alt={pet.name} />
            <Card.Body>
              <Card.Title>{pet.name}</Card.Title>
              <Card.Text>
                <div className="d-flex flex-column ">
                  Status:{" "}
                  {pet.adopted
                    ? `Adopted by:${pet.adoptedBy}`
                    : pet.requestedBy
                    ? `Requested Adoption by ${pet.requestedBy}`
                    : "Not adopted"}
                  {!pet.adopted && pet.requestedBy ? (
                    <>
                      <Button
                        onClick={() => {
                          aproveAdoption(pet.id);
                        }}
                        style={{ width: "100%" }}
                      >
                        Approve Adoption
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {loading || approveLoading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className=" row adopt__container__single">
          {donations
            ? donations.map((pet, index) => <AdoptData key={index} pet={pet} />)
            : null}
        </div>
      )}
    </div>
  );
};

export default Donations;
