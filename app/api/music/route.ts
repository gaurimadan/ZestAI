
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";

const replicate=new Replicate({
    auth:process.env.NEXT_PUBLIC_REPLICATE_AI_TOKEN

});
export async function POST(
    req:Request
){
    try{
            const {userId} = auth();
            const body= await req.json();
            const {prompt} = body;

            if(!userId){
                return new NextResponse("Unauthorized",{status:401});
            }
           
            if(!prompt){
                return new NextResponse("Prompt is required",{status:400});
            }
       

            
            const response= await replicate.run(
                "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
                {
                  input: {
                    alpha: 0.5,
                    prompt_a: prompt,
                    prompt_b: "90's rap",
                    denoising: 0.75,
                    seed_image_id: "vibes",
                    num_inference_steps: 50
                  }
                }
              );
              console.log(response);
            return NextResponse.json(response)

    } catch(error) {
        console.log("[MUSIC_ERROR]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}
                                         
