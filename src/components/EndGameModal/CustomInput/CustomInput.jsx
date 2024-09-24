import { useState } from "react";

const CustomInput = ({ setName }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveName = () => {
    setName(inputValue);
  };

  return (
    <>
      <input onChange={handleChange} value={inputValue} />
      <button onClick={handleSaveName}>Save</button>
    </>
  );
};

export default CustomInput;
