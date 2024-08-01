import useGlobalStore from "@/store/GlobalStore";
import NavBarButton from "./NavBarButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";
function NavBar() {
    const isAuth = useGlobalStore((state)=> state.isAuth)
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login")
    }
    const handleLogoutClick = () => {
        logout()
        useGlobalStore.getState().logout()
    }
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <div className="text-2xl font-bold tracking-tight mr-4">
            <span className="mr-2">🐉</span>Dragon Survey
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <NavBarButton href={"/"} pattern={"/"}>
              Home
            </NavBarButton>
            <NavBarButton href={"/team"} pattern={"/team"}>
              Team
            </NavBarButton>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
            {!isAuth ? <Button onClick={handleLoginClick}  variant="outline">Login / Sign up</Button> : null}
            {isAuth ? <Button  variant="outline"  onClick={handleLogoutClick} >Logout</Button> : null}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
