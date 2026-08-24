import {Fragment, useContext} from "react";
import {CalculatorContext, ICalculatorContext} from "../provider/CalculatorProvider.tsx";
import {Chip, Grid, Typography} from "@mui/material";
import Panel from "../components/Panel.tsx";
import Display from "../components/Display.tsx";

const CheckOut = () => {

    const {
        name,
        total,
        given,
        addGiven,
        centMode,
        requiredMarks,
        providedMarks,
        finish,
        setCentMode,
        abort
    } = useContext<ICalculatorContext>(CalculatorContext);

    return (
        <Fragment>
            <Grid container spacing={0} padding={1} justifyContent={"center"}>
                <Grid item container spacing={1} padding={1} md={6}>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>{name}</Typography>
                    </Grid>
                    {
                        centMode ?
                            <Fragment>
                                {[1, 2, 5, 10, 20, 50].map((key: number) => {
                                    return <Panel height={"30px"} key={key} handleClick={async () => addGiven(key * 0.01, false)} size={4}>
                                        <Typography variant={"body2"}>{key} CENT</Typography>
                                    </Panel>
                                })}
                            </Fragment>
                            :
                            <Fragment>
                                {[1, 2, 5, 10, 20, 50, 100, 200].map((key: number) => {
                                    return <Panel height={"30px"} key={key} handleClick={async () => addGiven(key, false)} size={4}>
                                        <Typography variant={"body2"}>{key} EUR</Typography>
                                    </Panel>
                                })}
                            </Fragment>
                    }
                </Grid>
                <Grid item container spacing={1} padding={1} md={6}>
                    <Panel height={"50px"} handleClick={async () => addGiven(3, false)} size={4}>
                        <Typography noWrap={true} variant={"body2"}>Pfand Becher</Typography>
                        <Typography variant={"body2"} color={"grey"}>3 EUR</Typography>
                    </Panel>
                    <Panel height={"50px"} handleClick={async () => addGiven(2, true)} size={4}>
                        <Typography noWrap={true} variant={"body2"}>Pfand Glas</Typography>
                        <Typography variant={"body2"} color={"grey"}>2 EUR</Typography>
                        <Chip size={"small"} label={"M"}></Chip>
                    </Panel>
                    <Panel height={"50px"} handleClick={async () => setCentMode(!centMode)} size={4}
                           color={centMode ? "#ffb849" : undefined}>
                        <Typography variant={"body2"}>Cents</Typography>
                    </Panel>
                    <Panel height={"50px"}
                           handleClick={async () => await abort()}
                           size={4}
                           color={"#e74646"}
                    >
                        <Typography variant={"body2"}>Abbruch</Typography>
                    </Panel>
                    <Panel height={"50px"}
                           handleClick={async () => await finish()}
                           color={(given - total) >= 0 ? "#78d372" : undefined}
                           disabled={(given - total) < 0}
                           size={4}
                    >
                        <Typography variant={"body2"}>Fertig</Typography>
                    </Panel>
                </Grid>
                <Grid container spacing={0} padding={1} justifyContent={"center"} sx={{position: "fixed", bottom: 0}}>
                    <Grid item container spacing={1} padding={3} md={6}>
                        <Display size={5} disabled={true}>
                            <Typography variant={"body1"} color={(given - total) < 0 ? "red" : "green"}>{(given - total) <= 0 ? "Bekommen" : "Geben"}</Typography>
                            <Typography variant={"body2"} color={(given - total) < 0 ? "red" : "green"}>{(given - total).toFixed(2)} EUR</Typography>
                        </Display>
                        <Display size={5} disabled={true}>
                            <Typography variant={"body1"} color={(requiredMarks - providedMarks) < 0 ? "red" : "green"}>{(requiredMarks - providedMarks) <= 0 ? "Bekommen" : "Geben"}</Typography>
                            <Typography variant={"body2"} color={(requiredMarks - providedMarks) < 0 ? "red" : "green"}>{(requiredMarks - providedMarks)} Märkchen</Typography>
                        </Display>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )

}

export default CheckOut;