import { Grommet } from "grommet";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PrivateOutlet } from "./components/PrivateOutlet";
import { AboutContainer } from "./features/About";
import { FeedContainer } from "./features/Feed";
import { JoinContainer } from "./features/Join";
import { LoginContainer } from "./features/Login";
import { Navbar } from "./features/Navbar";
import { NewPostContainer } from "./features/NewPost";
import { PostContainer } from "./features/Post/PostContainer";
import { Layout } from "./Layout";
import { theme } from "./theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Layout>
              <Outlet />
            </Layout>
          </>
        }
      >
        <Route index element={<FeedContainer />} />
        <Route path="/join/*" element={<JoinContainer />} />
        <Route path="/login/*" element={<LoginContainer />} />

        <Route path="*" element={<PrivateOutlet />}>
          <Route path="feed" element={<FeedContainer />} />
          <Route path="post">
            <Route path=":id" element={<PostContainer />}></Route>
          </Route>
          <Route path="new-post" element={<NewPostContainer />} />
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
  return (
    <Grommet theme={theme} background="black" full>
      <RouterProvider router={router} />
    </Grommet>
  );
}

export default App;
