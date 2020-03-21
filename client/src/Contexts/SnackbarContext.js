import { createContext } from 'react';

export const SnackbarContext = createContext({
    msg: '',
    severity: '',
    date: new Date(),
}) 