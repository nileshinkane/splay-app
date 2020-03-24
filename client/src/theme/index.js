import { createMuiTheme } from '@material-ui/core/styles';
import customPalette from './colors';

// const defaultTheme = createMuiTheme()
const theme = createMuiTheme({
    palette: customPalette,
    overrides: {
        //Button
        MuiButton: {
            contained: {
                '&:hover': {
                    boxShadow: ' 0px 4px 15px 1px rgba(66,109,209,0.6)'
                },
                '&:active': {
                    boxShadow: ' 0px 4px 15px 1px rgba(66,109,209,0.6)'
                },
                background: 'linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)',
                color: 'white',
                boxShadow: ' 0px 1px 5px 2px rgba(66,109,209,0.6)'
            },
            text: {
                background: 'transparent',
                color: 'lightgray'
            },
            sizeSmall: {
                fontSize: '12px',
                padding: '2px 4px'
            }
        },

        //FormControl
        MuiFormControl: {
            root: {
                // borderColor: 'red',
                '& MuiFormLabel-root': {
                    color: 'lightgray'
                },
                '& MuiOutlinedInput-input': {
                    color: 'lightgray'
                },
                '& label': {
                    color: 'lightgray'
                },
                '& label.Mui-focused': {
                    color: customPalette.primary.main,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: customPalette.primary.main,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '',
                    },
                    '&:hover fieldset': {
                        borderColor: customPalette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: customPalette.primary.main,
                    },
                },
            },
        },
        //Stepper
        MuiStepper: {
            root: {
                padding: 0,
                boxShadow: 'none',
                backgroundColor: customPalette.elevation.elevation0,
            },
        },
        //StepLabel
        MuiStepLabel: {
            root: {

            }
        },
        //Paper
        MuiPaper: {
            root: {
                // backgroundColor: '#3D4153',
                color: 'white'
            },
            outlined: {
                boxShadow: 'none',
                backgroundColor: customPalette.elevation.elevation2,
                border: 'solid 1px silver',
                color: 'white'
            },
            elevation1: {
                backgroundColor: customPalette.elevation.elevation1
            },
            elevation2: {
                backgroundColor: customPalette.elevation.elevation2
            },
        },
    }
})

export default theme;