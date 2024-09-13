import { HeroBanner } from "../components/layout/Banner/HeroBanner";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContactUsDetail } from "./components/ContactUsDetail";
import { ContactUsNavigation } from "./components/ContactUsNavigation";
import { ContactUsTransportation } from "./components/ContactUsTransportation";

export default function ContactUs() {
    return (
        <>
            <Navbar />
            <HeroBanner title="ติดต่อเรา" subtitle="ช่องทางการติดต่อและเดินทางมา 9Expert" />
            <ContactUsDetail />
            <ContactUsTransportation />
            <ContactUsNavigation />
            <Footer />
        </>)
}