import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({
   id,
   userId,
   role,
   type,
   techstacks,
   createdAt,
}: InterviewCardProps) => {

   const feedback = null as Feedback | null;
   const normalizeType = /mi/gi.test(type) ? 'Mixed' : type;
   const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");
   
   return (
      <div className='card-border w-[360px] max-sm:w-full min-h-96' >
         <div className='card-interview'>
            <div>
               <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                  <p className='badge-text'>{normalizeType}</p>
               </div>
               <Image src={getRandomInterviewCover()} 
                     alt="cover-image" 
                     width={90} 
                     height={90} className='size-[50px] rounded-full object-fit' />
               <h3 className='mt-5 capitalize'>
                  {role} Interview  
               </h3>
               <div className='flex flex-row gap-5 mt-3'>
                  <div className='flex flex-row gap-2'>
                     <Image src="/calendar.svg" alt="calendar" width={20} height={20} className='icon' />
                     <p className='text-sm'>{formattedDate}</p>
                  </div>

                  <div className='flex flex-row gap-2 items-center'>
                     <Image src="/star.svg" alt="star" width={20} height={20} className='icon' />
                     <p className='text-sm'>{feedback?.totalScore || '---'}/100</p>
                  </div>
               </div>
               <p className='line-clamp-2  mt-5'>
                  {feedback?.finalAssessment || "You haven't taken any interviews yet. Take it now to improve your skills."}
               </p>
            </div>
            <div className='flex flex-row justify-between items-center mt-5'>
               <DisplayTechIcons techStack={techstacks} />
               <Button className='btn-primary' asChild>
                  <Link href={feedback ? 
                     `/interview/${id}/feedback` : 
                     `/interview/${id}`}>
                        {feedback ? 'Check Feedback' : 'View Interview'}
                  </Link>
               </Button>
            </div>
         </div>
      </div>
   );
};

export default InterviewCard;
