export const ROUTES = {
   HOME: '/',
   SIGNUP: '/sign-up',
   SIGNIN: '/sign-in',
   FEEDBACK: (id:string) => `/interview/${id}/feedback`,
   INTERVIEW: '/interview',
   INTERVIEW_BY_ID: (id:string) => `/interview/${id}`,
   INTERVIEW_GENERATOR: '/interview/generator',
}