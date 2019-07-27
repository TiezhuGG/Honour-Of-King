const express = require('express')

app = express()

require('./router')(app)

app.listen(9999, () => {
    console.log('Server running on port 9999');
})