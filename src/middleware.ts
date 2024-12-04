
import { NextResponse, NextRequest } from "next/server";


export const middleware = async (request: NextRequest) => {
  const session = request.cookies.get("token"); 
  console.log("session",session)
  const path = request.nextUrl.pathname; 
  
  const publicPaths = ["/login", "/sign-up"]; 
  
  const isPublicPath = publicPaths.includes(path); 


  if (session && isPublicPath) {
 
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (!session && !isPublicPath) {

    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

 
  return NextResponse.next();
};


export const config = {
  matcher: [
    "/",          
    "/login",      
    "/sign-up",    
    "/home",       
    "/checkup",    
    "/add-medicine",
    "/medicine-list",
    "/disease-list",
    "/patients-list",
  ],
};
