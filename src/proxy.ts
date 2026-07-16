import { NextResponse, type NextRequest } from "next/server";

const USERNAME = process.env.BASIC_AUTH_USERNAME ?? "anthony@tackettdesign.com";
const PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? "local-only-password";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Objection Atlas", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (!auth?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const decoded = atob(auth.slice(6));
    const separator = decoded.indexOf(":");
    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    if (username === USERNAME && password === PASSWORD) {
      return NextResponse.next();
    }
  } catch {
    // fall through to 401
  }

  return unauthorized();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
