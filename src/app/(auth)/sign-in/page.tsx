"use client";
// import { auth } from "@/lib/firebase/client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import FormField from "@/components/FormField";
import { useForm } from "react-hook-form";
import { authFormSchema, authFormSchemaType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/lib/actions/auth.action";
import { ROUTES } from "@/constants/routes";

const SignIn = () => {
   


   const formSchema = authFormSchema("sign-in");
   const router = useRouter();
   
	const form = useForm<authFormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const handleSubmit = async (values: authFormSchemaType) => {
      try {
         const {email, password} = values;
         const results = await signIn({email, password});
         if(!results.success) {
            throw new Error(results.message);
         }
         toast.success("Signed In Successfully");
         router.push("/");
      }
      catch(error: any) {
         toast.error(error.message);
         console.error(error);
      }
	};

   return (
      <AuthForm
			form={form}
			onSubmit={(values) => {void handleSubmit(values)}}
			buttonLabel="Sign In"
			message={(
				<>
					<span>No account yet?</span>
					<Link href={ROUTES.SIGNUP} className="font-bold text-user-primary ml-1">
				 		Sign Up
			  		</Link>
				</>
			)}
         render={(form) => (
            <>
               <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Your Email"
               />

               <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
               />
            </>
         )}
      />
   );
};
export default SignIn;
