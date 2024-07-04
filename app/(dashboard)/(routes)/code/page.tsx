"use client";

import { useForm } from "react-hook-form"
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from 'react-markdown';



type ChatCompletionRequestMessage={content:string,role:string}
const Code =() =>{
    const router = useRouter();
    const [messages, setMessages]=useState<ChatCompletionRequestMessage[]>([]);

    const form=useForm<z.infer<typeof formSchema>>({
       resolver:zodResolver(formSchema),
       
        defaultValues:{
            prompt:""
        }
    });

    const isloading=form.formState.isSubmitting;
    const onSubmit=async(values:z.infer<typeof formSchema>) =>{
       
        try{
            const userMessage:ChatCompletionRequestMessage={
                role :"user",
                content:values.prompt,
            }as any;
            const newMessage =[...messages,userMessage];
            const response = await axios.post("api/code",{messages:newMessage,});
            setMessages((current) => [...current,userMessage,response.data]);

        }
        catch(error:any){
            console.log(error);
        }
        finally{
                router.refresh();
        }
    };
    return(
        <div className="px-4 lg:px-8">
        <div>
            
            
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2">
                        <FormField
                        name="prompt"
                        render={({field})=>(
                            <FormItem className="col-span-12 ld:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                            className="border-0 outline-0
                                            focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isloading}
                                            placeholder="Simple Toggle button in react"
                                            {...field}/>
                                        </FormControl>
                            </FormItem>
                        )}/>
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isloading}>
                            Generate
                        </Button>
                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isloading && (
                <div className="p-8 rounded-lg w-full items-center justify-center bg-muted">
                    <Loader/>
                    </div>

            )}
            {messages.length===0 && !isloading && (
                <div>
                    <Empty label="No conversation started"/>
                    </div>
            )}
           <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message)=>(
                <div key={message.content}
                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role==="user"?"bg-white border border-black/10":"bg-muted")}>
                    {message.role==="user"?<UserAvatar/>:<BotAvatar/>}
                <ReactMarkdown 
                components={{pre:({node,...props})=>(
                    <div className="overflow-auto w-full my-2 bd-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                    </div>
                ),
                code:({node,...props}) =>(
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                )}}
                className="text-sm overflow-hidden leading-7"
                >
                {message.content || ""}
                </ReactMarkdown>

                    </div>
            ))}
            </div>
        </div>
        </div>
    )
}
export default Code