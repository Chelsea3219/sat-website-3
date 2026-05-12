// Grants authentication state throughout your app -- allows you to protect specify routes from unauthenticated register
// By default, it leaves all public routes
import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import {NextResponse} from "next/server";

// Defines the private routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])


// Defines the public routes
const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/docs',
])

export default clerkMiddleware(async (auth, req) => {
    // if (isProtectedRoute(req)) await auth.protect()

    const {userId} = await auth()

    // If logged in and on a public route, redirect to dashboard
    if (userId && isPublicRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If not logged in and on a protected route, redirect to sign in
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        // Always run for Clerk-specific frontend API routes
        '/__clerk/(.*)',
    ],
};


// Use auth.protect() if you want to redirect unauthenticated register to the sign-in route automatically
// Use auth().isAuthenticated if you want more control over what your app does based on user authentication status

