// // Prod
// const API_BASE_AUTH = "https://cloudinary-serveur.onrender.com/api/auth";

//Local
const API_BASE_AUTH = "http://localhost:3000/api/auth";


export const signupUser = async (email, password, statut) => {

    try {
        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);
        formData.append("statut", statut);

        const response = await fetch(`${API_BASE_AUTH}/signup`, {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "L'inscription a échoué");
        }

        return responseData;
    } 

    catch (error) {
        console.error("Erreur lors de la requête d'inscription :", error);
        throw error;
    }
};


export const loginUser = async (email, password) => {

    try {
        const response = await fetch(`${API_BASE_AUTH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData); 
            throw new Error(responseData.error || "Une erreur est survenue lors de la connexion");
        }

        return responseData;
    } 
    
    catch (error) {
        console.error("Erreur lors de la requête de connexion :", error.message);
        throw error; 
    }
};


export const getUserInfo = async (token) => {

    try {
        const response = await fetch(`${API_BASE_AUTH}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData); 
            throw new Error(responseData.message || "Une erreur s'est produite lors de la récupération des informations de l'utilisateur.");
        }

        
        return responseData;
    } 
    
    catch (error) {
        console.error("Erreur lors de la requête de récupération des informations de l'utilisateur :", error.message);
        throw error; 
    }
};