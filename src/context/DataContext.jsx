import React, { createContext } from "react";

export const DataContext = createContext();

const dataFixed = [
  {
    id: 1,
    name: "Ismael",
    email: "ismael.porto2003@gmail.com",
    balance: 1000,
    operations: [
      {
        id: 1,
        type: "deposit",
        amount: 1000,
      },
      {
        id: 2,
        type: "withdraw",
        amount: 500,
      },
    ],
    photo: "",
  },
];

export const DataProvider = ({ children }) => {
  const [shareData, setShareData] = React.useState(dataFixed);
  const [activeUser, setActiveUser] = React.useState(dataFixed[0]);

  const switchUser = (userId) => {
    const user = shareData.find((user) => user.id === userId);
    if (user) {
      setActiveUser(user);
    }
  };

  return (
    <DataContext.Provider
      value={{ shareData, setShareData, activeUser, switchUser }}
    >
      {children}
    </DataContext.Provider>
  );
};
