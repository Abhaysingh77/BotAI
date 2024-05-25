import { StyledEngineProvider } from "@mui/material/styles";
import BotAiWindow from "./components/BotAiWindow/BotAiWindow";
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BotAiWindow />
    </StyledEngineProvider>
  );
}

export default App;
