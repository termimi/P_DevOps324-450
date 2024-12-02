const fs = require('fs');

module.exports = {
    key: fs.readFileSync('C:/Users/po66qga/Documents/GitHub/P_DevOps324-450/app/backend/env/keys/jwtRS256.key'),
    keyPub: fs.readFileSync('C:/Users/po66qga/Documents/GitHub/P_DevOps324-450/app/backend/env/keys/jwtRS256.key.pub'),
}