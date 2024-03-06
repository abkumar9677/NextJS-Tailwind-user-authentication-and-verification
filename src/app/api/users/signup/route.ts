import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody, "This is the body of the request");

    // check if user already exist
    let userExist = await User.findOne({ email });
    if (userExist) return new Response("User Already Exists", { status: 400 });

    // hash password before saving to database
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // save user to the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    console.log(newUser, "this is saved user");

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
