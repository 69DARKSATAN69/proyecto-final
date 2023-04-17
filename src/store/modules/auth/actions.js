export default {
    async login(context, payload){
        //En el caso de cambiar como funciona el register, esto tambien tendra que irse.
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9fbj0YepcSEm7ReuMjFhSX4woOfV9Qlk',
        {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
       
        const responseData = await response.json();
        if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'The server dislikes you. Get out. (but seriously, the request was performed incorrectly)');
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });


    },
  async signup(context, payload){
    console.log(payload);
    //Esta parte guarda los datos en el modulo de auth de firebase. Probablemente tendre que borrarlo.
   const userData = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      
    };
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9fbj0YepcSEm7ReuMjFhSX4woOfV9Qlk',
        {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        const responseData = await response.json();
        if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.error.message || 'The server dislikes you. Get out. (but seriously, the request was performed incorrectly)');
            throw error;
      
        }
        console.log(userData);
        //A partir de aqui guarda los usuarios en la base de datos. Probablemente tendre que mantener esto.
        const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.username}.json`, {
            method: 'PUT',
            body: JSON.stringify({username: userData.username, email: userData.email, password: userData.password}),
        });
        const response2Data = await response2.json();
        if(!response2.ok){
            console.log(response2Data);
            const error = new Error(response2Data.error.message || "Saving the user's data in the database did not work as expected");
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    logout(context){
        context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null
    });
},
    async getUsers(){
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD9fbj0YepcSEm7ReuMjFhSX4woOfV9Qlk', {
            method: 'POST'
        });
        console.log(response);
    }

};