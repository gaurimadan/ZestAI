import { Button } from "@/components/ui/button"
import Link from "next/link";


const LandingPage=() => {
    return(
        <div className="text-3xl text-green-500">
            LANDING PAGE 
       
        <div>
        <Link href="/sign-in">
            <Button>
                Login
            </Button>
        </Link>
        <Link href="/sign-in">
            <Button>
                Register
            </Button>
        </Link>
        </div>
        </div>
    );
    
    
}
export default LandingPage;