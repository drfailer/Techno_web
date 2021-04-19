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
    "date": "",
    "spe_date": "La date doit s'écrire comme ceci : jj/mm/aaaa.",
    "pseudonyme": "",
    "spe_pseudonyme": "Le pseudonyme doit faire au moins 6 caractères.",
    "mdp": "",
    "spe_mdp": "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et faire avoir au moins 8 caractères.",
    "adresse": "",
    "spe_adresse": "L'adresse doit s'écrire comme ceci : x@x.x ."
};

var text_err = document.getElementById("text_err");

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
    el.addEventListener('input', function(e) {
        test_obligatoire(el);
    }, true);
    test_obligatoire(el);
}

input_pseudo.addEventListener('input', function(e) {
    e.stopPropagation();
    if (input_pseudo.value.length < 6) {
        input_pseudo.style.backgroundColor = "#FF0000";
        input_correct[input_pseudo.id] = false;
        messages_input_incorrect["spe_pseudonyme"] = "Le pseudonyme doit faire au moins 6 caractères.";
    } else {
        input_pseudo.style.backgroundColor = "#FFFFFF";
        input_correct[input_pseudo.id] = true;
        messages_input_incorrect["spe_pseudonyme"] = ""
    }

}, false)

input_mdp.addEventListener('input', function(e) {
    e.stopPropagation();
    if (!input_mdp.value.match(/(?=.*[a-z]+.*)(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[^\s]{8,}/)) {
        input_mdp.style.backgroundColor = "#FF0000";
        input_mdp[input_pseudo.id] = false;
        messages_input_incorrect["spe_mdp"] = "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et faire avoir au moins 8 caractères.";
    } else {
        input_mdp.style.backgroundColor = "#FFFFFF";
        input_mdp[input_pseudo.id] = true;
        messages_input_incorrect["spe_mdp"] = ""
    }

}, false)

input_adresse.addEventListener('input', function(e) {
    e.stopPropagation();
    if (!input_adresse.value.match(/.+@.+\..+/)) {
        input_adresse.style.backgroundColor = "#FF0000";
        input_adresse[input_pseudo.id] = false;
        messages_input_incorrect["spe_adresse"] = "L'adresse doit s'écrire comme ceci : x@x.x .";
    } else {
        input_adresse.style.backgroundColor = "#FFFFFF";
        input_adresse[input_pseudo.id] = true;
        messages_input_incorrect["spe_adresse"] = ""
    }

}, false)

input_date.addEventListener('input', function(e) {
    e.stopPropagation();
    let array_date = input_date.value.split("/");

    input_date.style.backgroundColor = "#FF0000";
    if (array_date[2] != undefined && array_date[2].length == 4) {
        let date = new Date(array_date[2], array_date[1], array_date[0]);
        if (!isNaN(date)) {
            input_date.style.backgroundColor = "#FFFFFF";
            messages_input_incorrect["date"] = "";
        }

    } else if (input_date.value.length == 0) {
        input_date.style.backgroundColor = "#FFFFFF";
        messages_input_incorrect["date"] = "";
    } else {
        messages_input_incorrect["date"] = "La date doit s'écrire comme ceci : jj/mm/aaaa.";
    }
}, false)

input_valider.addEventListener('click', function(e) {
    e.preventDefault();
    let formulaireComplet = true;
    for (let b in input_correct) {
        if (input_correct[b] === false) {
            formulaireComplet = false;
        }
    }
    if (formulaireComplet == true) {
        form.submit();
    } else {
        input_valider.style.backgroundColor = "#FF0000";
        text_err.innerHTML = ""
        for (let i in messages_input_incorrect) {
            text_err.innerHTML += messages_input_incorrect[i];
            if (messages_input_incorrect[i] != "") {
                text_err.innerHTML += "<br /><br />";
            }
        }
    }
})