import { FC } from "react";
import {NextUIProvider} from "@nextui-org/react";
import { ReactNodeChildrenProp } from "../interfaces/react-node";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider: FC<ReactNodeChildrenProp> = ({ children }) => {
    return(
        <NextUIProvider>
            <NextThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </NextThemeProvider>
        </NextUIProvider>
    )
}

export default ThemeProvider;