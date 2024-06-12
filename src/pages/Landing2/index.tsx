import Footer from "@/components/Landing/Footer"
import LandingHeader from "@/components/Landing/Header"
import Section1 from "@/components/Landing2/1"
import Section2 from "@/components/Landing2/2"
import Section3 from "@/components/Landing2/3"
import Section4 from "@/components/Landing2/4"
import Section5 from "@/components/Landing2/5"

const Landing2 = () => {
    return (
        <>
            <LandingHeader />

            <main>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
            </main>

            <Footer />
        </>
    )
}

export default Landing2