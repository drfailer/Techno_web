var login = document.getElementById("form");
var username = document.getElementById("pseudonyme");
var userpwd = document.getElementById("mdp");


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
