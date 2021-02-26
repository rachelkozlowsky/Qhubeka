import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData{
            minutes: number;
            seconds: number;
            hasFinished: boolean;
            isActive: boolean;
            startCountdown: () => void;
            resetCountdown: () => void;

}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}:CountdownProviderProps){
    const { startNewChallenge} = useContext(ChallengeContext);
    const [time, setTime] = useState(25 * 60); /*conversão de 25 min para segundos*/ 
    const [isActive, setIsAcitve] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsAcitve(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsAcitve(false); 
        setTime(25*60);
        setHasFinished(false);
    }
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if (isActive && time == 0){
           setHasFinished(true);
           setIsAcitve(false);
           startNewChallenge();
        };
    }, [isActive, time])


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }} >
            {children}
        </CountdownContext.Provider>
    )

}