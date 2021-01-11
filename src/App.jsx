import './assets/styles/reset.scss'
import './assets/styles/style.scss'
import { Header, Footer } from './templates/index'
import Router from './Router'

function App() {
  return (
    <div>
      {/* <SignIn />
      <SignOut /> */}
      <Header />
      {/* <Home /> */}
      <Router />
      <Footer />
    </div>
  );
}

export default App;
