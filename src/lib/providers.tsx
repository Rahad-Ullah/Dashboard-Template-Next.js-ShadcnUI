import { AuthProvider } from "@/contexts/AuthContext";
import { FormProvider } from "@/contexts/facilityFormContext";
import { TestFormProvider } from "@/contexts/testFormContext";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value || null; // Read token from cookies
  const user = (await cookies()).get("user")?.value || null; // Read user from cookies

  return (
    <FormProvider>
      <TestFormProvider>
        <AuthProvider initialToken={token} initialUser={user}>
          {children}
        </AuthProvider>
      </TestFormProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
    </FormProvider>
  );
};

export default Providers;
