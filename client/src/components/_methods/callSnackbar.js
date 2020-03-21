import { useContext } from "react";
import { SnackbarContext } from "../../Contexts/SnackbarContext";

const [snackbar, setSnackbar] = useContext(SnackbarContext)

const callSnackbar = (msg, severity) => setSnackbar({ msg, severity, date: new Date() })

export default callSnackbar;