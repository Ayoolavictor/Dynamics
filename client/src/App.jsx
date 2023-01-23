import {Welcome,Layout,Login,Login2,Transactions,About} from "./components"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter
} from 'react-router-dom';
const App =() =>{
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Welcome/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="Home" element={<Welcome/>}/>
          <Route path="Login2" element={<Login2/>}/>
          <Route path="Transactions" element={<Transactions/>}/>
          <Route path="About" element={<About/>}/>
 




        </Route>
      </Routes>
      
      </BrowserRouter>
    
    
    
   </div>
     
  );
}

export default App
