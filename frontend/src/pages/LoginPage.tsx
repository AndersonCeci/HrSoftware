import { NavLink } from "react-router-dom"

const LoginPAge: React.FC = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <NavLink to={"/dashboard"}>DASHBOARD</NavLink>
        </div>
    )
}

export default LoginPAge