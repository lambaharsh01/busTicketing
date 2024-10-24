import { SCREEN } from "../constants/paths";

export default function Screens() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img src={SCREEN.LOGO_512} alt="charter-icon" className="h-36 w-36" />
    </div>
  );
}
