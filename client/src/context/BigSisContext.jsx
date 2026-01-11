import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LANG } from "../constants/languages";

const BigSisContext = createContext();

const BigSisProvider = ({ children }) => {
  const [language, setLanguage] = useState(LANG.HE); // default to Hebrew for landing page copy
  const [user, setUser] = useState(null);

  const value = {
    language,
    setLanguage,
    user,
    setUser,
  };

    return (
        <BigSisContext.Provider value={value}>
            {children}
        </BigSisContext.Provider>
    );
};

BigSisProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { BigSisContext, BigSisProvider };
