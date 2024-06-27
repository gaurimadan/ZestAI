"use client"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, Video } from "lucide-react";



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
    href:"/conversation",
    bgcolor:"bg-green/500/10"

  },
  
  {label: "Code Generation",
    icon:Code,
    color:"text-pink-500",
    href:"/conversation",
    bgcolor:"bg-pink/500/10"

  },
  {label: "Image Generation",
    icon:ImageIcon,
    color:"text-orange-500",
    href:"/conversation",
    bgcolor:"bg-orange/500/10"

  },
  {label: "Conversation",
    icon:MessageSquare,
    color:"text-violet-500",
    href:"/conversation",
    bgcolor:"bg-violet/500/10"

  },
  {label: "Video Generation",
    icon:Video,
    color:"text-emerald-500",
    href:"/conversation",
    bgcolor:"bg-emerald/500/10"

  }
]
const DashboardPage = () => {
    return (
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md-text:5xl font-bold text-center">
            Explore the power of AI
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            Chat with us: ZestAI
          </p>

        </div>
        <div className="px-4 md:px-20 lg:px-32 spacy-y-4">
          {tools.map((tool)=>(
            <Card
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgcolor)}>
                  <tool.icon className={cn("w-8 h-8",tool.color)}/>
                  </div>
                  <div className="font-semibold">
                    {tool.label}
                  </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
               
            </Card>
          
          ))}

        </div>
     </div>


    );
  }
  export default DashboardPage