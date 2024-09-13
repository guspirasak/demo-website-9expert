import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { FAQBanner } from "./components/FAQBanner";
import { FAQContent } from "./components/FAQContent";


export default function FAQ() {
    return (
        <>
            <Navbar />
            <FAQBanner />
            <FAQContent />
            <Footer />
        </>
    )
}