const LandingLayout = ({
    children
}:{
    children:React.ReactNode;
}) =>{
    return (
        <main className="h-full bg-[#111827] overflow-flow">
            <div className="mx-auto max-w-screen-xl h-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;