Pour Franck :

Tu auras accès aux endpoint de post à l'url normale : http://localhost:4000/api/v1/post

Je te laisse un modèle de create et un modèle de update pour que tu teste :



## CREATE

{
  "description": "Description",
  "postBody": [
    {
      "postTypeChoice": "MEDIA",
      "postContent": [
        { "content": "url1" },
        { "content": "url2" }
      ]
    },
    {
      "postTypeChoice": "TEXT",
      "postContent": [
        { "content": "Description de tout ça et mes grosses, GROSSES couilles au bord de l'eau, ça fait un radeau." }
      ]
    }
  ],
  "userId": 1,
  "tags": [
    { "name": "@lol" },
    { "name": "@lolqdsqsdqdqsd" }
  ]
}


## UPDATE

{
  "description": "DescriptionUpdated",
  "postBody": [
    {
      "postTypeChoice": "MEDIA",
      "postContent": [
        { "content": "url1UPDATED" },
        { "content": "url2UPDATED" },
        { "content": "url3UPDATED" }
      ]
    }
  ],
  "userId": 1,
  "tags": [
    { "name": "@lolUPDATED" },
    { "name": "@lolqdsqsdqdqsdUPDATED" }
  ]
}