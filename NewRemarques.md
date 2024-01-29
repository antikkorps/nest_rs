## Les commentaires doivent acceuillir des réponses et des réactions.
- post like = table pour les likes


- comment like = table pour les likes

- comment reaction : heart, thumb, smiley...

- comment response : la table comment doit être polymorphique
    - response to comment response


- message reaction: heart, thumb, smiley...

- message response : ça sera sur instant message
    - response to message response





## Supprimer MediaPost? I think yes, PostTypeChoice->PostContent replace it right?




Sur le salon : ajouter un système de recherche par nom / zipcode / country etc.
Penser au fonctionnement d'un tag sur un mec. Il faut qu'il recoive une notif de ce tag. Un slug pour le nom et le salon? Pour taguer il faut rechercher.



## Pour Franck
Tu peux créer des posts via le seeding 
Ensuite tu peux créer un commentaire sur la route : http://localhost:4000/api/v1/post/ID_DU_POST/comment
Avec ce body : {
    "description": "Sous réponse à la réponse de la reponse vieille",

}


Pour ajouter une réponse à un commentaire, il suffit d'ajouter au body le parentId (id du comm)
{
    "description": "Sous réponse à la réponse de la reponse vieille",
    "parentId": 8  <--
}


Puis tu as la route : http://localhost:4000/api/v1/post/comment/ID DU POST
Sur laquelle tu récupes les comms du post de ton choix. 

