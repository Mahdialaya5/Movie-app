import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(

  function middleware(req) {

    const token = req.nextauth.token;
    
    if (!token) {
      return NextResponse.redirect("/");
    }
    return NextResponse.next();
  })

export const config = {
  matcher: ["/profile", "/addmovie","/editmovie","/movie/[id]"], 
};

       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email) => emailRegex.test(email);