import MainNav from "./MainNav";
export default function BottomNav({...props}){
    return(
        <MainNav className="w-full h-auto fixed bottom-0 " ulClassName="flex-row justify-evenly "  {...props}/>    );
}