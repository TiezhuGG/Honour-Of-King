const express = require('express')
const cors = require('cors')

app = express()

app.use(cors())
app.use(express.json())

require('./routes/admin/')(app)
require('./db')(app)

app.listen(9999, () => {
    console.log('Server running on port 9999');
})