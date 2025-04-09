"use client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";


import React from "react";

const SignOut = () => {
   const router = useRouter();

   const handleSignOut = async () => {
      await signOut();
      router.push(ROUTES.SIGNIN);
   };

   return <Button onClick={() => handleSignOut()} variant={'outline'} className='text-primary-200 cursor-pointer'>Sign out</Button>
};

export default SignOut;
