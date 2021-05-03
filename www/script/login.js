var login = document.getElementById("form");
var username = document.getElementById("pseudonyme");
var userpwd = document.getElementById("mdp");

var isLogged = false;

login.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        xhr = new XMLHttpRequest();
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                if (/^Bonjour.*\n$/.test(xhr.responseText)) {
                    isLogged = true;
                    console.log("L'utilisateur est maintenant connecté!!!");
                }
                document.getElementById("text_rep").innerText = xhr.responseText;
            } else
                console.log("!200");
        }
    };
    xhr.open("POST", "../htbin/login.py", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //console.log("username:" + username.value + "&userpwd:" + userpwd.value);
    xhr.send("username=" + username.value + "&userpwd=" + userpwd.value);
});

// on enlève les boutons de connexion si l'utilisateur est bien connecté:
if (isLogged) {
    var headButtons = document.getElementsByClassName("head-button");
    for (var i = 0; i < headButtons.length; ++i) {
        headButtons[i].style.display = "none";
    }
    var tocButtons = document.getElementsByClassName("noDisplayIfLogged");
    for (var i = 0; i < tocButtons.length; ++i) {
        tocButtons[i].style.display = "none";
    }
}
