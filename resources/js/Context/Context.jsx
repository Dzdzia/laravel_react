import {createContext, useContext, useState} from "react";
//Definiuje nowy kontekst z domyślnymi wartościami. Wszystkie komponenty, które są zagnieżdżone wewnątrz Provider, będą miały dostęp do tych wartości.

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})
// Funkcja do ustawiania wartości token. Zapisuje token w localStorage, aby mógł być dostępny po odświeżeniu strony.
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');


    // Funkcja do ustawiania wartości token. Zapisuje token w localStorage, aby mógł być dostępny po odświeżeniu strony.
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    // Funkcja do ustawiania powiadomień. Automatycznie czyści powiadomienie po 5 sekundach.

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }


    // Zwraca komponent StateContext.Provider, który otacza dzieci (children). Wszystkie wartości przekazane do value będą dostępne dla wszystkich komponentów potomnych.
    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}


// Tworzy własny hook, który może być używany do dostępu do wartości kontekstu w dowolnym komponencie.
export const useStateContext = () => useContext(StateContext);
