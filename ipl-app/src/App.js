import './App.css';
import './style.css'
import IplRouteConfiguration from './components/IplRouteConfiguration';
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <IplRouteConfiguration />
      </Provider>
    </>
  )
}

export default App;
