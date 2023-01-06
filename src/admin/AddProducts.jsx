import React, { useState } from 'react'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import {toast} from 'react-toastify'

import {db,storage} from '../firebase.config'
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {
  const [enterTitle,setEnterTitle]=useState('')
  const [enterShortDesc,setEnterShortDesc]=useState('')
  const [enterDescription,setEnterDescription]=useState('')
  const [enterCategory,setEnterCategory]=useState('')
  const [enterPrice,setEnterPrice]=useState('')
  const [enterProductImg,setEnterProductImg]=useState(null)
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate()
  
  const addProduct=async(e)=>{
    e.preventDefault()
    setLoading(true)
    // const product ={
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   description: enterDescription,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl:enterProductImg,
    // }

    //add product to firebase database
    try {
      const docRef = await collection(db,'products')
      const storageRef = ref(storage, `productImages/${Date.now()+enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef,enterProductImg)

      uploadTask.on(()=>{
        toast.error('Image not uploaded!')
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          await addDoc(docRef,{
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl:downloadURL,
          })
        })
      })


      setLoading(false)
      toast.success('Product added successfully')
      navigate('/dashboard/all-products')

    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }

  }

  return <section>
    <Container>
      <Row>
        <Col lg='12'>
          {
            loading
            ? 
              <h4 className='py-5'>Loading....</h4>
            :
              <>
              <h4 className='mb-5'>Add Product</h4>
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input type="text" value={enterTitle} onChange={e=>setEnterTitle(e.target.value)} placeholder='Name of the product' required/>
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input type="text" value={enterShortDesc} onChange={e=>setEnterShortDesc(e.target.value)}  placeholder='Put short description of product...' required/>
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <input type="text" value={enterDescription} onChange={e=>setEnterDescription(e.target.value)}  placeholder='Put long description of product...' required/>
                </FormGroup>
                
                <div className='d-flex align-items-center justify-content-between gap-5'>
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input type="number" value={enterPrice} onChange={e=>setEnterPrice(e.target.value)}  placeholder='0' required/>
                  </FormGroup>
                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <select className='w-100 p-2' value={enterCategory} onChange={e=>setEnterCategory(e.target.value)} >
                      <option>Select Category</option>
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input type="file" onChange={e=>setEnterProductImg(e.target.files[0])}/>
                  </FormGroup>
                </div>

                <button className="buy__btn">Add Product</button>
              </Form>
              </>
          }
        </Col>
      </Row>
    </Container>
  </section>
}

export default AddProducts