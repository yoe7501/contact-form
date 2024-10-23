import { NextRequest, NextResponse } from "next/server";

interface Submission {
    firstName: string;
    lastName: string;
    email: string;
    query: 'general' | 'support'; // Based on your enum
    message?: string; // Optional field
    consent: boolean; // Assuming consent is a boolean
  }

const submission: Submission[] = [];

export async function GET() {
    return NextResponse.json(submission);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    submission.push(body);
    return NextResponse.json(body);
}