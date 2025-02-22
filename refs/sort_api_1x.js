export const ALL_SORTS = [
    {
        "slug": "aide",
        "title": "Aide",
        "type": "spell",
        "level": 2,
        "school": "abj",
        "category": "heal",
        "castingTime": {
            "value": 1,
            "units": "action",
            "condition": null,
            "display": "1 action"
        },
        "range": {
            "value": 9,
            "units": "m",
            "display": "9 m"
        },
        "area": {
            "type": null,
            "value": null,
            "units": null,
            "display": null
        },
        "components": {
            "vocal": true,
            "somatic": true,
            "material": true,
            "ritual": false,
            "concentration": false
        },
        "materials": {
            "value": "Une minuscule bandelette de tissu blanc",
            "consumed": false,
            "cost": 0
        },
        "duration": {
            "value": 8,
            "units": "hour",
            "display": null
        },
        "target": "jusqu'à 3 créatures à portée",
        "save": {
            "ability": null,
            "dc": null,
            "scaling": "spell",
            "success": null
        },
        "damages": [
            {
                "value": "5",
                "type": "temphp"
            }
        ],
        "altDamages": null,
        "scaling": {
            "mode": "level",
            "formula": "5"
        },
        "conditions": null,
        "sortDamageTypes": [
            "temphp"
        ],
        "sortCastingTime": "1",
        "sortDuration": "3.08",
        "sortRange": "2.06",
        "sortArea": null,
        "classes": [
            "cleric",
            "paladin"
        ],
        "subclasses": null,
        "sources": [
            "BBERNPJDR01"
        ],
        "sourcePages": [
            252
        ],
        "appearance": "Votre pouvoir divin rend force et courage à vos compagnons.",
        "toc": [],
        "body": {
            "type": "root",
            "children": [
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "strong",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Effet :"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " le maximum de points de vie et les points de vie actuels de chaque cible augmentent de 5."
                        }
                    ]
                },
                {
                    "type": "text",
                    "value": "\n"
                },
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "strong",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "À plus haut niveau."
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " Emplacement de niveau 3 ou plus : +5 points de vie aux cibles par niveau d’emplacement supplémentaire."
                        }
                    ]
                }
            ]
        },
        "dir": "/sorts",
        "path": "/sorts/aide",
        "extension": ".md",
        "createdAt": "2025-02-13T15:30:17.094Z",
        "updatedAt": "2025-02-13T15:30:17.094Z"
    },
    {
        "slug": "agrandir-retrecir",
        "title": "Agrandir/Rétrécir",
        "type": "spell",
        "level": 2,
        "school": "trs",
        "category": "utility",
        "castingTime": {
            "value": 1,
            "units": "action",
            "condition": null,
            "display": "1 action"
        },
        "range": {
            "value": 9,
            "units": "m",
            "display": "9 m"
        },
        "area": {
            "type": null,
            "value": null,
            "units": null,
            "display": null
        },
        "components": {
            "vocal": true,
            "somatic": true,
            "material": true,
            "ritual": false,
            "concentration": true
        },
        "materials": {
            "value": "Une pincée de limaille de fer",
            "consumed": false,
            "cost": 0
        },
        "duration": {
            "value": 1,
            "units": "min",
            "display": null
        },
        "target": "une créature ou un objet à portée qui n’est ni porté ni transporté dans le champ de vision du lanceur",
        "save": {
            "ability": "con",
            "dc": null,
            "scaling": "spell",
            "success": "negates"
        },
        "damages": null,
        "altDamages": null,
        "scaling": {
            "mode": null,
            "formula": null,
            "display": null
        },
        "conditions": null,
        "sortDamageTypes": null,
        "sortCastingTime": "1",
        "sortDuration": "2.01",
        "sortRange": "2.06",
        "sortArea": null,
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "subclasses": null,
        "sources": [
            "BBERNPJDR01"
        ],
        "sourcePages": [
            252
        ],
        "appearance": "La cible devient aussi grande qu’un géant ou, au contraire, sa taille est réduite de moitié.",
        "toc": [],
        "body": {
            "type": "root",
            "children": [
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "strong",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Effet :"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " la cible, si elle n’est pas consentante, effectue un jet de sauvegarde. Pour une cible consentante, se reporter à l’effet « échec »."
                        }
                    ]
                },
                {
                    "type": "text",
                    "value": "\n"
                },
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Réussite"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " : rien"
                        }
                    ]
                },
                {
                    "type": "text",
                    "value": "\n"
                },
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Échec (agrandir)"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " : la cible, et tout ce qu’elle porte et transporte, double de taille dans toutes les dimensions. Son poids est multiplié par huit. Sa catégorie de taille augmente d’un cran (taille Petite devient Moyenne, taille Moyenne devient Grande, par exemple). Si elle n’a pas assez de place pour doubler de volume, elle atteint la taille maximale possible dans l’espace dont elle dispose."
                        },
                        {
                            "type": "element",
                            "tag": "br",
                            "props": {},
                            "children": []
                        },
                        {
                            "type": "text",
                            "value": "\n"
                        },
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Spécial"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " : la cible bénéficie pendant la durée du sort d’un "
                        },
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "avantage"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " aux tests et aux jets de sauvegarde de Force. Ses armes infligent 1d4 dégâts supplémentaires."
                        }
                    ]
                },
                {
                    "type": "text",
                    "value": "\n"
                },
                {
                    "type": "element",
                    "tag": "p",
                    "props": {},
                    "children": [
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Échec (rétrécir)"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " : la cible, et tout ce qu’elle porte et transporte, voit sa taille réduite de moitié dans toutes les dimensions. Son poids est divisé par huit. Sa catégorie de taille diminue d’un cran (de taille Grande à Moyenne, ou de taille Moyenne à Petite, par exemple)."
                        },
                        {
                            "type": "element",
                            "tag": "br",
                            "props": {},
                            "children": []
                        },
                        {
                            "type": "text",
                            "value": "\n"
                        },
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "Spécial"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " : elle subit un "
                        },
                        {
                            "type": "element",
                            "tag": "em",
                            "props": {},
                            "children": [
                                {
                                    "type": "text",
                                    "value": "désavantage"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "value": " aux tests et aux jets de sauvegarde de Force. Ses armes infligent 1d4 dégâts de moins (minimum 1 dégât)."
                        }
                    ]
                }
            ]
        },
        "dir": "/sorts",
        "path": "/sorts/agrandir-retrecir",
        "extension": ".md",
        "createdAt": "2025-02-13T15:30:17.094Z",
        "updatedAt": "2025-02-13T15:30:17.094Z"


    }];
