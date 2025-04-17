import { ROUTES } from '@/constants/routes';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

const Feedback = async ({params} : RouteParams) => {
  const {id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if(!interview) 
      redirect(ROUTES.HOME);

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log(feedback);

  return (
    <div>Feedback</div>
  )
}

export default Feedback