import React, { useState } from "react";
import "./Pass.css";

const Pass = ({ length = 6, onSubmit }) => {
  const [values, setValues] = useState(Array(length).fill(""));

  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return; // Only allow 1 character per box

    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);

    // Automatically focus the next input box if the current one is filled
    if (newValue && index < length - 1) {
      document.getElementById(`char-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to the previous box
    if (e.key === "Backspace" && !values[index] && index > 0) {
      document.getElementById(`char-${index - 1}`).focus();
    }

    // If the "Enter" key is pressed and all values are filled, submit the code
    if (e.key === "Enter" && values.every((value) => value !== "")) {
      onSubmit(values.join(""));
    }
  };

  return (
    <div className="password-wrapper">
      <h1 className="enter-pass" title="Enter Password">
        Enter Password
      </h1>
      <div className="password-container">
        {values.map((value, index) => (
          <input
            key={index}
            id={`char-${index}`}
            type="text"
            maxLength="1"
            value={value ? "*" : ""} // Display stars instead of actual input
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="password-box"
          />
        ))}
      </div>
    </div>
  );
};

export default Pass;
