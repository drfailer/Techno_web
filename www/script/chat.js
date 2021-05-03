var entree_message = document.getElementById("entree-message");
var sortie_message = document.getElementById("affichage-message");
var erreur_message = document.getElementById("erreur-message");
var submit = document.getElementById("submit-message");

function reload_messagerie() {
    $.post(
        '../htbin/chatget.py', // Le fichier cible côté serveur.
        'false',
        function(data) {
            retour_get_message(data);
        }, // Nous renseignons uniquement le nom de la fonction de retour.
        'json' // Format des données reçues.
    );
}

setInterval("reload_messagerie()", 10000);

function retour_get_message(texte_recu) {
    console.log(texte_recu);
    sortie_message.innerHTML = "";
    for (let m in texte_recu) {
        sortie_message.innerHTML += "<p>" + texte_recu[m].msg + "</p>";
    }

}

submit.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("coucou");
    $.post(
        '../htbin/chatsend.py', // Le fichier cible côté serveur.
        {
            msg: entree_message.value // Nous supposons que ce formulaire existe dans le DOM.
        },
        function(data) {
            retour_post_message(data)
        }, // Nous renseignons uniquement le nom de la fonction de retour.

    );

    function retour_post_message(texte_recu) {
        console.log(texte_recu);
        if (texte_recu.num == 1) {
            erreur_message.innerHTML = "Aucun message fournie <br/>" + texte_recu[msg]
        } else if (texte_recu.num == -1) {
            erreur_message.innerHTML = "Erreur utilisateur invalide <br/>" + texte_recu[msg]
        } else {
            sortie_message.innerHTML = "<p>" + texte_recu.msg + "</p>";
        }
    }

})