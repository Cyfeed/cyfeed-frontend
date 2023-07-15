import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../Login/authSlice";
import { EditProfile } from "./EditProfile";

type Props = {};

export const EditProfileContainer = (props: Props) => {
  const profile = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!profile) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <EditProfile profile={profile} />;
};
