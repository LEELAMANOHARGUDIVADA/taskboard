
export default function DashboardHeader(){
    const username = localStorage.getItem("username");
    return (
        <div className="w-full py-1">
            <div className="w-full h-full flex items-center justify-between">
                <h4 className="font-bold">Welcome 👋 , {username}</h4>
            </div>
        </div>
    )
}