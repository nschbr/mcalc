import {Context, createContext, ReactNode, useCallback, useState} from "react";
import {Entity} from "../model/Model.ts";
import bierburg from '../config/bierburg.json';
import megabar from '../config/megabar.json';
import {NavigateFunction, useNavigate} from "react-router-dom";

export interface ICalculatorContext {
    type: "mb" | "bb";
    name: "Megabar" | "Bierburg";
    total: number;
    given: number;
    centMode: boolean;
    setCentMode: (value: boolean) => void;
    addValue: (entity: Entity) => number;
    addGiven: (value: number, mark: boolean) => number;
    clear: () => Promise<void>;
    abort: () => Promise<void>;
    finish: () => Promise<void>;
    productsCount: number;
    providedMarks: number;
    requiredMarks: number;
    options: { products: Array<Entity> };
}

interface IProps {
    type: "mb" | "bb";
    name: "Megabar" | "Bierburg";
    children: ReactNode;
}

export const CalculatorContext: Context<ICalculatorContext> = createContext({} as ICalculatorContext)

export const CalculatorProvider = ({type, name, children}: IProps) => {

    const [centMode, setCentMode] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0.0);
    const [given, setGiven] = useState<number>(0.0);
    const [requiredMarks, setRequiredMarks] = useState<number>(0);
    const [providedMarks, setProvidedMarks] = useState<number>(0);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [options] = useState<{ products: Array<Entity> }>(type === "bb" ? bierburg : megabar);
    const navigate: NavigateFunction = useNavigate();

    const addValue = useCallback((entity: Entity) => {
        if (entity.mark) setRequiredMarks(requiredMarks + 1);
        setProductsCount(productsCount + 1);
        setTotal(total + entity.value.default + entity.value.return);
        return total;
    }, [productsCount, requiredMarks, total])

    const addGiven = useCallback((value: number, mark: boolean) => {
        if (mark) setProvidedMarks(providedMarks + 1);
        setGiven(given + value);
        return given;
    }, [given, providedMarks])

    const save = useCallback(async () => {
        const value = localStorage.getItem("mcalc-sales") || "[]";
        const sales: Array<object> = JSON.parse(value);
        sales.push({time: new Date(), total: total, given: given});
        localStorage.setItem("mcalc-sales", JSON.stringify(sales));
    }, [given, total])

    const clear = useCallback(async () => {
        setTotal(0.0);
        setGiven(0.0);
        setProvidedMarks(0);
        setRequiredMarks(0);
        setCentMode(false);
        setProductsCount(0);
    }, [])

    const finish = useCallback(async () => {
        await save();
        await clear();
        navigate(`/${type}`);
    }, [clear, navigate, save, type])

    const abort = useCallback(async () => {
        await clear();
        navigate(`/${type}`);
    }, [clear, navigate, type])

    return (<CalculatorContext.Provider
        value={{
            type,
            name,
            total,
            given,
            finish,
            centMode,
            setCentMode,
            addValue,
            addGiven,
            clear,
            abort,
            options,
            providedMarks,
            requiredMarks,
            productsCount
        }}>
        {children}
    </CalculatorContext.Provider>);

}