let express = require('express');
let app = express();
app.use(express.static('dist'));
app.listen(4000);
console.log('Proxy server is listen at port 3000...');
