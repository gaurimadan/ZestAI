import Image from "next/image";


interface EmptyProps{
    label:string;
}
export const  Empty = ({
    label
    }: EmptyProps) => {

    return (
        <div className="h-full p-20 flex-col items-center justify-center ml-20">
                <div className="relative h-60 w-60">
                    <Image alt="Empty"
                    fill
                    src="/Loading-icon-in-red-color-on-transparent-background-PNG-removebg-preview.png"/>
                </div>
                <p className="text-muted-foreground text-sm text-center ">
                    {label}
                </p>
                
                
                
        </div>
    )

}