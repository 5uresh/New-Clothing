import {Routes,Route} from 'react-router-dom'
import Home from './routes/home/home.components'

import Navigation from './routes/Navigation/Navigation.component'
import Athentication from './routes/Athentication/Athentication.component'
import Shop from './routes/Shop/shop.component'
import Checkout from './routes/Checkout/checkout.component'




// const Shop =()=>{
//   return (<h1>Ima the shop page</h1>)
// }
const Contact =()=>{
  return (<h1>Ima the Contact page</h1>)
}


const App = ()=>{


  return (
    <Routes>
    <Route path="/" element={<Navigation />} >
    <Route index element={<Home />} />
    <Route path="shop/*" element={<Shop />} />
    <Route path="contact" element={<Contact />} />
    <Route path="SignIn" element={<Athentication />} />
    <Route path='Checkout' element={<Checkout/>} />
    </Route>
    
  </Routes>
  )
}

export default App
