import React, { useState } from "react";
import "./index.css";
import Pass from "./components/PasswordEntry/Pass";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMessagePage, setShowMessagePage] = useState(false);

  const sendCode = () => {
    if (phoneNumber) {
      // Simulate sending code (In real world, use something like Twilio to send the code)
      const generatedCode = "1234"; // A simulated code
      setCode(generatedCode);
      setIsCodeSent(true);
      console.log(`Code sent to ${phoneNumber}: ${generatedCode}`);
    }
  };

  const verifyCode = (enteredCode) => {
    if (enteredCode === code) {
      setIsAuthenticated(true);
      setHiddenMessage("Congratulations! You have successfully authenticated.");
    } else {
      alert("Incorrect code. Please try again.");
    }
  };

  const handleSubmit = (enteredCode) => {
    console.log("Submitted code:", enteredCode);
    // Simulate a correct code of "1234"
    if (enteredCode === "1234") {
      setShowMessagePage(true); // Navigate to the hidden message page when code is correct
    } else {
      alert("Incorrect code!");
    }
  };

  return (
    <div className="App">
      {!showMessagePage ? (
        // Show this section until the code is entered correctly
        <>
          {!isCodeSent ? (
            <div className="phone-number-section">
              <h1 className="enter-phone">Enter Your Phone Number</h1>
              <div className="input-section">
                <div className="phone-input-container">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(XXX)-XXX-XXXX"
                    className="phone-input"
                  />
                  <button onClick={sendCode} className="send-code-btn">
                    Send Code
                  </button>
                </div>
              </div>
            </div>
          ) : !isAuthenticated ? (
            <div>
              <Pass length={4} onSubmit={handleSubmit} />
            </div>
          ) : (
            <div>
              <h1>Enter the Code</h1>
              <p>{hiddenMessage}</p>
            </div>
          )}
        </>
      ) : (
        <div className="message-page">
          <h1>Welcome to the Hidden Page</h1>
          <p>Congratulations hacker! You used the correct password!</p>
        </div>
      )}
    </div>
  );
};

export default App;

