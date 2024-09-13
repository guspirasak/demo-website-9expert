import { RegisterPublicProvider } from "../context/RegisterPublicContext";
import { ValidateRegisterPublicProvider } from "../context/RegisterPublicValidateContext";
import { RegisterHybridPage } from "./components/RegisterHybridPage";

export default function RegisterHybridMainPage() {
    return (
        <>
            <RegisterPublicProvider>
                <ValidateRegisterPublicProvider>
                    <RegisterHybridPage />
                </ValidateRegisterPublicProvider>
            </RegisterPublicProvider>
        </>
    )
}