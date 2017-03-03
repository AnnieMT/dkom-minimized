# dkom_minimized
The dkom_minimized is a simple XSA application used for the DKOM presentation. It offers a backend part (nodejs) which is connecting to a external service (API Management)
and a UI (sapui5) which displays the data to the visitor.

#Setup

### Backend (NodeJS)
Open the **_server.js_** and write the external service API url to be used. After this run the server.js file on the WebIDE to start the service.

### Frontend (SapUI5)
Open the **_app.controller.js_** and replace the port with the port from your backend (NodeJS).


# Backend functionality
The backend offers an interface to connect to an external api. You can call the backend as followed:

__API:__

Connecting to the external API.

```
?option=api&id=<int>&networkRating=<int[0-100]>&externalRating=<int[0-100]>
```

example:

```
https://lu33984963.dhcp.wdf.sap.corp:51045/?option=api&id=91114&networkRating=12&externalRating=42
```

returns:

```
{
    "V_RATING": 4,
    "V_MESSAGE": {
        "externalRating": 5,
        "networkRating": 3,
        "externalRatingWeight": 12,
        "networkRatingWeight": 12,
        "calculation": "round((5*12+3*12)/ (12+12))"
    },
    "color": "#61a656"
}
```

__DATA:__

```
?option=data?id=<int>
```

example:

```
https://lu33984963.dhcp.wdf.sap.corp:51045/?option=data?id=91114
```

returns:

```
{
    "Data": [{
        "id": "91114",
        "type": "person",
        "name": "Firstname, Lastname",
        "ownCapital": 10000,
        "rating": "0",
        "age": "28",
        "schufa": "1",
        "loans": "0",
        "transactions": [{
            "id": "1",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "2",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "3",
            "accountId": "25",
            "accountName": "Easy Loan North-West",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "4",
            "accountId": "4",
            "accountName": "Robert Carter",
            "accountType": "person",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "5",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }, {
            "id": "6",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }]
    }, {
        "id": "11948",
        "type": "person",
        "name": "Dawod, Sana",
        "ownCapital": 5750,
        "rating": "0",
        "age": "30",
        "schufa": "0",
        "loans": "5000.00",
        "transactions": [{
            "id": "1",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "2",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "3",
            "accountId": "25",
            "accountName": "Easy Loan North-West",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "4",
            "accountId": "4",
            "accountName": "Robert Carter",
            "accountType": "person",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }]
    }, {
        "id": "81201",
        "type": "person",
        "name": "Rai, Abdul Kader",
        "ownCapital": 12030,
        "rating": "0",
        "age": "30",
        "schufa": "2",
        "loans": "10000.00",
        "transactions": [{
            "id": "1",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "2",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "3",
            "accountId": "25",
            "accountName": "Easy Loan North-West",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "4",
            "accountId": "4",
            "accountName": "Robert Carter",
            "accountType": "person",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "5",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }, {
            "id": "6",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }]
    }, {
        "id": "63031",
        "type": "person",
        "name": "Wagner, Marc",
        "ownCapital": 3203,
        "rating": "0",
        "age": "35",
        "schufa": "3",
        "loans": "5000.00",
        "transactions": [{
            "id": "1",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "2",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "3",
            "accountId": "25",
            "accountName": "Easy Loan North-West",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "4",
            "accountId": "4",
            "accountName": "Robert Carter",
            "accountType": "person",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "5",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }, {
            "id": "6",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }]
    }, {
        "id": "78168",
        "type": "person",
        "name": "Block, Meinolf",
        "ownCapital": 47600,
        "rating": "0",
        "age": "20",
        "schufa": "4",
        "loans": "1000.00",
        "transactions": [{
            "id": "1",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "2",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "3",
            "accountId": "25",
            "accountName": "Easy Loan North-West",
            "accountType": "credit institution",
            "timestamp": "2008-06-07T09:36:50.000Z",
            "value": "69476.94",
            "transactionType": "in"
        }, {
            "id": "4",
            "accountId": "4",
            "accountName": "Robert Carter",
            "accountType": "person",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "in"
        }, {
            "id": "5",
            "accountId": "29",
            "accountName": "Cash Loan CO.",
            "accountType": "credit institution",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }, {
            "id": "6",
            "accountId": "13",
            "accountName": "Zboncak-Predovic",
            "accountType": "company",
            "timestamp": "2008-06-27T09:36:50.000Z",
            "value": "2476.94",
            "transactionType": "out"
        }]
    }]
}
```

__LIST:__

Returns a list with all "dummy" data that have been attached to the demo.

```
?option=list
```