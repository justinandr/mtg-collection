import App from "./components/App";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";
import Cards from "./pages/Cards";
import Tournaments from "./pages/Tournaments";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/players',
                element: <Players />
            },
            {
                path: '/players/:id',
                element: <PlayerDetail />
            },
            {
                path: '/cards',
                element: <Cards />
            },
            {
                path: '/tournaments',
                element: <Tournaments />
            }
        ]
    }
]

export default routes