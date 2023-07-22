const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const commonHeaders = {'Content-Type': 'text/html'};

function home(req, res) {
    console.log(req.url);
    if (req.url === "/") {
        res.writeHead(200, commonHeaders);
        res.write("Header\n");
        res.write("Search\n");
        res.end("Footer\n");
    }
}

function user(req, res) {
    let username = req.url.replace("/", "");
    
    if (username.length > 0) {

        // Retrieve user's JSON from Teamtreehouse
        let studentProfile = new Profile(username);

        renderer.renderHeader(res, commonHeaders);

        studentProfile.on("end", profileJSON => {
            //console.log("JSON Below")
            //console.log(profileJSON);

            // Store values that are relevant
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                name: profileJSON.name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };

            console.dir(values);

            renderer.renderHeader(res, commonHeaders);
            renderer.renderProfile(values, res, username, commonHeaders);
        });

        studentProfile.on("error", (e) => {
            console.error(e);
            renderer.renderHeader(res, commonHeaders);
            renderer.renderError(res, commonHeaders, `No content for user "${username}" found in "https://teamtreehouse.com/profiles".`);
        });

        //res.end("Footer\n");
    }
}

module.exports.home = home;
module.exports.user = user;