//rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//helper functions
import { fetchData } from "../helpers";

//assets
import wave from "../assets/waves.svg";
import { Nav } from "../components/Nav.jsx";

export function mainLoader() {
    const userName = fetchData("userName");

    return { userName }
}



export const Main = () => {
    const { userName } = useLoaderData()
    return (
        <div className="layout">
            <Nav userName={userName} />
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
}
