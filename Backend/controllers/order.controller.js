import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import stripe from "stripe";

export const placeOrderCOD = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;
    const { items, address } = req.body;
    if (!address || items.length === 0) {
      return next(errorHandler(400, "Invalid Data"));
    }

    //calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //adding tax charge 2%
    amount += Math.floor(amount * 0.02);
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    next(error);
  }
};

//get orders by userID
export const getUserOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await Order.find({
      userId: user._id,
      $or: [
        { paymentType: "COD" },
        { isPaid: true },
        { paymentType: "Online" },
      ],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      $or: [
        { paymentType: "COD" },
        { isPaid: true },
        { paymentType: "Online" },
      ],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

//place order Stripe
export const placeOrderStripe = async (req, res, next) => {
  try {
    const { email, items, address } = req.body;
    const user = await User.findOne({ email });
    const userId = JSON.stringify(user._id);
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return next(errorHandler(400, "Invalid Data"));
    }

    let productData = [];
    //calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //adding tax charge 2%
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId: JSON.parse(userId),
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: true,
    });

    // stripe gateway initialize;
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    //create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create session;
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.status(201).json({ success: true, url: session.url });
  } catch (error) {
    next(error);
  }
};

// stripe webhooks to verify payment action
export const stripeWebhooks = async (req, res, next) => {
  // stripe gateway initialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    // next(error);
    res.status(400).send(`Webhook error: ${error.message}`);
  }

  //handling the event;
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderId, userId } = session.data[0].metadata;

      // mark payment as paid
      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;
    }
    default:
      console.error(`Unhandled event type ${event.type}`);
      break;
  }
  res.json({ recieved: true });
};
