import ChangeLanguage from "./components/ChangeLanguage"
import ChangePasswordForm from "./components/ChangePasswordForm"
import { PasswordProvider } from "./context"

const SettingsPage: React.FC = () =>
{
  
  return (
    <div>
      <ChangeLanguage/>
      <PasswordProvider children={<ChangePasswordForm/>}/>
    </div>
  )
}

export default SettingsPage