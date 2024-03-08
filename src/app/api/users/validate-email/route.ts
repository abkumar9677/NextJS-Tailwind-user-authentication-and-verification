import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log("validateuser",reqBody)
    //  Check if the user is already in the database
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    // if (user.isVerified == false) {
    //   return NextResponse.json(
    //     { error: "Mail is not verified" },
    //     { status: 400 }
    //   );
    // }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Email validate. Please check your inbox to update password",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
