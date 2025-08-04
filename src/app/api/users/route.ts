// app/api/users/route.ts
import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db";

export async function GET() {
    const users = getUsers();
    return NextResponse.json(users);
}
