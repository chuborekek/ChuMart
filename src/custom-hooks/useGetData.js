import React, { useEffect, useState } from 'react'
import {db} from '../firebase.config'
import { collection,getDocs, onSnapshot } from 'firebase/firestore'


const useGetData = (collectionName) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const collectionRef= collection(db,collectionName)

    useEffect(()=>{

        const getData = async()=>{
            // fetching data not real time
            // const data = await getDocs(collectionRef)

            // fetching data in firebase firestore in realtime
            await onSnapshot(collectionRef,(snapshot)=>{
                setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
                setLoading(false)
            })
            
        }

        getData()
    },[])
  
    return {data,loading};
};

export default useGetData