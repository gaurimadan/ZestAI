
"use client";
import { Heading } from "@/components/Heading"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const ConversationPage =() =>{

    const form=useForm<z.infer<typeof formSchema>>({
       resolver:zodResolver(formSchema),
       
        defaultValues:{
            prompt:""
        }
    });

    const isloading=form.formState.isSubmitting;
    const onSubmit=async(values:z.infer<typeof formSchema>) =>{
        console.log(values);
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
                                            placeholder="What is Artificial Technology?"
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
        </div>
    )
}
export default ConversationPage