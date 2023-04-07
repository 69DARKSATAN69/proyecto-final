export default {
    login(){},
  async signup(context, payload){
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9fbj0YepcSEm7ReuMjFhSX4woOfV9Qlk',
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
    }
};