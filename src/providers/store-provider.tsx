import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ReactNodeChildrenProp } from "../interfaces/react-node";

const StoreProvider: FC<ReactNodeChildrenProp> = ({ children }) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider;