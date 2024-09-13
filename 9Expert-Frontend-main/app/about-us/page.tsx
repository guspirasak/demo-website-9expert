import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { AboutUs9Expert } from "./components/AboutUs9Expert";
import { AboutUsBanner } from "./components/AboutUsBanner";
import { AboutUsJoin } from "./components/AboutUsJoin";
import { AboutUsSpeech } from "./components/AboutUsSpeech";
import { AboutUsStats } from "./components/AboutUsStats";
import { AboutUsWhyUs } from "./components/AboutUsWhyUs";


export default function AboutUs() {
    return (
        <>
            <Navbar />
            <AboutUsBanner />
            <AboutUs9Expert />
            <AboutUsWhyUs />
            <AboutUsStats />
            <AboutUsSpeech />
            <AboutUsJoin />
            <Footer />
        </>
    )
}