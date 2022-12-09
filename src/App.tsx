import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AboutContainer } from "./features/About";
import { FeedContainer } from "./features/Feed";
import { Grommet } from "grommet";
import { JoinContainer } from "./features/Join";
import { LoginContainer } from "./features/Login";
import { NewPostContainer } from "./features/NewPost";
import { PrivateOutlet } from "./components/PrivateOutlet";
import { theme } from "./theme";

function App() {
  return (
    <Router>
      <Grommet theme={theme} background="black" full>
        <Routes>
          <Route index element={<AboutContainer />} />
          <Route path="/join/*" element={<JoinContainer />} />
          <Route path="/login/*" element={<LoginContainer />} />
          <Route path="*" element={<PrivateOutlet />}>
            <Route path="feed" element={<FeedContainer />} />
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
        </Routes>
      </Grommet>
    </Router>
  );
}

export default App;
