export  const apiEndpoints ={
    categories:{
        all: "/categories", 
        byId:(categoryId)=>`/categories/${categoryId}`,
       
    },
    products:{
        all: "/products",
        byId:(productId)=> `/products/${productId}`
    }
}

