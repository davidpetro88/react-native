# photo-feed

----------------------------------------------------------------------

### Firebase

- Add project

![](img/firebase/firebase.png)

- Create database
![](img/firebase/firebase7.png)

![](img/firebase/firebase8.png)



- Acess menu Project Settings

![](img/firebase/firebase2.png)

- Click add firebase to your web app

![](img/firebase/firebase3.png)

![](img/firebase/firebase4.png)

- Replace the file config/config.js

```

var config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
};

```

- Firebase rules

![](img/firebase/firebase9.png)

    
```

{
  "rules": {
    "photos":{
      //Anyone can read photos
      ".read": true,
    	"$photoId": {
        //Can only write or edit if you are the author
        ".write": "root.child('photos').child($photoId).child('author').val() == auth.uid || newData.child('author').val() == auth.uid",
        "author":{
          ".validate": "newData.val() == auth.uid"
        }
      }
    },
    "users": {
      "$userId": {
      	".read": "auth.uid == $userId",
        ".write": "auth.uid == $userId",
        "username": {
        	".read": true
        },
        "name": {
        	".read": true
        },
        "avatar": {
        	".read": true
        },
        "photos": {
        	".read": true
        },
        "email": {
          ".read": "auth.uid == $userId"
        }
      }
    },
    "comments": {
      //Anyone can read comments
      ".read": true,
      "$photoId": {
        "$commentId": {
          ".write": "root.child('comments').child($photoId).child($commentId).child('author').val() == auth.uid || newData.child('author').val() == auth.uid",
          "author": {
            ".validate": "newData.val() == auth.uid"
          }
        }
      }
    }
  }
}

```



- Firebase Authentication

![](img/firebase/firebase5.png)

![](img/firebase/firebase10.png)


- Firebase storage

![](img/firebase/firebase11.png)

![](img/firebase/firebase12.png)

----------------------------------------------------------------------


- User Test
```
Email : test@user.com 
Passsword: password
```
