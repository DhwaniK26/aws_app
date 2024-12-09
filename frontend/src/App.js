import React, { useState, useEffect } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      firstName,
      lastName,
      address,
      phone,
      email,
    };

    // Send POST request to the backend
    fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(userData), // Encoding form data as URL-encoded
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("User added:", data);
        // After adding a new user, re-fetch the users
        fetch("http://localhost:3000/users")
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            console.error("There was an error fetching the users!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  return (
    <div className="App">
      <h1>User Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br></br>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br></br>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br></br>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br></br><br></br>
        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      {/* <ul>
        {users && users.map((user, index) => (
          <li key={index}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
