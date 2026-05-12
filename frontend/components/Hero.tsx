import {SignUpButton} from "@clerk/nextjs";


export default function Hero() {
    return(
        <section className="max-w-7xl mx-auto text-center relative w-full">
            <div className="max-w-7xl mx-auto text-center gap-6 sm:gap-8 lg:gap-12 items-center relative">

                {/* Hero Text */}
                <div className="mt-16 text-3xl sm:text-4xl md:text-5xl  font-semibold text-slate-900"
                >
                    Smarter Practice,{" "}
                    <br className="sm:hidden" /> {/* forces a line break on mobile, hides it on sm and above*/}
                    Better Scores.
                </div>


                {/* Hero Image */}
                <img src = "/hero_image.svg" alt="Hero Image" className="w-full"/>
                <p className={"text-[8px] text-muted text-center mt-0.5"}>
                    <a href="https://storyset.com/education" className="text-gray-400">Education Illustrations by Storyset</a>
                </p>

            </div>
        </section>
    )
}