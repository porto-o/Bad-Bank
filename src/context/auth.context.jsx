import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, logoutRequest } from "../api/auth";
import { myMoneyRequest, historyRequest } from "../api/money";

export const AuthContext = createContext();

// a hook to import automatically the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // this user state will be shared with all components
  const [user, setUser] = useState(null);

  // ths function will receive the data to signup
  const signup = async (data) => {
    const res = await registerRequest(data);
    // save it in the user state
    setUser(res.data);

    return res;
  };

  const signin = async (data) => {
    const res = await loginRequest(data);
    // save it in the user state
    setUser(res.data);

    return res;
  };

  const myMoney = async (type, amount, user) => {
    const res = await myMoneyRequest(type, amount, user);
    // save it in the user state
    setUser(res.data);

    return res;
  };

  const getHistory = async (user) => {
    const res = await historyRequest(user);
    // actualiza el estado de user en su propiedad de transactions
    setUser({...user, transactions: res.data});
    return res
  };

  const logOut = async () => {
    const res = await logoutRequest();

    // remove the user from the state
    setUser(null);
    // change to / with react router dom
    return res;
  }

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        signin,
        myMoney,
        getHistory,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};