"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import axios from "axios"



const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  // const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      setVideo(undefined);
     const response = await axios.post("/api/video",values)

     setVideo(response.data[0]);
     

     form.reset();
     
    } catch (error: any) {
      console.error(error);
     
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
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A clown dancing"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
          <div className="p-8 rounded-lg w-full items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
       
        {!video && !isLoading && (
          <div>
            <Empty label="No Video generated yet" />
          </div>
        )}
       
       {video && (
       <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls >
          <source src={video}/>
       </video>>
       )}
      </div>
    </div>
  );
};

export default VideoPage;
