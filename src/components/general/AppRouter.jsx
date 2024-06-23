import { Route, Routes } from "react-router-dom";
import { routes } from "../../utils/Routes";
import PrivateRoute from './PrivateRoute';
import NotFound from '../../pages/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element: Element, private: isPrivate }) => (
                isPrivate ? (
                    <Route key={path} path={path} element={<PrivateRoute element={Element} />} exact />
                ) : (
                    <Route key={path} path={path} element={<Element />} exact />
                )
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
