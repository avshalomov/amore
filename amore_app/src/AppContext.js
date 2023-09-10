import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useRef,
} from "react";
import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // States (if added more states, add them to the array below also)
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [expires, setExpires] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Ref to check expiration at intervals
    const expiresRef = useRef(null);

    // Initialize all the context states
    useEffect(() => {
        // Check if dark mode is enabled and set it
        const darkMode = localStorage.getItem("dark-mode") === "true";
        document.body.classList.toggle("dark-mode", darkMode);
        setIsDarkMode(darkMode);

        // Handle token
        const encryptedToken = localStorage.getItem("token");
        if (encryptedToken) {

            // Decrypt and decode token
            const decryptedToken = CryptoJS.AES.decrypt(
                encryptedToken,
                process.env.REACT_APP_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);
            const decoded = jwt_decode(decryptedToken);

            // Set context states
            setToken(decryptedToken);
            setUserId(decoded.UserId);
            expiresRef.current = new Date(decoded.exp * 1000); // Ref for interval
            setExpires(expiresRef.current);
            setRole(
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ]
            );
        }

        // Check if token is expired
        const expirationChecker = setInterval(() => {
            const now = new Date();
            if (expiresRef.current && now >= expiresRef.current) {
                localStorage.removeItem("token");
                setToken(null);
                setUserId(null);
                setRole(null);
                setExpires(null);
                console.log(`Token expired at ${expiresRef.current}`);
            } else console.log(`Token expires at ${expiresRef.current}`);
        }, 1000);

        return () => clearInterval(expirationChecker);
    }, []);

    return (
        <AppContext.Provider
            value={{
                token,
                setToken,
                userId,
                setUserId,
                role,
                setRole,
                expires,
                setExpires,
                isDarkMode,
                setIsDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
};
