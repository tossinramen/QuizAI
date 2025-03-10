import { auth, signOut } from "@/auth";
import { Button } from './button';


const Header = async () => {
    const session = await auth();
    console.log(session);
    return (
        <header>

        </header>
    )
}
export default Header;