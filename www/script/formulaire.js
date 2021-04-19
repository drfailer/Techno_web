var input_nom = document.getElementById("#nom");
var input_prenom = document.getElementById("#prenom");
var input_date = document.getElementById("#date");
var input_pseudo = document.getElementById("#pseudonyme");
var input_mdp = document.getElementById("#mdp");
var input_adresse = document.getElementById("#adresse");
var input_valider = document.getElementById("#valider");

var input_obligatoire = document.getElementsByClassName("obligatoire");

var input_correct = {
    "nom": true,
    "prenom": true,
    "date": true,
    "pseudonyme": true,
    "mdp": true,
    "adresse": true,
};

function test_obligatoire(el) {
    if (el.value.length == 0) {
        el.style.backgroundColor = "#FF0000";
        input_correct[el.id] = false;

    } else {
        el.style.backgroundColor = "#FFFFFF";
        input_correct[el.id] = true;
    }
}

for (let el of input_obligatoire) {
    el.addEventListener('input', function (e) {
        test_obligatoire(el);
    });
    test_obligatoire(el);
}
input_pseudo.addEventListener('input', function (e) {
    e.stopPropagation();
    if (input_pseudo.value.length < 6) {
        input_pseudo.style.backgroundColor = "#FF0000";
        input_correct[input_pseudo.id] = false;
    } else {
        input_pseudo.style.backgroundColor = "#FFFFFF";
        input_correct[input_pseudo.id] = true;
    }

}, false)

input_mdp.addEventListener('input', function (e) {
    e.stopPropagation();
    if (!input_mdp.value.match(/(?=.*[a-z]+.*)(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[^\s]{8,}/)) {
        input_mdp.style.backgroundColor = "#FF0000";
        input_mdp[input_pseudo.id] = false;
    } else {
        input_mdp.style.backgroundColor = "#FFFFFF";
        input_mdp[input_pseudo.id] = true;
    }

}, false)

input_adresse.addEventListener('input', function (e) {
    e.stopPropagation();
    if (!input_adresse.value.match(/.+@.+\..+/)) {
        input_adresse.style.backgroundColor = "#FF0000";
        input_adresse[input_pseudo.id] = false;
    } else {
        input_adresse.style.backgroundColor = "#FFFFFF";
        input_adresse[input_pseudo.id] = true;
    }

}, false)

input_date.addEventListener('input', function (e) {
    e.stopPropagation();
    let array_date = input_date.value.split("/");

    input_date.style.backgroundColor = "#FF0000";
    if (array_date[2] != undefined && array_date[2].length == 4) {
        let date = new Date(array_date[2], array_date[1], array_date[0]);
        if (!isNaN(date)) {
            input_date.style.backgroundColor = "#FFFFFF";
        }

    } else if (input_date.value.length == 0) {
        input_date.style.backgroundColor = "#FFFFFF";
    }
}, false)

input_valider.addEventListener('click', function (e) {
    let formulaireComplet = true;
    for (let b in input_correct) {
        if (input_correct[b] === false) {
            formulaireComplet = false;
        }
    }
    if (formulaireComplet == true) {
        input_valider.style.backgroundColor = "#FFFFFF";
        let data = {
            'lastname': input_nom.value,
            'firstname': input_prenom.value,
            'birthdate': input_date.value,
            'username': input_pseudo.value,
            'userpwd': input_mdp.value,
            'useremail': input_adresse.value,
        };
        console.log(data);
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 200) {
                console.log("Fait");
            } else {
                console.log("ERROR");
            }
        };
        req.open('POST', './htbin/register.py');
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(data);
    } else {
        input_valider.style.backgroundColor = "#FF0000";
    }
})
