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

        //Esta parte comprueba si el usuario esta capado o no.
        const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
        const data2 = await response2.json();
        console.log(data2);
        Object.values(data2).forEach(e => {
            if(payload.email === e.email){
                context.commit('setNavigation', {
                    canNavigate: e.canNavigate
                });
            }
        });
        if(!response2.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'The server dislikes you. Get out. (but seriously, the request was performed incorrectly)');
            throw error;

        }
        context.commit('setUser', {
            email: responseData.email,
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
        canNavigate: true,
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
        userNumber: payload.userNumber

      
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
        const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.userNumber}.json`, {
            method: 'PUT',
            body: JSON.stringify({username: userData.username, email: userData.email, canNavigate: userData.canNavigate, userNumber: userData.userNumber}),
        });
        const response2Data = await response2.json();
        if(!response2.ok){
            console.log(response2Data);
            const error = new Error(response2Data.error.message || "Saving the user's data in the database did not work as expected");
            throw error;
        }
        //Esta parte guarda los datos en la store de vuex
        context.commit('setUser', {
            email: responseData.email,
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    logout(context){
        context.commit('setUser', {
        email: null,
        token: null,
        userId: null,
        tokenExpiration: null
    });
    context.commit('setNavigation', {
        canNavigate: true
    });
  
},
//Esta funcion es para que los admins puedan capar o no la navegacion del usuario
    async toggleNavigation(_, payload){
        const response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users/${payload.userNumber}.json`, {
            method: 'PUT',
            body: JSON.stringify({canNavigate: payload.canNavigate, email: payload.email, username: payload.username, userNumber: payload.userNumber}),
        });
        const responseData = await response.json();
        if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.error.message || 'The server dislikes you. Get out. (but seriously, the request was performed incorrectly)');
            throw error;
      
        }


},
//Esta funcion esta hecha para pruebas, comprueba los datos del usuario seleccionado
async grabNavigation(_, payload) {
    
      const response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users/${payload.userNumber}.json`);
      const data = await response.json();
      if(!response.ok){
        console.log(data);
        const error = new Error(data.error.message || 'The server dislikes you. Get out. (but seriously, the request was performed incorrectly)');
        throw error;
  
    }

    },



}