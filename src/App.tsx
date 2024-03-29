import { Box, Grommet } from "grommet";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PrivateOutlet } from "./components/PrivateOutlet";
import { AboutContainer } from "./features/About";
import { EditProfileContainer } from "./features/EditProfile";
import { FeedContainer } from "./features/Feed";
import { JoinContainer } from "./features/Join";
import { LoginContainer } from "./features/Login";
import { Navbar } from "./features/Navbar";
import { PostContainer } from "./features/Post/PostContainer";
import { ProfileMe, ProfileOutlet } from "./features/Profile";
import { Layout } from "./Layout";
import { theme } from "./theme";
import { useAuth } from "./utils/useAuth";
import { Footer } from "./components/Footer";
import { EditPost } from "./features/EditPost";
import { NewPostContainer } from "./features/NewPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Box
            height={{ min: "100vh" }}
            direction="column"
            fill="vertical"
            justify="between"
          >
            <Navbar />
            <Layout>
              <Outlet />
            </Layout>
            <Footer />
          </Box>
        }
      >
        <Route path="/" element={<PrivateOutlet />}>
          <Route index element={<FeedContainer />} />
        </Route>
        <Route path="/join/*" element={<JoinContainer />} />
        <Route path="/login/*" element={<LoginContainer />} />

        <Route path="*" element={<PrivateOutlet />}>
          <Route path="feed" element={<FeedContainer />} />
          <Route path="post">
            <Route path=":id" element={<PostContainer />} />
          </Route>
          <Route path="profile">
            <Route path="me" element={<ProfileMe />} />
            <Route path="edit" element={<EditProfileContainer />} />
            <Route path=":username" element={<ProfileOutlet />} />
          </Route>
          <Route path="new-post" element={<NewPostContainer />} />
          <Route path="edit-post">
            <Route path=":id" element={<EditPost />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Route>
      <Route path="/about/*" element={<AboutContainer />} />
    </Route>
  )
);

function App() {
  useAuth();

  return (
    <Grommet theme={theme} background="black" full="min">
      <RouterProvider router={router} />
    </Grommet>
  );
}

export default App;
