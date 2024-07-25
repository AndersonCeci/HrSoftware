import ChangePasswordForm from "./components/ChangePasswordForm"
import { PasswordProvider } from "./context"

const SettingsPage : React.FC = () =>{
  return (
    <div>
      <PasswordProvider children={<ChangePasswordForm/>}/>
    </div>
  )
}

export default SettingsPage