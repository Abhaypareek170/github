import React, { useState } from "react";
import "./Card.css";
import CommitActivity from "../CommitActivity";

const Card = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleRepoClick = (user) => {
    if (user === selectedUser) {
      setSelectedUser(null);
      return;
    }
    setSelectedUser(props.user);
  };
  return (
    <div class="card">
      <img src={props.avtar} alt="imag" />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">{props.desc}</p>
        <span>Stars: {props.star} </span>
        <span>Issues: {props.issue} </span>
        <span>Last pushed on {props.push} by {props.owner}</span>
        <button key={props.id} onClick={() => handleRepoClick(props.user)}>
          Details
        </button>
      </div>

      {selectedUser === props.user && <CommitActivity user={props.user} />}
    </div>
  );
};

export default Card;
