import { useState } from "react";

const NameInputModal = ({ isOpen }) => {
  return (
    // Congrats you are among the top 3 quickest waldo finders! You may input
    // your name for the grand podium:
    <>
      {isOpen && (
        <label>
          Name
          <input placeholder="John Doe"></input>
        </label>
      )}
    </>
  );
};

export default NameInputModal;
