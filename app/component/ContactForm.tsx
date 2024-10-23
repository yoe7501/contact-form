'use client'
import React from "react";
import { SubmitHandler, useForm,  } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import axios from "axios";
import { useRouter } from "next/navigation";
enum QueryEnum {
  general = "general",
  support = 'support'
}
const schema = z.object({
  firstName: z.string({message: 'First Name is Required'}).min(4, {message: "Must be atleast 4 letters"}),
  lastName: z.string({message: 'Last Name is Required'}).min(4, {message: 'Must be atleast 4 letters'}),
  email: z.string().email({message: 'must be a valid email'}),
  query: z.enum([QueryEnum.general, QueryEnum.support], {message: 'Required'}),
  message: z.string().min(1, {message: 'message is required'}),
  consent: z.boolean().optional()
})
type Input = z.infer<typeof schema>;



const ContactForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}, watch } = useForm<Input>({
    resolver: zodResolver(schema)
  });
  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log(data.consent); // Handle form submission
    await axios.post('../api/users', data);
    router.push('../api/users');
  };

  const isActive = watch('consent', false);
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white justify-between p-10 rounded-lg min-h-[530px]">
      <h1 className="text-xl font-bold">Contact Us</h1>
      
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register('firstName')} className={`text ${errors.firstName? 'ring-red': 'ring-grey500'}`} type="text"  />
          {errors.firstName && <p className="text-red">{errors.firstName.message}</p>}

        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register('lastName')} className={`text ${errors.lastName ? 'ring-red': 'ring-grey500'}`} type="text"  />
          {errors.lastName && <p className="text-red">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email',{required: true, maxLength: 20})}  className={`text ${errors.email? 'ring-red': 'ring-grey500'}`} type="text"  />
        {errors.email && <p className='text-red'>{errors.email.message}</p>}
      </div>
      
      <div>
        <label>Query Type</label>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="radio mb-2">
            <input 
              className="mr-3" 
              type="radio"  
              value="general" 
              id="general" 
              {...register('query')} 
              
            />
            <label htmlFor="general">General Enquiry</label>
          </div>
          <div className="radio">
            <input 
              className="mr-3 basis-1/2" 
              type="radio" 
              value="support" 
              id="support" 
              {...register('query')} 
              
            />
            <label htmlFor="support">Support Request</label>
          </div>
        </div>
        {errors.query && <p className="text-red" >{errors.query.message}</p>}
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="message">Message</label>
        <textarea id="message" {...register('message')} className={`text ${errors.message? 'ring-red': 'ring-grey500'}`}  />
        {errors.message && <p className="text-red">{errors.message.message}</p>}
      </div>
      
      <div>
        <input type="checkbox" checked={isActive} id="consent" {...register('consent')} className={`mr-3 `}  />
        <label htmlFor="consent">I consent to being contacted by the team</label>
      </div>
      
      <button disabled={!isActive} className="bg-green600 hover:bg-grey-500 rounded-md h-10 text-white">Submit</button>
    </form>
  );
};

export default ContactForm;
