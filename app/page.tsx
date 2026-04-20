import Link from 'next/link'

export default function Home() {
  const helpItems = [
    { text: "GET OUT OF DEBT", icon: "/icons/cutting up debt.png" },
    { text: "LEARN HOW TO HANDLE MONEY", icon: "/icons/wallet pig.png" },
    { text: "PAY OFF STUDENT LOANS", icon: "/icons/breaking chains.png" },
    { text: "SET UP A MONTHLY BUDGET AND STICK TO IT", icon: "/icons/Monthly budget.png" },
    { text: "BUILD AN EMERGENCY FUND", icon: "/icons/Emergency fund.png" },
    { text: "BUY A HOME", icon: "/icons/house.png" },
    { text: "PLAN FOR RETIREMENT", icon: "/icons/Planning for retirement.png" },
    { text: "ACHIEVE YOUR DREAMS", icon: "/icons/Saving for dreams.png" }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="section-container py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <img
              src="/images/pablo-heimplatz-EAvS-4KnGrk-unsplash.jpg"
              alt="Inspirational landscape"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">Make Your Dreams A Reality</h1>
            </div>
            <p className="absolute bottom-4 right-4 text-white text-sm opacity-70 drop-shadow-md">Photo by Pablo Heimplatz</p>
          </div>
        </div>
      </section>

      {/* Why Are Your Dreams Unfulfilled Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">WHY ARE YOUR DREAMS UNFULFILLED?</h2>
          <div className="space-y-6 text-lg text-gray-900 leading-relaxed">
            <p className="drop-shadow-sm">
              Are you part of the over 50% of people that believe that it is impossible to achieve your financial goals? Increasing debt, higher expenses, more and more taxes, financial uncertainty, all of which are dragging you down and keeping you from your dreams, your true passions.
            </p>
            <p className="drop-shadow-sm">
              Have you been beat down by your financial situation for so long you can&apos;t even remember your dream goals? I have too. Increasing anxiety, frustration, money fights, sleepless nights worrying about where the money is going to come from to pay the next bill sitting on the counter unopened. You only need to look inside of yourself for the answer.
            </p>
            <p className="drop-shadow-sm">
              You have the passion inside of you to make changes and achieve the dreams you want. I can help you find that passion again. As your Financial Coach, I will walk with you in this process to teach you the financial skills and knowledge that we were never taught in school. To give you the power to take control of your finances, to break free from debt, and to <strong>make your dreams a reality</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* What Is A Financial Coach Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">WHAT IS A FINANCIAL COACH?</h2>
          <div className="space-y-6 text-lg text-gray-900 leading-relaxed">
            <p className="drop-shadow-sm">
              A financial coach is a guide who helps individuals and couples set and achieve financial goals, such as budgeting and paying off debt.
            </p>
            <p className="font-medium text-gray-900 drop-shadow-sm">
              Translation: Together, we'll identify your goals, uncover what's holding you back, and create a plan to help you build the life you dream of. We celebrate wins together and we work through setbacks together. I am here to encourage you as well as call out the hard truths. I believe that even in the darkest time, there is light and a path forward.
            </p>
          </div>
        </div>
      </section>

      {/* How a Financial Coach Can Help You Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-12">HOW A FINANCIAL COACH CAN HELP YOU</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {helpItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 sm:px-6 md:px-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {item.icon ? (
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.text}
                      width="64"
                      height="64"
                      loading="eager"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                    </div>
                  </div>
                )}
                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 text-center flex-1">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Coach Patrick Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-12">MEET COACH PATRICK</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 max-w-lg text-center">
              <div className="space-y-4 text-lg text-gray-900 leading-relaxed">
                <p className="font-semibold text-xl text-gray-900 drop-shadow-sm">
                  Do your dreams feel out of reach?
                </p>
                <p className="drop-shadow-sm">
                  Dreams are what give us motivation to keep moving forward. They are the passion inside of you. Sometimes we lose view of those dreams and that drive forward starts slowing down or backsliding. But there is help available to bring your dreams to life!
                </p>
                <p className="drop-shadow-sm">
                  Let&apos;s talk about your dreams, what drives you and how, together, we can make them come true.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Link href="/about" className="btn-primary text-lg w-full sm:w-auto text-center">
                  LEARN MORE
                </Link>
                <Link href="/free-consultation" className="btn-primary text-lg w-full sm:w-auto text-center">
                  GET STARTED
                </Link>
              </div>
            </div>

            {/* Right Column - Headshot */}
            <div className="order-first md:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                <picture>
                  <source srcSet="/images/patrick-headshot-optimized.webp" type="image/webp" />
                  <img
                    src="/images/patrick-headshot-optimized.jpg"
                    alt="Patrick Frare - Financial Coach"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
