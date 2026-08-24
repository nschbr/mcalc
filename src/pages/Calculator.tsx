import {Fragment, useContext} from "react";
import {Chip, Grid, Typography} from "@mui/material";
import Panel from "../components/Panel.tsx";
import {CalculatorContext, ICalculatorContext} from "../provider/CalculatorProvider.tsx";
import {Entity} from "../model/Model.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Display from "../components/Display.tsx";
import {ProductPad} from "../components/ProductPad.tsx";

const Calculator = () => {

    const {
        name,
        total,
        addValue,
        clear,
        productsCount,
        options
    } = useContext<ICalculatorContext>(CalculatorContext);
    const navigate: NavigateFunction = useNavigate()

    const yearsAgo = (years: number) => {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, "0")
        const mm = String(today.getMonth() + 1).padStart(2, "0")
        const yyyy = today.getFullYear() - years;
        return `${dd}.${mm}.${yyyy}`;
    }

    return (
        <Fragment>
            <Grid container spacing={0} padding={1} justifyContent={"center"}>
                <Grid item container spacing={1} padding={1} md={6}>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>{name}</Typography>
                    </Grid>
                    <ProductPad options={options} callbackfn={(entity: Entity) =>
                        <Panel
                            height={"50px"} key={entity.key}
                            handleClick={async () => addValue(entity)}
                            size={4}>
                            <Typography
                                variant={"body2"}
                                padding={0}
                                noWrap={true}
                                justifyContent={"center"}
                                margin={0}
                            >
                                {entity.name}
                            </Typography>
                            <Typography
                                variant={"body2"}
                                padding={0}
                                justifyContent={"center"}
                                margin={0}
                                color={"grey"}
                            >
                                {entity.value.default.toFixed(2)} EUR
                            </Typography>
                            { entity.mark && <Chip size={"small"} label={"M"}/>}
                        </Panel>}/>
                    <Panel height={"50px"} handleClick={async () => clear()} size={4}
                           color={total > 0 ? "#e74646" : undefined} disabled={total <= 0}>
                        <Typography variant={"body2"}>Löschen</Typography>
                    </Panel>
                    <Panel height={"50px"} handleClick={async () => navigate("checkout")} size={4}
                           color={total > 0 ? "#78d372" : undefined} disabled={total <= 0}>
                        <Typography variant={"body2"}>Kassieren</Typography>
                    </Panel>
                    <div style={{marginBottom: "250px"}}></div>
                </Grid>
                <Grid container spacing={0} padding={1} justifyContent={"center"} sx={{position: "fixed", bottom: 0}}>
                    <Grid item container spacing={1} padding={3} md={6}>
                        <Display size={5} disabled={true}>
                            <Typography variant={"body1"}>Total</Typography>
                            <Typography variant={"body2"}>{total.toFixed(2)} EUR</Typography>
                            <Typography variant={"body2"}>{productsCount} Artikel</Typography>
                        </Display>
                        <Display size={7} disabled={true}>
                            <Typography variant={"body1"}>Stichtage</Typography>
                            <Typography variant={"body2"}>16 Jahre: { yearsAgo(16) } </Typography>
                            <Typography variant={"body2"}>18 Jahre: { yearsAgo(18) } </Typography>
                        </Display>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )

}

export default Calculator;