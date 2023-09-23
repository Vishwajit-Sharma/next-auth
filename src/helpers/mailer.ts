import nodemailer from "nodemailer"
import User from "@/models/models"
import bcryptjs from "bcryptjs"


export const sendMail = async({email, emailtype, userId}: any) => {
    try {
        const hashedId = await bcryptjs.hash(userId.toString(), 10)

        if(emailtype == "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedId, verifyTokenExpiry: Date.now()+3600000})
        }
        else if(emailtype == "FORGOT"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedId, forgotPasswordTokenExpiry: Date.now()+3600000})
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });
        
        const mailReason = emailtype == "VERIFY" ? "verifyemail" : "forgotpassword"
        
        const mailOptions ={
            from: "vishwajit123sharma@gmail.com",
            to: email,
            subject: emailtype == "VERIFY" ? "Verify your mail" : "Reset your password",
            html: `<p><strong><a href="${process.env.DOMAIN}/${mailReason}?token=${hashedId}">Click Here</a></strong> to 
                ${emailtype == "VERIFY" ? " verify your email" : " reset your password"}
                </br>or</br> Copy paste the below url <br/> ${process.env.DOMAIN}/${mailReason}?token=${hashedId}
                </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}
