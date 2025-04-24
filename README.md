# Mammoth

### CRM for Medical Diagnostic Centre

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Update the `.env.local` file by your actual environment variables

```json
SERVER_HOST="10.0.70.50"
SERVER_URL="http://10.0.70.50:5003"
BASE_URL="http://10.0.70.50:5003/api/v1"
```

```javascript
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getProfile from "./utils/getProfile";

const authRoutes = ["/login", "/forgot-password"];
const roleBasedRoutes = {
  USER: [/^\/dashboard(\/.*)?$/],
  ADMIN: [/^\/dashboard(\/.*)?$/],
  // add more roles here if needed
};

type TRole = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Construct the origin manually if request.nextUrl.origin is undefined
  const origin =
    request.nextUrl.origin ||
    `${
      request.headers.get("x-forwarded-proto") || "https"
    }://${request.headers.get("host")}`;

  // Redirect unauthenticated users to login
  if (pathname === "/") {
    const redirectUrl = new URL("/dashboard/tests", origin); // Use constructed origin
    return NextResponse.redirect(redirectUrl);
  }

  // Get the current user from the session
  const user = await getProfile();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL(`/login?redirect=${pathname}`, origin); // Use constructed origin
      return NextResponse.redirect(loginUrl);
    }
  }

  const role = (user.role as string).toUpperCase() as TRole;

  // Check role-based access
  if (role && roleBasedRoutes[role]) {
    const allowedRoutes = roleBasedRoutes[role];

    const hasAccess = allowedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : pathname.match(route)
    );

    if (hasAccess) {
      return NextResponse.next();
    }
  }

  // Default redirect if access is denied
  const defaultRedirectUrl = new URL("/dashboard/tests", origin); // Use constructed origin
  return NextResponse.redirect(defaultRedirectUrl);
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/forgot-password"],
};
```
