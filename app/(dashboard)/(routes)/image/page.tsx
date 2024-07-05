"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download } from "lucide-react";


type ChatCompletionRequestMessage = { content: string; role: string };
type result = {
  text: string;
  finish_reason: "stop";
  model: "gpt-3.5-turbo-030";
  server: "backup-K";
};

const ImagePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const[images,setImages] =useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512x512"
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      setError(null); // Reset error state
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...images, userMessage];
      
      const url = 'https://chatgpt-42.p.rapidapi.com/texttoimage';

      const headers: Record<string, string> = {
        
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        "Content-Type": "application/json",
      };

      
      if (apiKey) {
        headers["x-rapidapi-key"] = apiKey;
      } else {
        throw new Error("API key is missing");
      }

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(newMessages),
      };

      const response = await fetch(url, options);
      const urls = response.data.map((image:{url:string}) =>image.url);
      setImages(urls);
      const result = (await response.json()) as result;
      const botMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: result.text,
      };
      // setImages((current) => [...current,userMessage,botMessage]);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch the response. Please try again.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="px-4 lg:px-8">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="What is Artificial Intelligence?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({field})=>(
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map((option)=>(
                      <SelectItem
                      key={option.value}
                      value={option.value}
                      >
                        {option.label}
                      </SelectItem>
  ))}
                  </SelectContent>
                </Select>

              </FormItem>
            )}/>
             <FormField
            control={form.control}
            name="resolution"
            render={({field})=>(
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map((option)=>(
                      <SelectItem
                      key={option.value}
                      value={option.value}
                      >
                        {option.label}
                      </SelectItem>
  ))}
                  </SelectContent>
                </Select>

              </FormItem>
            )}/>
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {images.length === 0 && !isLoading && (
          <div>
            <Empty label="No images generated" />
          </div>
        )}
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-4 mt-8">
        {images.map((src)=>(
          <Card
          key={src}
          className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
              alt="Image"
              fill
              src={src}
              />
            </div>
            <CardFooter className="p-2">
              <Button 
              onClick={()=>window.open(src)}
              variant="secondary" className="w-full">
                <Download className="h-4 w-4 mr-2"/>
                Download
              </Button>

            </CardFooter>
          </Card>
        ))}
       </div>
      </div>
    </div>
  );
};

export default ImagePage;
