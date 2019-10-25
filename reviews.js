var form = document.getElementById("form");
var oldComments = JSON.parse(localStorage.getItem("comments"));

var fakeComments = [{
    "index": 0,
    "name": "Karolina",
    "email": "karolina@karolina.se",
    "comment": "Fin sida! Jag tycker att fästet på Superior är jättebra.",
    "date": "2019-10-21"
}, {
    "index": 0,
    "name": "Lars",
    "email": "lars@lars.se",
    "comment": "Håller med om att Superior är en lagom allroundsko, varken mer eller mindre.",
    "date": "2019-10-22"
}, {
    "index": 1,
    "name": "Leo",
    "email": "leo@leo.se",
    "comment": "Lone Peak är den bästa skon jag haft. Grym sida!",
    "date": "2019-10-23"
}, {
    "index": 1,
    "name": "Cecilia",
    "email": "cecilia@cecilia.se",
    "comment": "Jag tycker att mina Lone Peak är klumpiga och springer nästan inte alls i dem.",
    "date": "2019-10-24"
}];

if (oldComments == null) {
    oldComments = fakeComments;
} else {
    oldComments.push(fakeComments);
};

var emailInput = document.getElementById("email");
var nameInput = document.getElementById("name");
var commentInput = document.getElementById("comment");
var comments = document.getElementById("comments");
var label = document.getElementsByTagName("label")

// Adderar EN lyssnare på formuläret vid refresh
window.onload = listenComment();

// Valideringsfunktioner lånade från https://www.tutorialspoint.com och ändrade av mig
function validateName(name) {
    if (name == "") {
        //alert("Please provide your name!");
        label[0].style.color = "red"
        nameInput.classList.add("error")
        document.getElementById("error").innerHTML = "&nbsp;Fyll i ditt namn."
        return false;
    }
    return true
}
function validateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || (dotpos - atpos < 2)) {
        //alert("Please enter correct email ID")
        label[1].style.color = "red"
        emailInput.classList.add("error")
        document.getElementById("error").innerHTML = "&nbsp;Fyll i en korrekt e-postadress."
        return false;
    }
    return (true);
}
function validateComment(comment) {
    if (comment == "") {
        //alert("Please provide a comment!");
        label[2].style.color = "red"
        commentInput.classList.add("error")
        document.getElementById("error").innerHTML = "&nbsp;Skriv en kommentar."
        return false;
    }
    return true
}

// Lyssnar om användaren börjar skriva i input-rutorna efter att ha skrivit fel
function listenInput() {
    nameInput.addEventListener("input", resetError)
    emailInput.addEventListener("input", resetError)
    commentInput.addEventListener("input", resetError)
}

// Nollställer felmeddelande
function resetError() {
    nameInput.classList.remove("error")
    emailInput.classList.remove("error")
    commentInput.classList.remove("error")
    for (let i = 0; i < label.length; i++) {
        label[i].style.color = "black"
    }
    document.getElementById("error").innerHTML = ""
}

// Kontrollerar till vilken recension kommentarerna tillhör och skriver ut dem i DOMen
function showComments() {
    comments.innerHTML = ""
    var index = checkHash()
    oldComments.forEach(function (comment) {
        if (comment.index == index) {
            comments.innerHTML += "<p><span class=\"bold\">" + comment.name + "</span>, " + comment.date + ": " + comment.comment + "</p>";
        }
    })
}

// Lyssnar om användaren lämnar en kommentar
function listenComment() {
    form.addEventListener("submit", function (e) {
        var name = nameInput.value;
        var email = emailInput.value;
        var comment = commentInput.value;
        var date = new Date().toISOString().slice(0, 10)
        var index = checkHash()
        if (validateName(name) && validateEmail(email) && validateComment(comment)) {
            oldComments.push({ index, name, email, comment, date });
            localStorage.setItem("comments", JSON.stringify(oldComments));
            listenComment()
            showComments()
        } else {
            listenInput()
            e.preventDefault()
        }
    });
};

//SKORECENSIONERNA

//Importerar sko-objekt-mallen
import { Shoe } from "./modules/shoes.js";

//Skapar en tom array eftersom shoes inte finns i nån databasen
var shoes = []
var x

