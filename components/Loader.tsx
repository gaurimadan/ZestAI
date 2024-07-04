import Image from "next/image"

export const Loader =()=>{
    return(
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
           <div className="w-10 h-10 relative animate spin">
            <Image
            alt="logo"
            fill
            src="/skill-removebg-preview.png"
            />

           </div>
           <p className="text-sm text-muted-foreground">
            Your answer is just seconds away
           </p>
        </div>
    )

}