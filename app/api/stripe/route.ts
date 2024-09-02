import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest API version
});

export async function GET(request: Request) {
  try {
    // Extract userId from the request, you might need to adjust this based on your auth setup
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Subscription',
          },
          recurring: {
            interval: 'month'
          },
          unit_amount: 1000, // $10.00 in cents
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId,
      },
    });

    // Return the URL for the checkout session
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}