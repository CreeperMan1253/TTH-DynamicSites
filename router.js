const Profile = require("./profile.js")

function home(req, res) {
    console.log(req.url);
    if (req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write("Header\n");
        res.write("Search\n");
        res.end("Footer\n");
    }
}

function user(req, res) {
    let username = req.url.replace("/", "");
    
    if (username.length > 0) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write("Header\n");

        // Retrieve user's JSON from Teamtreehouse
        let studentProfile = new Profile(username);

        studentProfile.on("end", profileJSON => {
            console.log(profileJSON);

            // Store values that are relevant
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                name: profileJSON.name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };

    //         let profileDiv = document.createElement("div");
    //         profileDiv.className = "profile";

    //         let profileHTML = `
    // <img src="${values.avatarUrl}" alt="Avatar" class="avatar">

    // <p><span>@${username}</span></p>

    // <ul>
    //     <li><span>${values.badges}</span> Badges earned</li>
    //     <li><span>${values.javascriptPoints}</span> JavaScript points</li>
    //     <!-- <li><a href="/">search again</a></li> -->
    // </ul>
    //         `;

    //         profileDiv.innerHTML = profileHTML;
    //         document.querySelector("body").insertAdjacentElement("beforeend", profileDiv);

            res.write("")

            console.dir(values);
        });

        studentProfile.on("error", (e) => {
            console.error(e);
            res.write(`No content for user "${username}" found in "https://teamtreehouse.com/profiles".\n`);
            res.write(e.message + "\n");
        });

        res.write(`${username}\n`);
        res.end("Footer\n");
    }
}

module.exports.home = home;
module.exports.user = user;