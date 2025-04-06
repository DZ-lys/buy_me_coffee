import { Header } from "@/app/_components/Header";
import { LeftMenu } from "@/components/LeftMenu";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const Explore = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center relative ">
      <Header />
      <div className="flex absolute top-24 left-12">
        <LeftMenu />
        {/* Main content */}
        <main className="flex-1">
          <header className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Explore creators</h2>
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">Jake</span>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              {/* Creator Card 1 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Space ranger"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-medium">Space ranger</h3>
                  </div>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    View profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      About Space ranger
                    </h4>
                    <p className="text-sm text-gray-700">
                      All day, every day, we're watching, listening to, reading
                      and absorbing politics. It's exhausting. We then report on
                      what we've seen in a way that's as chill as possible. None
                      of the sensationalism and division you'll find elsewhere.
                      It's about quality over quantity.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Social media URL
                    </h4>
                    <a
                      href="#"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      https://buymecoffee.com/baconpancakes1
                    </a>
                  </div>
                </div>
              </div>

              {/* Creator Card 2 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Purple monster"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-medium">Purple monster</h3>
                  </div>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    View profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      About Purple monster
                    </h4>
                    <p className="text-sm text-gray-700">
                      Purple monster is for everyone. It handles all the painful
                      experiences and helps people.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Social media URL
                    </h4>
                    <a
                      href="#"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      https://buymecoffee.com/fmonster23
                    </a>
                  </div>
                </div>
              </div>

              {/* Creator Card 3 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Alien Conspiracy"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-medium">Alien Conspiracy</h3>
                  </div>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    View profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      About Alien Conspiracy
                    </h4>
                    <p className="text-sm text-gray-700">
                      Show your support ❤️ and buy me a coffee! & keep project a
                      live!
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Social media URL
                    </h4>
                    <a
                      href="#"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      https://buymecoffee.com/coooaaamm
                    </a>
                  </div>
                </div>
              </div>

              {/* Creator Card 4 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Teams"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-medium">Teams</h3>
                  </div>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    View profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      About Teams
                    </h4>
                    <p className="text-sm text-gray-700">
                      Joel 1:14 "Sanctify a fast, call a solemn assembly, gather
                      the elders and all the inhabitants of the land. Cry out to
                      the LORD." My purpose is clear. It's work time's here,
                      every Thursday for all my Subscribers to align with His
                      will, and to step into the purpose He has for us.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Social media URL
                    </h4>
                    <a
                      href="#"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      https://buymecoffee.com/kak40
                    </a>
                  </div>
                </div>
              </div>

              {/* Creator Card 5 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Dragons1"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-medium">Dragons1</h3>
                  </div>
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    View profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      About Dragons1
                    </h4>
                    <p className="text-sm text-gray-700">Hello</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Social media URL
                    </h4>
                    <a
                      href="#"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      https://buymecoffee.com/dragons1
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;
