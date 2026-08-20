import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

// standarad GST deadlines for current month
function getStandardDeadlines() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  // next month for filing current months returns'
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return [
    {
      title: `GSTR-1 · ${months[month]} ${year}`,
      dueDate: new Date(nextYear, nextMonth, 11),
      type: "gst",
      description: "Monthly outward supplies return",
    },
    {
      title: `GSTR-3B · ${months[month]} ${year}`,
      dueDate: new Date(nextYear, nextMonth, 20),
      type: "gst",
      description: "Monthly summary return with tax payment",
    },
    {
      title: `TDS Return · Q${Math.ceil((month + 1) / 3)} ${year}`,
      dueDate: new Date(nextYear, nextMonth, 7),
      type: "tds",
      description: "Tax deducted at source quarterly return",
    },
  ];
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const deadlines = await db.deadline.findMany({
      where: { userId: user.id },
      orderBy: { dueDate: "asc" },
    });
    return NextResponse.json({
      deadlines,
      StandardDeadlines: getStandardDeadlines(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, dueDate, type } = body as {
      title: string;
      dueDate: string;
      type: string;
    };
    if (!title || !dueDate || !type) {
      return NextResponse.json(
        { error: "Title, due date and type are required" },
        { status: 400 },
      );
    }
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const deadline = await db.deadline.create({
      data: {
        userId: user.id,
        title,
        dueDate: new Date(dueDate),
        type,
        status: "upcoming",
      },
    });
    return NextResponse.json({ success: true, deadline });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { id, status } = body as { id: string; status: string };

    const deadline = await db.deadline.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, deadline });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
