import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#2e53e6",
          colorText: "#f9fafb",
          fontFamily: "Inter, sans-serif",
          borderRadius: "8px",
        },
        elements: {
          headerTitle: {
            fontSize: "24px",
            fontWeight: "600",
            color: "#f9fafb",
          },
          formButtonPrimary: {
            backgroundColor: "#2e53e6",
            borderRadius: "8px",
            fontWeight: "500",
            padding: "12px 20px",
          },
          formFieldInput: {
            backgroundColor: "#1f2937",
            borderColor: "#1d4ed8",
            color: "#f9fafb",
            borderRadius: "8px",
            padding: "10px 14px",
          },
          footerActionLink: {
            color: "#1e44ff",
          },
          formMessageError: {
            color: "#f87171",
          },
        },
      }}
    />
  );
}
