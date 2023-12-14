Je pense que le role gard ne servira qu'a protéger les routes  admin.
Il faudra un guard pour vérifier que le user qui modifie un truc, est bien le propriétaire.

Mais pour protéger les accès aux routes classiques il faudra utiliser un système de permission associée aux rôles je pense.



Quelles sont les permissions type à accorder ? 
- des droits de lecture
- des droits d'écriture
- des droits de suppression
- des droits de création
Chaque fonction de droit pourrait prendre deux arguments : 
- le user actuel et son/ses rôles ou abonnement
- le/les rôles autorisés
- le/les droit autorisé (lecture)

Réflechir à un truc sous forme de hook ou de priorité peut être, car si on attribut deux permissions à une action, il peut y avoir des conflits.


Prochain git : 
- j'ai ajouté le super admin pour les routes roles
- j'ai ajouté le auth pour les routes images.