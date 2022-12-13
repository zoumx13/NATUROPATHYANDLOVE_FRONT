import { createContext, useState, useEffect } from "react";

export const userContext = createContext({
  identifiant: "",
  setIdentifiant: () => {},
});

export default function UserProvider(props) {
  const [identifiant, setIdentifiant] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      async function getUser() {
        const token = localStorage.getItem("token");
        const url = "http://localhost:8080/user";
        const options = {
          method: "GET",
          headers: {
            Authorization: "bearer " + token,
          },
        };
        const response = await fetch(url, options);

        let result = await response.json();

        if (result.profil.identifiant) {
          setIdentifiant(result.profil.identifiant);
        }
      }
      getUser();
    }
  }, [identifiant]);

  return (
    <userContext.Provider
      value={{
        identifiant,
        setIdentifiant,
      }}
    >
      {props.children}{" "}
    </userContext.Provider>
  );
}
