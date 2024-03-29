import Footer from "@/components/Landing/Footer"
import LandingHeader from "@/components/Landing/Header"
import Section1 from "@/components/Landing/Sections/1"
import Section10 from "@/components/Landing/Sections/10"
import Section11 from "@/components/Landing/Sections/11"
import Section12 from "@/components/Landing/Sections/12"
import Section13 from "@/components/Landing/Sections/13"
import Section2 from "@/components/Landing/Sections/2"
import Section3 from "@/components/Landing/Sections/3"
import Section4 from "@/components/Landing/Sections/4"
import Section5 from "@/components/Landing/Sections/5"
import Section6 from "@/components/Landing/Sections/6"
import Section7 from "@/components/Landing/Sections/7"
import Section8 from "@/components/Landing/Sections/8"
import Section9 from "@/components/Landing/Sections/9"
import { useEffect } from "react"

const Landing = () => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = '';
        };
    }, []);

    return (
        <>
            <LandingHeader />

            <main>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
                <Section9 />
                <Section10 />
                <Section11 />
                <Section12 />
                <Section13 />
            </main>

            <Footer />
        </>
    )
}

export default Landing