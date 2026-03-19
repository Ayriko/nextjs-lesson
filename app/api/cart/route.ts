import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return NextResponse.json([]);

  const items = await prisma.cartItem.findMany({ where: { cartId } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  const { productId, name, price, currency } = await request.json();

  let needsCookie = false;
  if (!cartId) {
    const cart = await prisma.cart.create({
      data: {
        id: crypto.randomUUID(),
        updatedAt: new Date(),
      },
    });
    cartId = cart.id;
    needsCookie = true;
  }

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId } },
    create: {
      id: crypto.randomUUID(),
      cartId,
      productId,
      name,
      price,
      currency,
      quantity: 1,
    },
    update: {
      quantity: { increment: 1 },
    },
  });

  const response = NextResponse.json({ success: true });
  if (needsCookie) {
    response.cookies.set("cartId", cartId, { httpOnly: true, path: "/" });
  }
  return response;
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return NextResponse.json({ success: true });

  const { productId } = await request.json();

  await prisma.cartItem.deleteMany({
    where: { cartId, productId },
  });

  return NextResponse.json({ success: true });
}