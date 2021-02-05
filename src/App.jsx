import './assets/styles/style.scss'
import { Header, Footer } from './templates/index'
import Router from './Router'

function App() {
  return (
    <div className="l-app-wrape"> 
      <Header />
      <Router />
      <Footer />
    </div>
  );
} 

export default App;
