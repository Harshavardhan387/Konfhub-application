import React from "react";
import cardImage from "../src/hall.png";
import "../src/Cards.css";
import { Card } from "react-bootstrap";

const Cards = ({ programData }) => {
  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={cardImage} />
        <Card.Body>
          <Card.Title style={{ width: "80%", overflow: "hidden" }}>
            {programData.name}
          </Card.Title>
          <Card.Text>
            <div className="sub-text">
              <div className="raddison">
                <p>Raddison</p>
              </div>
              <div className="isfree">
                <p>
                  {programData.is_free ? "Free" : "Paid"} |{" "}
                  {programData.is_virtual ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;
