# AwesomeProject

----------------------------------------------------------------------

### Firebase

- Add project "put the name of the project"

![](img/firebase/firebase.png)

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

#### Firebase Authentication configure

- Email/Password
![](img/firebase/firebase5.png)


- Facebook authentication "require steps facebook"

![](img/firebase/firebase6.png)


----------------------------------------------------------------------

### Facebook

- create new App
![](img/facebook/facebook.png)

- Select facebook "Login"and Click "+ Add Plataform" and add IOS and Android

    - Add IOS "host.exp.Exponent" and ANDROID "rRW++LUjmZZ+58EbN5DVhGAnkX4=" link https://docs.expo.io/versions/latest/sdk/facebook
 
![](img/facebook/facebook2.png)  

- Configure login facebook in project "replace the method loginWithFacebook in the App.js" 
```
    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
            'APP_ID',
            {permissions: ['email', 'public_profile']}
        );

        if (type === 'success') {
            const credentials = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(credentials).catch((error) => {
                console.log('Error ....', error)
            })
        }
    }


```


----------------------------------------------------------------------


### Project running


![](img/project/project.png)
 
![](img/project/project2.png)

![](img/project/project3.png)
