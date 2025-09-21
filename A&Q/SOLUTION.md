Voici mes réponses détaillées aux questions du test technique :

## 📝 **Réponses aux Questions de Réflexion**

### **Question 1 : Protection contre les attaques de bots**

> Pour cette question, il faut combiner plusieurs approches. La première consiste à utiliser un système de captcha, et ou des champ, dans le formulaire idéalement invisible, qui ne s’active qu’en cas de suspicion (par exemple après plusieurs soumissions depuis la même adresse IP, ou . Cela évite de pénaliser les vrais utilisateurs tout en filtrant une bonne partie des robots. On peut aussi mettre en place un mécanisme de limitation de taux : au-delà d’un certain nombre de tentatives sur une période donnée, la requête est bloquée ou l’IP temporairement bannie, avec une durée de blocage qui peut s’allonger en cas de récidive.

> Une autre mesure assez courante consiste à ajouter des champs « pièges » cachés dans le formulaire. Les bots, qui remplissent tout automatiquement, tombent généralement dedans (ban si champs non visible rempli et aussi permet de bloquer leurs soumissions immédiatement). Cela permet de mettre a jour la liste noire des adresses IP suspectes, afin de filtrer le trafic malveillant dès son arrivée. 

> en plus côté infrastructure, prévoir une protection contre les attaques DDoS et, aussi répartir les serveurs par zone géographique pour absorber les pics et limiter l’impact des attaques.


#### **Recap  des Solutions Techniques**

**1. Captcha et Validation Humaine**

Validation invisible basée sur le comportement utilisateur. apres plusieurs tentatives d'une meme adresse IP demande a valider un captcha pour eviter les abus

**2. Rate Limite  et le nombre de tentative**

limiter le nombre de soumissions par une meme adresse IP sur une periode de temps. faire une formule ou un nombre de tentative ban pendant un moment . augmenter le delai a chaque tentative a chaque ban

**3. Ban basé sur des champs non existant** : 

Champs cachés détectés par les bots. si soumission avec cette donné bloquer l'adresse IP directement

**4. Blacklist IP**: Blocage des adresses IP suspectes

**5. Mettre en place une Protection DDoS**

**6. Servueur par zone** : Distribution géographique pour réduire la charge 




------

### **Question 2 : API REST haute performance (10 000 req/s)**

> Ici, l’important etant d'avoir une architecture qui peut monter en charge et rester disponible, Le load balancing et le scaling horizontal sont indispensables pour répartir le trafic sur plusieurs serveurs. 
> Dans un second temps, pour réduire la charge directe sur l’API on ajoute a cela des caches à différents niveaux : un cache en mémoire (par exemple Redis) pour les données les plus demandées et un CDN pour distribuer les réponses au plus près des utilisateurs.

>D'un autre coté on optimise la base de donnée. Ajouter  des index bien pensés pour faciliter lles lecture sur la base de donnée, voire l’usage d’une base NoSQL si la nature des données s’y prête. On peut penser a faire des réplicas en lecture. Dans les cas de très gros volumes, le partitionnement et un suivi des requêtes lentes permettent d’anticiper les goulots d’étranglement.

> Côté application, on peut paginer les requettes pour éviter de renvoyer trop de résultats, ou encore utiliser GraphQL pour ne renvoyer que les données nécessaires. Pour absorber les pics de charge, ça peut etre utile d'avoirune file d’attente (RabbitMQ, Kafka ...) afin de lisser les traitements et éviter de saturer la base de données. ça demande une bonne maîtrise mais mal implémentation peut dégrader l’expérience utilisateur.


#### **Architecture et Infrastructure**

1. Load Balancing et Scaling Horizontal**

2. Cache Multi-Niveaux (pour repondre differente problematique)
- Cache en mémoire pour les données fréquentes avec **Redis ou autre** .permet de ne pas soliciter le server si donner deja charge au moins une fois
- **CDN** : Cache géographique (Cloudflare, AWS CloudFront). permet d'avoir moins de traffique et de charge sur le serveur. limité les acces au differente points d'entree de chaque zone

3. Optimisée la base de Données
- Read Replicas : Réplication en lecture
- Connection Pooling : Pool de connexions optimisé
- Index optimisés pour les requêtes fréquentes
- NoSQL : Pour les données non relationnelles et haute performance
- Partitionnement : Diviser les tables volumineuses
- Monitorer et optimiser Optimisation des requêtes lentes** 

2. Optimisation des Requêtes**
-  Ajouter des pagination pour limité des résultats 
-  GraphQL :  pour permettre de choisir que les données d'ou avoir des requetes semblable mooins couteuse 
- Regrouper les requêtes multiples 
- Ajouter un systeme de queue pour eviter beaucoup de requetes simultanée :
   - Utiliser des systèmes de queue comme **RabbitMQ, Kafka ou AWS SQS** pour gérer les pics de trafic et lisser les requêtes vers la base de données.




Avec 60-80% de ces solutions peuvent réduire la charge serveur et atteindre les 10 000 req/s. Le tout en evitant les spams intempestifs et en gardant une bonne experience utilisateur.
le choix le plus difficile sera le systeme de queue qui peux agir sur l'experience utilisateur si mal implementé.