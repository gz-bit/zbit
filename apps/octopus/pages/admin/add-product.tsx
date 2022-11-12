import { useState } from 'react'
import styles from '../index.module.css'
import { NavHeader } from '../../components'

const AddProduct = () => {

  const [product, setProduct] = useState('')
  //const [response, setResponse] = useState('initial')

  const handleChange = (e) => setProduct(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const json = JSON.stringify({ product })

    fetch(`http://localhost:3333/admin/post-product?q=${product}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: json
    })
      .then((res) => res.json())
      .then((data) => {
        alert('send: ' + json)
        alert('received: ' + JSON.stringify(data))
        setProduct('')
        //setResponse(data.product)
      })
    ;
    
  }

  return (
    <div className={styles.all}>
     
        <NavHeader active="add-product" />
        <form onSubmit={handleSubmit}>
          <h3>Add Product</h3>
          <input type="text" name="product" value={product} onChange={handleChange} />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>

    </div>
  )
}
export default AddProduct