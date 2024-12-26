import { NextResponse } from "next/server";

// Middleware function
export async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;

  // Protect admin routes
  if (path.startsWith("/admin")) {
    const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic" },
      });
    }

    const isAuthorized = await validateAuthorization(authHeader);
    if (!isAuthorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

// Function to validate basic authorization
async function validateAuthorization(authHeader) {
  try {
    const [username, password] = decodeAuthHeader(authHeader);

    return (
      username === process.env.ADMIN_USERNAME &&
      (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD))
    );
  } catch (error) {
    return false; // Invalid authorization
  }
}

// Helper function to decode the Basic Auth header
function decodeAuthHeader(authHeader) {
  const encoded = authHeader.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString();
  return decoded.split(":");
}

// Function to validate hashed password
async function isValidPassword(password, hashedPassword) {
  return (await hashPassword(password)) === hashedPassword;
}

// Function to hash the password
async function hashPassword(password) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );
  return Buffer.from(arrayBuffer).toString("base64");
}

// Configuration to apply middleware on specific routes
export const config = {
  matcher: ["/admin/:path*"],
};

//async function hashPassword(password) {
//    const arrayBuffer = await crypto.subtle.digest(
//      "SHA-512",
//      new TextEncoder().encode(password)
//    );
//    return Buffer.from(arrayBuffer).toString("base64");
//  }
  
  // Example: Generate the hash for "admin"
//  hashPassword("admin").then(console.log);
  