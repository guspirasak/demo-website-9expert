import { Footer } from "@/app/components/layout/Footer";
import { Navbar } from "@/app/components/layout/Navbar";
import { ValidateRegisterInhouseProvider } from "../context/RegisterInhouseValidateContext";
import { RegisterInhouseProvider } from "../context/RegisterInouseContext";
import { RegisterInhouseContent } from "./components/RegisterInhouseContent";

export default function RegisterInhousePage() {
    return (
        <>
            <Navbar />
            <RegisterInhouseProvider>
                <ValidateRegisterInhouseProvider>
                    <RegisterInhouseContent />
                </ValidateRegisterInhouseProvider>
            </RegisterInhouseProvider>
            <Footer />
        </>
    )
}