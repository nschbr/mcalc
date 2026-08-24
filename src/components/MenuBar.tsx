import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import header from "../assets/header.png"

const MenuBar = () => {

    return (
        <AppBar
            position={"static"}
            sx={{
                paddingTop: "env(safe-area-inset-top)",
            }}
        >
            <Toolbar>
                <Link to={"/"}>
                    <div style={{display: "flex"}}>
                        <img style={{maxHeight: "30px"}} src={header} alt={"Header"}/>
                        <Typography
                            variant="h6"
                            color={"white"}
                            sx={{marginLeft: "7px", lineHeight: "30px"}}
                        >
                            MCalc
                        </Typography>
                    </div>
                </Link>
                <Box flex={1} flexGrow={1}></Box>
                <Stack>
                    <Link to={"https://kjg-ettlingen.de/impressum/"}>
                        <Typography variant={"body2"} color={"white"}>Impressum</Typography>
                    </Link>
                    <Link to={"https://kjg-ettlingen.de/datenschutz/"}>
                        <Typography variant={"body2"} color={"white"}>Datenschutz</Typography>
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    )

}

export default MenuBar;