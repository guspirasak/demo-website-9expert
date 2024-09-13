import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { JoinUsBanner } from "./components/JoinUsBanner";
import { JoinUsDescription } from "./components/JoinUsDescription";
import { JoinUsFullTime } from "./components/JoinUsFullTime";
import { JoinUsRegister } from "./components/JoinUsRegister";
import { JoinWith9Expert } from "./components/JoinWith9Expert";

export default function JoinUs() {
    return (
        <>
            <Navbar />
            <JoinUsBanner />
            <JoinUsDescription />
            <JoinUsFullTime />
            <JoinUsRegister />
            <JoinWith9Expert />
            <Footer />
        </>
    )
}