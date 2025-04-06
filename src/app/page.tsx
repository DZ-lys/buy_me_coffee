"use client";
import { Button } from "@/components/ui/button";
import { UserType } from "@/utils/types/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./_components/Header";
import { LeftMenu } from "@/components/LeftMenu";
import { Label } from "@/components/ui/label";
import { ArrowDown, Heart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center relative ">
      <Header />
      <div className="flex absolute top-24 left-12 gap-16">
        <LeftMenu />

        <div className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Jake's profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-medium">Jake</h2>
                <p className="text-sm text-gray-500">
                  buymecoffee.com/hearsomecakes1
                </p>
              </div>
            </div>
            <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
              Share page link
            </button>
          </div>

          {/* Earnings Section */}
          <div className="mb-8 rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">Earnings</h3>
              <div className="flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm">
                <span>Last 30 days</span>
                <ArrowDown className="ml-2 h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold">$450</div>
          </div>

          {/* Transactions Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">Recent transactions</h3>
              <span className="text-sm text-gray-500">Amount</span>
            </div>

            <div className="space-y-4">
              {/* Transaction 1 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs">
                      CN
                    </div>
                    <div>
                      <p className="text-sm font-medium">Guest</p>
                      <p className="text-xs text-gray-500">
                        instagram.com/weirdsky
                      </p>
                      <p className="mt-2 text-sm">
                        Thank you for being so awesome everyday! You always
                        manage to brighten up my day when I'm feeling down.
                        Although $1 isn't that much money, it's all I can
                        contribute at the moment.
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $1</p>
                    <p className="text-xs text-gray-500">10 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Transaction 2 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Tyler D.</p>
                      <p className="text-xs text-gray-500">
                        buymecoffee.com/tcofeekid
                      </p>
                      <p className="mt-2 text-sm">
                        Thank you for being so awesome everyday!
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $10</p>
                    <p className="text-xs text-gray-500">10 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Transaction 3 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs">
                      CN
                    </div>
                    <div>
                      <p className="text-sm font-medium">RadiGala</p>
                      <p className="text-xs text-gray-500">
                        buymecoffee.com/radgame
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $2</p>
                    <p className="text-xs text-gray-500">10 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Transaction 4 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Guest</p>
                      <p className="text-xs text-gray-500">
                        facebook.com/guestacct
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $5</p>
                    <p className="text-xs text-gray-500">11 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Transaction 5 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Fan1</p>
                      <p className="text-xs text-gray-500">
                        buymecoffee.com/supportview
                      </p>
                      <p className="mt-2 text-sm">
                        Thank you for being so awesome everyday! You always
                        manage to brighten up my day when I'm feeling down.
                        Although $1 isn't that much money, it's all I can
                        contribute at the moment. When I become successful, I
                        will be sure to buy you more gifts and donations. Thank
                        you again.
                      </p>
                      <button className="mt-2 text-xs text-gray-500 hover:underline">
                        Show less
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $10</p>
                    <p className="text-xs text-gray-500">11 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Transaction 6 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs">
                      CN
                    </div>
                    <div>
                      <p className="text-sm font-medium">Guest</p>
                      <p className="text-xs text-gray-500">
                        instagram.com/weirdsky
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+ $1</p>
                    <p className="text-xs text-gray-500">11 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="w-[59.688rem] h-[61.625rem] flex flex-col gap-5 ">
          <div className="w-[95%] h-64 border rounded-lg p-6 flex flex-col gap-3 "></div>
          <div>
            <Label className="font-semibold text-base  ">
              Recent transactions
            </Label>
          </div>
          <div className="w-[95%] max-h-[41.5rem] border rounded-lg p-6 flex flex-col justify-center items-center gap-3 ">
            <div className="w-96 h-32 flex flex-col gap-5 items-center justify-center ">
              <div>
                <Heart className="w-8 h-7" />
              </div>
              <div>
                <h6 className="font-semibold text-base text-center ">
                  You don’t have any supporters yet
                </h6>
                <p className="font-normal text-base text-center">
                  Share your page with your audience to get started.
                </p>
              </div>
            </div>
          </div>
        </div> */
}
{
  /* Main Content */
}
