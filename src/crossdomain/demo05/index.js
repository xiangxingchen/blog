let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
console.log('Proxy server is listen at port 3000...');
