export const userProfile = (req, res) => {
    res.status(200).send({
        message: "User Profile logged ..!"
    })
}



/*
AXIOS TO SEND BEARER TOKEN FROM FRONTEND

const product = { name: 'Axios POST with Bearer Token' }; // request JSON body
const headers = { 'Authorization': 'Bearer my-token' }; // auth header with bearer token
axios.post('https://testapi.jasonwatmore.com/products', product, { headers })
    .then(response => console.log(response.data));
*/