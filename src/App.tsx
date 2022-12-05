import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { FeedContainer } from "./features/Feed";
import { Grommet } from "grommet";
import { JoinContainer } from "./features/Join";
import { Layout } from "./Layout";
import { LoginContainer } from "./features/Login";
import { Navbar } from "./features/Navbar";
import { PrivateOutlet } from "./components/PrivateOutlet";
import { theme } from "./theme";

function App() {
  return (
    <Router>
      <Grommet theme={theme} background="black" full>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/join/*" element={<JoinContainer />} />
            <Route path="/login/*" element={<LoginContainer />} />
            <Route path="*" element={<PrivateOutlet />}>
              <Route path="feed" element={<FeedContainer />} />
            </Route>
          </Routes>
        </Layout>
      </Grommet>
    </Router>
  );
}

export default App;
