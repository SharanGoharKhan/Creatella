import config from '../config'

const getProducts = (page=10,limit=15) => {
    return fetch(`${config.baseURL}?_page=${page}&_limit=${limit}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        return data
    })
    .catch(err => {
        return err
    })
}

export default getProducts;