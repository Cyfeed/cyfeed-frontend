import { Grommet } from "grommet";
import { JoinContainer } from "./containers/Join";
import { Layout } from "./Layout";
import { theme } from "./theme";

function App() {
  return (
    <Grommet theme={theme} background="black" full>
      <Layout>
        <JoinContainer />
      </Layout>
    </Grommet>
  );
}

export default App;
