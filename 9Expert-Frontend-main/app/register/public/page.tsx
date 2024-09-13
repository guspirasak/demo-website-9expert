import { RegisterPublicProvider } from "../context/RegisterPublicContext";
import { ValidateRegisterPublicProvider } from "../context/RegisterPublicValidateContext";
import { RegisterPublicPage } from "./components/RegisterPublicPage";

export default function RegisterPublicMainPage() {
    return (
        <>
            <RegisterPublicProvider>
                <ValidateRegisterPublicProvider>
                    <RegisterPublicPage />
                </ValidateRegisterPublicProvider>
            </RegisterPublicProvider>
        </>
    )
}