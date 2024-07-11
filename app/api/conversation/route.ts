import OpenAIApi from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
const openai = new OpenAIApi({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

export async function POST(
    req:Request
){
    try{
            const {userId} = auth();
            const body= await req.json();
            const {messages} = body;

            if(!userId){
                return new NextResponse("Unauthorized",{status:401});
            }
           
            if(!messages){
                return new NextResponse("Messages are required",{status:400});
            }
            const freeTrial=await checkApiLimit();
            if(!freeTrial){
                return new NextResponse("Free Trial Expired",{status:403});
              
            }
            
            // const response = await openai.chat.completions.create({
            //     model:"gpt-3.5-turbo",
            //     messages:[{"role":"user","content":"hello"}]
            // });
            // return NextResponse.json(response.choices[0].message)

    } catch(error) {
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}
                                         
