import { useEffect, useState } from "react";

function readUser() {
  try {
    const item = window.localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

// Legge l'utente salvato al login e resta sincronizzato con
// login/logout (evento custom "userChanged") e con le altre tab ("storage").
export function useStoredUser() {
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    function sync(event) {
      if (event.type === "userChanged" || event.key === "user") setUser(readUser());
    }
    window.addEventListener("storage", sync);
    window.addEventListener("userChanged", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("userChanged", sync);
    };
  }, []);

  return user;
}
