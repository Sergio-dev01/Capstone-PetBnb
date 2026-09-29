import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    toast("Sei uscito dal tuo account. A presto!");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;
