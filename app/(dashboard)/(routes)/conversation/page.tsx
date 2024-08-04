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
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import Modal from "@/components/Modal";

type ChatCompletionRequestMessage = { content: string; role: string };

type result = {
  text: string;
  finish_reason: "stop";
  model: "gpt-3.5-turbo-030";
  server: "backup-K";
};

const MAX_FREE_USES = 1;

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (count >= MAX_FREE_USES) {
      setShowModal(true);
      setIsDisabled(true);
      return;
    }

    try {
      setError(null); // Reset error state
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
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

      setMessages((current) => [...current, userMessage, botMessage]);
      setCount((currentCount) => currentCount + 1);
      form.reset();
      // await fetch("/api/increaseApiLimit", { method: "POST" });
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
                      disabled={isLoading || isDisabled}
                      placeholder="What is Artificial Intelligence?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading || isDisabled}
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
            <Empty label="No conversation started" />
          </div>
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Upgrade to Continue</h2>
            <p>
              You have reached the maximum number of free uses. Please upgrade
              to a paid plan to continue using this service.
            </p>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            {/* Add a link to the upgrade page */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConversationPage;