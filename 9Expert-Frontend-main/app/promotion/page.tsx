'use client'

import { Stack } from "@chakra-ui/react";
import { Chat } from "../components/Chat";
import { HeroBanner } from "../components/layout/Banner/HeroBanner";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { PromotionContent } from "./components/PromotionContent";
import { PromotionSubBanner } from "./components/PromotionSubBanner";

export default function Promotion() {
    return (
        <>
            <Navbar />
            <HeroBanner title="โปรโมชั่นทั้งหมด" subtitle={`9EXPERT ต้อนรับปี ${new Date().getFullYear()} ด้วยโปรโมชั่นสุดพิเศษ`} />
            <PromotionContent />
            <PromotionSubBanner />
            <Chat />
            <Footer />
        </>
    )
}