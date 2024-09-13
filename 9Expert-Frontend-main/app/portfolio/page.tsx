import { Stack } from "@chakra-ui/react";
import { Chat } from "../components/Chat";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { PortfolioBanner } from "./components/PortfolioBanner";
import { PortfolioService } from "./components/PortfolioService";
import { PortfolioSponsor } from "./components/PortfolioSponsor";
import { PortfolioSubBanner } from "./components/PortfolioSubBanner";

export default function Portfolio() {
    return (
        <>
            <Navbar />
            <PortfolioBanner />
            <PortfolioSponsor />
            <PortfolioService />
            <PortfolioSubBanner />
            <Chat />
            <Footer />
        </>
    )
}