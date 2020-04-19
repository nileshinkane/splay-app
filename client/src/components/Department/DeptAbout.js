import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles(theme => ({}));


function DeptAbout() {
    // const classes = useStyles();
    return (
        <React.Fragment>
            <h1 style={{ fontFamily: "Playfair display", color: "white" }}>About</h1>
            <p
                style={{
                    margin: "25px 15px 0px 0px",
                    textAlign: "justify",
                    fontSize: "17px",
                    color: "white"
                }}
            >
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
                laying out print, graphic or web designs. The passage is attributed to
                an unknown typesetter in the 15th century who is thought to have
                scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
                type specimen book.Lorem ipsum, or lipsum as it is sometimes known, is
                dummy text used in laying out print, graphic or web designs. The passage
                is attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum et
                Malorum for use in a type specimen book.
      </p>
        </React.Fragment>
    );
}

export default DeptAbout;
