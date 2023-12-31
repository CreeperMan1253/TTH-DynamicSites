const router = require("./router.js");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

http.createServer((req, res) => {

    router.home(req, res);
    router.user(req, res);

}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});