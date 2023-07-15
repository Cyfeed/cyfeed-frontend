import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { selectCurrentUser } from "../Login/authSlice";
import { Profile } from "./Profile";
import { ProfileMe } from "./ProfileMe";

type Props = {};

export const ProfileOutlet = (props: Props) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const { username = "" } = useParams();

  if (!username) {
    return <Navigate to="/" state={location} />;
  }

  if (username === currentUser?.username) {
    return <ProfileMe />;
  }

  return <Profile username={username} />;
};
