
import { Routes, Route } from "react-router-dom";
import FormComponent from "./pages/FormComponent";
import TableComponent from "./pages/TableComponent";

function App() {


  return (
    <Routes>
      <Route path='/' element={<TableComponent />} />
      <Route path='/add' element={<FormComponent onSubmit={()=>{}}/>} />
    </Routes>
  );
}

export default App;
