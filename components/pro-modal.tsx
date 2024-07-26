"use client"

import { useProModel } from "@/hooks/use-pro-model"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Code, ImageIcon, MessageSquare, Music, Video, Zap } from "lucide-react";
import { Button } from "./ui/button";

const tools =[
    {label: "Conversation",
      icon:MessageSquare,
      color:"text-violet-500",
      href:"/conversation",
      bgcolor:"bg-violet/500/10"
  
    },
    {label: "Music Generation",
      icon:Music,
      color:"text-green-500",
      href:"/music",
      bgcolor:"bg-green/500/10"
  
    },
    
    {label: "Code Generation",
      icon:Code,
      color:"text-pink-500",
      href:"/code",
      bgcolor:"bg-pink/500/10"
  
    },
    {label: "Image Generation",
      icon:ImageIcon,
      color:"text-orange-500",
      href:"/image",
      bgcolor:"bg-orange/500/10"
  
    },
    
    {label: "Video Generation",
      icon:Video,
      color:"text-emerald-500",
      href:"/video",
      bgcolor:"bg-emerald/500/10"
  
    }
  ]





export const ProModel = ()=>{
    const ProModel = useProModel();
    return (
        <Dialog open={ProModel.isopen} onOpenChange={ProModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <div className="flex items-center font-bold py-1">
                            Upgrade to ZestAI
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                pro
                            </Badge>
                            </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool)=>(
                            <Card key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md",tool.bgcolor)}>
                                      <tool.icon className={cn("w-6 h-6",tool.color)}/>

                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                            <Check/>
                            </Card>
                        ))}

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button size="lg" variant="premium" className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}