// Kontrollerar vilken recension (hash-nummer) som ska visas och navigerar till rätt recension 
window.addEventListener("hashchange", function (e) {
    createHTML(shoes);
})

// Skorecensionerna som arrayer, simulerar inskrivna från ett formulär
addShoe(["Altra Superior 4", 250, 0, "Stig och asfalt.", 3, "Lätt trailsko som fungerar överallt", "Altra profilerar sin Superior-sko som en hybrid mellan asfalt och terräng, en kombination som de flesta som springer trail uppskattar. Men det gör också att den inte passar perfekt någonstans. I skogen är den ibland väldigt hal på våta ytor och på asfalt känns den en smula stum. Men lätt och smidig till vardags.<br><br>Altras fotformade tåbox, alltså bredare än de flesta konkurrenternas, brukar funka direkt från första steget men Superior krävde många mil innan jag trivdes i dem. Efter premiärrundan på drygt en mil teknisk trail och lika mycket transport på asfalt och grus fick jag domningskänslor i yttersidan av vänster fot och mina Superior fick därför skämmas långt nere i garderoben under lång tid. Efter att bokstavligen gått in dem (som vardagsskor) blev de betydligt skönare att springa i.<br><br>Inget förstahandsval, främst på grund av det dåliga fästet i skogen, men jag gillar ändå skorna som ett bra allround-val när underlaget är mixat och farten måttlig."]);
addShoe(["Altra Lone Peak 4", 300, 0, "Terräng och teknisk stig.", 5, "Pålitlig sko som tuggar igenom allt", "Solida, var första tanken när jag packade upp min Lone Peak. Och tunga. Efter över 60 tuffa mil i för det mesta teknisk terräng känns de fortfarande lika solida - men inte alls så tunga. När mina Hoka-skor går sönder efter 40 mil tuffar de här bara på.<br><br>Finns det inga nackdelar? Jo, de är inte de snabbaste skorna och de känns svampiga och får nästan negativt drop på asfalt. De är med andra ord kompromisslösa trailskor och som sådana fungerar de utmärkt.<br><br>Det aggressiva fästet, den sköna passformen och osvikliga stabiliteten gör att långa rundor avverkas utan problem. En riktig favoritsko och ska jag springa långt och tekniskt är valet självklart Altra Lone Peak. I lopp som är kortare än halvmara väljer jag mina supersnabba Hoka One One Torrent."])

//Skapar html i DOMen från shoes-arrayen
createHTML(shoes)

//Skapar ett recensionsobjekt (newShoe) från arrayerna ovan och lägg objektet i arrayen shoes
function addShoe(array) {
    var newShoe = new Shoe(...array);
    shoes.push(newShoe);
}

//Kontrollerar vilken sida (hash) som ska visas
function checkHash() {
    return x = (location.hash !== "") ? parseInt(location.hash.replace("#", "")) : 0;
}

//Skapar html  från shoes-arrayen
function createHTML(object) {
    checkHash()

    //Skapar html i diven från rätt objekt i shoes-arrayen
    let review = document.getElementById("fromJS")
    review.innerHTML = ""
    let grade = ""

    //Skapar betyget - antal stjärnor från betyget i recensionsobjektet
    for (let i = 0; i < object[x].grade; i++) {
        grade += "&#9733;";
    }
    while (grade.length < 35) {
        grade += "&#9734;"
    }
    review.innerHTML += "<div class=\"crop\"><img src=\"./bilder/shoe" + x + ".jpg\" alt=\"Testad sko.\"></div>";
    review.innerHTML += "<h1>" + object[x].name + " <span class=\"grade\">" + grade + "</span></h1>";
    review.innerHTML += "<span class=\"bold\">Vikt: </span>" + object[x].weight + " gram<br>";
    review.innerHTML += "<span class=\"bold\">Drop: </span>" + object[x].drop + " millimeter<br>";
    review.innerHTML += "<span class=\"bold\">Användning: </span>" + object[x].use + "<br>";
    review.innerHTML += "<h2>" + object[x].headline + "</h2>";
    review.innerHTML += "<p class=\"reviewText\">" + object[x].review + "</p>";
    grade = ""
    showComments()
}