## Pinned post : 
- boolean field on post?
    If we do that it's hard to validate a unique post pinned by user. The only way would be to get all the post and then request the post where pinned is true and take maybe the lastedUpdatedPost in array. 
# pinnedPosts = post { where : { pinned: true }} orderBy updatedAt Asc 
# pinned = pinnedPosts[0];

- table with post id / user id = if user id has already a post in this table, then update (or delete anyway) the old post and update (or create) the new one. Then a user always have an unique pinned...And if we need, to keep an historic of every pinned post's user. This table can be usefull. Instead of deleting the "old" pinned post, we juste create a new one everytime, and take the last entry of each pinned post. Then we keep his historic.


L'option pinned tu l'as au moment de la création du post / à l'update. Mais il faut aussi une route spécifique pour ça. Car ça peut être juste un bouton indépendant du reste qui est en hover sur chaque post qui t'appartient.

## Les commentaires doivent acceuillir des réponses et des réactions.
- post like


- comment like
- comment reaction : heart, thumb, smiley...
- comment response
    - response to comment response


- message reaction: heart, thumb, smiley...
- message response
    - response to message response




## likedItemId supprimé
Prochaine PR supprimer tag slug. Adapté pour la relation -> OK
Dans le getUser il n'y a plus que roles et id du user.

## Supprimer MediaPost? I think yes, PostTypeChoice->PostContent replace it right?



Sur les update et delete de salon. Vérifier is user/admin.
Sur le salon : ajouter un système de recherche par nom / zipcode / country etc.