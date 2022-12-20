import { FlureeWrapper } from './flureedb/FlureeContext';
import Explorer from './components/Explorer/Explorer';
import Drawer from './components/Drawer/Drawer';

function App() {

  return (
    <div className="App">
      <FlureeWrapper>
        <Explorer />
        <Drawer />
      </FlureeWrapper>
    </div>
  );
}

export default App;
