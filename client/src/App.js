import React,{useEffect,useState} from 'react';
import ProductList from './components/ProductList';  

function App(){
  
  const[products,setProducts] = useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    fetch('http://localhost:3001/api/get_products')
    .then(response=>response.json())
    .then(data=>{
      setProducts(data);
      setLoading(false);
    })
    .catch(err=>{
      console.error(err);
      setLoading(false);
  });
  },[]);

  return React.createElement(
    'div',
    {style: { textAlign: 'center', padding: '20px' }},
    React.createElement('h1', null, 'Product List'),
    loading
      ? React.createElement('p',null,'Loading products..')
      : React.createElement(ProductList,{products})
  )
}
export default App;