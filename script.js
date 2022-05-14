
// API using Fetch **
// const getProductInfoFetch = async () => {
//     const response = await fetch('https://placeholder.url/products/Leather+Sofa')
//     const jsonData = await response.json()
//     console.log(jsonData)
// }

// --- OR ---

fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(data => (data))


    console.log(JSON.parse(data)[2].email)