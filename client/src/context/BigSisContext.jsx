import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { LANG } from "../constants/languages";

const BigSisContext = createContext();

const BigSisProvider = ({ children }) => {
  const [language, setLanguage] = useState(LANG.EN); //defualt is Eglish
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
