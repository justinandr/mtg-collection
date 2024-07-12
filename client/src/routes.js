import App from "./components/App";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";
import Cards from "./pages/Cards";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";

const id = ''

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
            },
            {
                path: '/tournaments/:id',
                element: <TournamentDetail />
            }
        ]
    }
]

export default routes