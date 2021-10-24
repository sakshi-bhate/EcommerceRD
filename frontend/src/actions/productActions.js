import axios from "axios"
export const listProducts=()=> async(dispatch)=>{
    try {
        dispatch({type:"PRODUCT_LIST_REQUEST"})
        const {data}= await axios.get('http://127.0.0.1:8000/api/products/')

        dispatch({type:"PRODUCT_LIST_SUCCESS",payload:data})


    }catch(error){
        dispatch({type:"PRODUCT_LIST_FAILED",
                    payload: error.response && error.response.data.message? error.response.message.data:error.message
            })
    }

}
export const listDetail=(id)=> async(dispatch)=>{
    try {
        dispatch({type:"PRODUCT_DETAIL_REQUEST"})
        const {data}= await axios.get(`http://127.0.0.1:8000/api/product/${id}`)

        dispatch({type:"PRODUCT_DETAIL_SUCCESS",payload:data})


    }catch(error){
        dispatch({type:"PRODUCT_DETAIL_FAILED",
                    payload: error.response && error.response.data.message? error.response.message.data:error.message
            })
    }

}
