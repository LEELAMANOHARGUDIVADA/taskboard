import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardHeader() {
    const username = localStorage.getItem("username");
    return (
        <div className="w-full py-1">
            <div className="w-[75%] h-full flex items-center justify-between px-5">
                <h4 className="font-bold">Welcome 👋 , {username}</h4>
                <div className="flex items-center justify-center gap-5">
                    <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </div>
            </div>
        </div>
    )
}