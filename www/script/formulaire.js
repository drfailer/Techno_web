var form = document.getElementById("form");
var input_nom = document.getElementById("nom");
var input_prenom = document.getElementById("prenom");
var input_date = document.getElementById("date");
var input_pseudo = document.getElementById("pseudonyme");
var input_mdp = document.getElementById("mdp");
var input_adresse = document.getElementById("adresse");
var input_valider = document.getElementById("valider");

var input_obligatoire = document.getElementsByClassName("obligatoire");

var input_correct = {
    "nom": true,
    "prenom": true,
    "date": true,
    "pseudonyme": true,
    "mdp": true,
    "adresse": true,
};
var messages_input_incorrect = {
    "nom": "",
    "prenom": "",
    "spe_date": "",
    "pseudonyme": "",
    "spe_pseudonyme": "Le pseudonyme doit faire au moins 6 caractères.",
    "mdp": "",
    "spe_mdp": "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et faire avoir au moins 8 caractères.",
    "adresse": "",
    "spe_adresse": "L'adresse doit s'écrire comme ceci : x@x.x ."
};


var text_err = [
    document.getElementById("text_err_nom"),
    document.getElementById("text_err_prenom"),
    document.getElementById("text_err_date"),
    document.getElementById("text_err_pseudo"),
    document.getElementById("text_err_spe_pseudo"),
    document.getElementById("text_err_passwd"),
    document.getElementById("text_err_spe_passwd"),
    document.getElementById("text_err_mail"),
    document.getElementById("text_err_spe_mail")
];

function test_obligatoire(el) {
    if (el.value.length == 0) {
        el.style.backgroundColor = "#FF0000";
        messages_input_incorrect[el.id] = el["id"] + " doit être renseigné.";
        input_correct[el.id] = false;

    } else {
        el.style.backgroundColor = "#FFFFFF";
        input_correct[el.id] = true;
        messages_input_incorrect[el.id] = ""
    }
}

for (let el of input_obligatoire) {
    el.addEventListener('input', function () {
        test_obligatoire(el);
    }, true);
    test_obligatoire(el);
}

input_pseudo.addEventListener('input', function (e) {
    e.stopPropagation();
    if (input_pseudo.value.length < 6) {
        input_pseudo.style.backgroundColor = "#FF0000";
        input_correct["pseudonyme"] = false;
        messages_input_incorrect["spe_pseudonyme"] = "Le pseudonyme doit faire au moins 6 caractères.";
    } else {
        input_pseudo.style.backgroundColor = "#FFFFFF";
        input_correct["pseudonyme"] = true;
        messages_input_incorrect["spe_pseudonyme"] = ""
    }

}, false)

input_mdp.addEventListener('input', function (e) {
    e.stopPropagation();
    if (!input_mdp.value.match(/(?=.*[a-z]+.*)(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[^\s]{8,}/)) {
        input_mdp.style.backgroundColor = "#FF0000";
        input_correct["mdp"] = false;
        messages_input_incorrect["spe_mdp"] = "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et faire avoir au moins 8 caractères.";
    } else {
        input_mdp.style.backgroundColor = "#FFFFFF";
        input_correct["mdp"] = true;
        messages_input_incorrect["spe_mdp"] = ""
    }

}, false)

input_adresse.addEventListener('input', function (e) {
    e.stopPropagation();
    if (!input_adresse.value.match(/.+@.+\..+/)) {
        input_adresse.style.backgroundColor = "#FF0000";
        input_correct["adresse"] = false;
        messages_input_incorrect["spe_adresse"] = "L'adresse doit s'écrire comme ceci : x@x.x .";
    } else {
        input_adresse.style.backgroundColor = "#FFFFFF";
        input_correct["adresse"] = true;
        messages_input_incorrect["spe_adresse"] = ""
    }

}, false)

input_date.addEventListener('input', function (e) {
    e.stopPropagation();
    let array_date = input_date.value.split("/");

    input_date.style.backgroundColor = "#FF0000";
    messages_input_incorrect["spe_date"] = "La date doit s'écrire comme ceci : jj/mm/aaaa.";
    input_correct["date"] = false;
    if (array_date[2] != undefined && array_date[2].length == 4) {
        let date = new Date(array_date[2], array_date[1], array_date[0]);
        if (!isNaN(date) && date <= Date.now()) {
            input_date.style.backgroundColor = "#FFFFFF";
            messages_input_incorrect["spe_date"] = "";
            input_correct["date"] = true;
        }

    } else if (input_date.value.length == 0) {
        input_date.style.backgroundColor = "#FFFFFF";
        messages_input_incorrect["spe_date"] = "";
        input_correct["date"] = true;
    }
}, false)

input_valider.addEventListener('click', function (e) {
    e.preventDefault();
    let formulaireComplet = true;
    for (let b in input_correct) {
        if (input_correct[b] === false) {
            formulaireComplet = false;
            console.log(b);
        }
    }
    if (formulaireComplet == true) {
        form.submit();
    } else {
        i = 0;
        input_valider.style.backgroundColor = "#FF0000";
        for (let msg in messages_input_incorrect) {
            if (messages_input_incorrect[msg] != "") {
                console.log(messages_input_incorrect[msg]);
                text_err[i].innerHTML = messages_input_incorrect[msg];
            }
            i++;
        }
    }
})
