import { Html, Head, Body, Container, Heading, Text, Section, Preview } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
      </Head>

      {/* Email Preview Text (appears in email clients as a preview snippet) */}
      <Preview>Your verification code is {otp}. Enter this code to verify your account.</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Welcome, {username}!</Heading>
          <Text style={styles.text}>We're excited to have you on board. 🎉</Text>

          <Section style={styles.otpSection}>
            <Text style={styles.otpLabel}>Your verification code:</Text>
            <Text style={styles.otpCode}>{otp}</Text>
          </Section>

          <Text style={styles.footer}>
            If you did not request this code, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f3f4f6",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center" as const,
  },
  heading: {
    color: "#333",
  },
  text: {
    fontSize: "16px",
    color: "#555",
  },
  otpSection: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    display: "inline-block",
  },
  otpLabel: {
    fontSize: "14px",
    color: "#777",
  },
  otpCode: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222",
    marginTop: "5px",
  },
  footer: {
    fontSize: "12px",
    color: "#888",
    marginTop: "20px",
  },
};
