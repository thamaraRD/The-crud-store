import { createContext, useState } from "react";

const KEY = "The-store-crud";

export const UserContext = createContext();

export const UserProvider = (props) => {
const storedUser = JSON.parse(sessionStorage.getItem(KEY));
const [user, setUser] = useState(storedUser);

return (
    <UserContext.Provider value={{ user, setUser }}>
    {props.children}
    </UserContext.Provider>
);
};