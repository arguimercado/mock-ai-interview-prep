import { FieldValues, UseFormReturn } from "react-hook-form";
import Image from "next/image";

import { Form } from "@/components/ui/form";

import { Button } from "./ui/button";
import React from "react";

interface IProps<T extends FieldValues> {
   form: UseFormReturn<T>;
   render: (form: UseFormReturn<T>) => React.ReactNode;
   onSubmit: (values: T) => void | undefined;
   buttonLabel?: string;
   message?: React.ReactNode;
}
const AuthForm = <T extends FieldValues>({
   render,
   onSubmit,
   form,
   buttonLabel,
   message,
}: IProps<T>) => {
   return (
      <div className={"card-border lg:min-w-[566px]"}>
         <div className={"flex flex-col gap-6 card py-14 px-10"}>
            <div className="flex flex-row gap-2 justify-center">
               <Image src="/logo.svg" alt="logo" height={32} width={32} />
               <h2 className="text-primary-100">Prep Crew</h2>
            </div>
            <h3>Practice job interview with AI</h3>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6 mt-4 form"
               >
                  {render(form)}
                  <Button type="submit" className="btn">
                     {buttonLabel}
                  </Button>
               </form>
            </Form>
            <p className="text-center">{message ?? message}</p>
         </div>
      </div>
   );
};
export default AuthForm;
