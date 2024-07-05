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

type ChatCompletionRequestMessage = { content: string; role: string };

type result = {
  text: string;
  finish_reason: "stop";
  model: "gpt-3.5-turbo-030";
  server: "backup-K";
};

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null); // Reset error state
      setMusic(undefined);
      const url = "https://chatgpt-api8.p.rapidapi.com/";

      const headers: Record<string, string> = {
        "x-rapidapi-host": "chatgpt-api8.p.rapidapi.com",
        "Content-Type": "application/json",
      };

      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
      const result = (await response.json()) as result;
      const botMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: result.text,
      };
     
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
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Shape of you in Justin Bieber's voice"
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
        {error && <div className="text-red-500">{error}</div>}
        {messages.length === 0 && !isLoading && (
          <div>
            <Empty label="No music generated yet" />
          </div>
        )}
       
       <div>
        Music
       </div>
      </div>
    </div>
  );
};

export default MusicPage;