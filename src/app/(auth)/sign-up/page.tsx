"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { authFormSchema, authFormSchemaType } from "@/types/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import { signUp } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const SignUp = () => {

   const formSchema = authFormSchema("sign-up");
	const router = useRouter();
   const form = useForm<authFormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const handleSubmit = async (values: authFormSchemaType) => {
		try {
			
			const {name,email,password} = values;
			const results = await signUp({name: name!,email,password});
			if(!results.success) {
			  throw new Error(results.error);
			}
	
			toast.success("Account Created Successfully");
			router.push(ROUTES.SIGNIN);
		}
		catch (error: any) {
			toast.error(error.message);
		}
	};

   return (
      <AuthForm
         onSubmit={(values) => {void handleSubmit(values)}}
         form={form}
			buttonLabel="Sign Up"
			message={(
				<>
					<span>Already have an account?</span>
					<Link href={ROUTES.SIGNIN} className="font-bold text-user-primary ml-1">
            		Sign-In
          		</Link>
				</>
			)}
         render={(form) => (
            <>
               <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your Name"
               />

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
export default SignUp;
