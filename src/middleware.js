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
  matcher: ["/profile", "/addmovie","/editmovie"], 
};
