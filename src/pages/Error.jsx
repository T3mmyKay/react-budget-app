import { Link, useRouteError,useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid/index.js";

export const Error = () => {
   const error = useRouteError()
    const navigate = useNavigate()
    return (
        <div className="error">
            <h1>Uh oh! We've got a problem</h1>
            <p>{error.message || error.statusText}</p>

            <div className="flex-md">
                <button
                    onClick={()=> navigate(-1)}
                    className="btn btn--dark">
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link className="btn btn--dark" to="/">
                    <HomeIcon width={20} />
                    <span>Go home</span>
                </Link>
            </div>
        </div>
    );
}
