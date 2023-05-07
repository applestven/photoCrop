const axios = require('axios')

class jushuiService {
    async getOrderInfo(data){ 
        console.log("察看",data)
        const res = await axios.post('https://openapi.jushuitan.com/open/orders/single/query',data)
        return res
    }
}

module.exports = new jushuiService()