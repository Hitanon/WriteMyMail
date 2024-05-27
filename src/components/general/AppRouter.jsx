import { Route, Routes } from "react-router-dom";

import { routes } from "../../utils/Routes";

const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} exact></Route>
                ))
            }
        </Routes>
    )
};

export default AppRouter;