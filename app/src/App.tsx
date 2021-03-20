import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import permissions from "./permissions.json";
import "firebase/auth";

firebase.initializeApp(permissions);
const auth = firebase.auth();

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<firebase.User>();
  const [allItems, setAllItems] = useState<any[]>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getAllItems();
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const getAllItems = async () => {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(
      "http://localhost:5001/fir-crud-rest-api-c2b46/us-central1/api/read",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const json: any[] = await res.json();
    setAllItems(json);
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          Userid: {user.uid}
          <br />
          <button onClick={() => auth.signOut()}>Logout</button>
          <br />
          <br />
          Listing out all info: <br />
          <br />
          {JSON.stringify(allItems)}
        </div>
      ) : (
        <form onSubmit={login} style={{ display: "flex" }}>
          <fieldset>
            {/* LOGIN FORM */}
            <legend>Login</legend>
            {/* EMAIL */}
            <label>Email: </label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />{" "}
            <br />
            {/* PASSWORD */}
            <label>Password: </label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <br />
            <br />
            <button type="submit">Login</button>
            <br />
            <p style={{ color: "red" }}>{error}</p>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default App;
