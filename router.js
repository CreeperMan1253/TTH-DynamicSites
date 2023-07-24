const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const commonHeaders = {'Content-Type': 'text/html'};

function home(req, res) {
    if (req.url === "/") {
        if (req.method.toLowerCase() === "get") {
            console.log("dpopop GAGGAGAG");
            renderer.renderHeader(res);
            renderer.renderHome(res);

        } else if (req.method.toLowerCase() === "post") {
            console.log("nonoicjdisoaj yeye!");
            res.on("data", postBody => {
                console.log("djiosajdsioadjsap!!!");
                console.log(postBody);
            });
        }
    }
}

function user(req, res) {
    let username = req.url.replace("/", "");
    
    if (username.length > 0) {

        // Retrieve user's JSON from Teamtreehouse
        let studentProfile = new Profile(username);

        renderer.renderHeader(res);

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

            renderer.renderHeader(res);
            renderer.renderProfile(values, res, username);
        });

        studentProfile.on("error", (e) => {
            console.error(e);
            renderer.renderHeader(res);
            renderer.renderError(res, `No content for user "${username}" found in "https://teamtreehouse.com/profiles".`);
        });

    }
}

module.exports.home = home;
module.exports.user = user;