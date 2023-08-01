import axios from 'axios';
import { createContext, useContext, useState } from 'react';






// tous les fonctions qui sont indispensable a notre logique sont dans ce fichier 
export const productsApi = axios.create({
    baseURL: "http://localhost:9000"
});


// recuperer tous les produits 
export const getProducts = (keyword = "", page = 1, size = 4) => {

    return productsApi.get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
}


// delete le produits choisi en parametre
export const deleteProduct = (product) => {

    return productsApi.delete(`/products/${product.id}`);

}


// recuperer le produit choisi en param
export const getProductById = (id) => {
    return productsApi.get(`/products/${id}`)
};

export const saveProduct = (product) => {

    return productsApi.post(`/products`, product);

}

export const checkProduct = (product) => {
    return productsApi.patch(`/products/${product.id}`, { checked: !product.checked })
};

export const updateProduct = (product) => {

    return productsApi.put(`/products/${product.id}`, product);

}

export const AppContext = createContext();

// creation d'un hook personnalisé qui permet de centralisé l'état 
export const useAppState = () => {
    // initialisation du state avec des valeurs par défaut
    const initialState = {
        products: [],
        currentPage: 1,
        pageSize: 4,
        keyword: "",
        totalPages: 0

    };
    // création et renvoi du customHook
    const appState = useState(initialState);
    return appState;



}

// l'etat de notre application


