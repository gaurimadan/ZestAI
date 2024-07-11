
import prismadb from "@/lib/prismadb";
import { useAuth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:NextRequest, res:NextResponse) {
  if (req.method === 'POST') {
    const {userId}=useAuth();

    try {
     
     let userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { 
           userId}
      });

      if (!userApiLimit) {
        
        userApiLimit = await prismadb.userApiLimit.create({
          data: { userId, count: 1 },
        });
      } else {
       
        if (userApiLimit.count >= 5) {
          return res.status(403).json({ error: 'API call limit exceeded.' });
        }

        userApiLimit = await prismadb.userApiLimit.update({
          where: { userId },
          data: { count: { increment: 1 } },
        });
      }

      
      console.log('Saving conversation:', messages);

      
      res.status(200).json({ message: 'Conversation saved successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   }
//  else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
}
