import { UserButton } from "@clerk/nextjs";


export default function DashboardPage() {
    return (
      <div>
     <p className="text-6xl text-red-500">hello gauri</p>
     <UserButton afterSignOutUrl="/"/>
     </div>


    );
  }
  