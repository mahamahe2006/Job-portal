import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWbhooks = async (req, res) => {
  try {

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString();

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = JSON.parse(payload);

    console.log(type);

    switch (type) {

      case "user.created": {

        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ""
        };

        await User.create(userData);

        console.log("User created successfully");

        res.json({});
        break;
      }

      case "user.updated": {

        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        };

        await User.findByIdAndUpdate(data.id, userData);

        res.json({});
        break;
      }

      case "user.deleted": {

        await User.findByIdAndDelete(data.id);

        res.json({});
        break;
      }

      default:
        res.json({});
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Webhooks Error" });
  }
};