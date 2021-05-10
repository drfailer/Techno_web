var entree_message = document.getElementById("entree-message");
var sortie_message = document.getElementById("affichage-message");
var resultat_message = document.getElementById("resultat-message");
var submit = document.getElementById("submit-message");

function reload_messagerie() {
    $.post(
        '../htbin/chatget.py', // Le fichier cible côté serveur.
        'false',
        function (data) {
            retour_get_message(data);
        },
        'json'
    );
}



function retour_get_message(data) {
    sortie_message.innerHTML = "";
    for (let i = data.length - 1; i >= 0; i--) {
        sortie_message.innerHTML += `<ul id="message-list">` +
            `<li id="message-head">` + data[i].user + ": " + data[i].date + " " + data[i].time + `</li>` +
            `<li id="message-content">` + data[i].msg + `</li>` +
            `</ul>`
    }
}

submit.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $.post(
        '../htbin/chatsend.py', // Le fichier cible côté serveur.
        {
            msg: entree_message.value
        },
        function (data) {
            retour_post_message(data)
        },

    );

    function retour_post_message(texte_recu) {
        if (texte_recu.num == 1) {
            resultat_message.innerHTML = "Aucun message fournie <br/>"
        } else if (texte_recu.num == -1) {
            resultat_message.innerHTML = "Erreur utilisateur invalide <br/>"
        } else {
            resultat_message.innerHTML = texte_recu.msg;
            reload_messagerie();
        }
    }

})

reload_messagerie();
setInterval("reload_messagerie()", 10000);
