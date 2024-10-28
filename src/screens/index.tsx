import { useCallback, useEffect } from "react";
import { getUserEmail } from "../constants/getLocalStorage";
import { SCREEN } from "../constants/paths";
import { useNavigate } from "react-router-dom";
import { client } from "../constants/urlPath";

export default function Screens() {
  const navigate = useNavigate();

  const navigateWithDelay = useCallback(() => {
    const userEmail = getUserEmail();

    if (!userEmail) {
      navigate(client.dashboard, { replace: true });
    } else {
      navigate(client.dashboard, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => navigateWithDelay(), 600);
  }, [navigateWithDelay]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img
        src={SCREEN.LOGO_512.PATH}
        alt={SCREEN.LOGO_512.ALT}
        className="h-36 w-36"
      />
    </div>
  );
}
