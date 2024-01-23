// ExtraValueContext.js
import React, {useState} from 'react';

export const itemProduct = React.createContext();


export const FunctionUpdateItem = ({ children }) => {
    const [item, setItem] = useState('');
  
    // Hàm để cập nhật giá trị
    const updateItem = (newValue) => {
        setItem(newValue);
    };
  
    return (
      <itemProduct.Provider value={{ item, updateItem }}>
        {children}
      </itemProduct.Provider>
    );
  };

  

