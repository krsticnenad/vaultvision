import { FC } from "react";
import { ThemedNavbar } from "../components/navbar";

export const DefaultLayout: FC<any> = ({ children }) => {
    return(
        <div className="max-w-[1280px] mx-auto pb-10">
            <ThemedNavbar />
            {children}
        </div>
    )
}