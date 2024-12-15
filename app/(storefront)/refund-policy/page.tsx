import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Refund Eligibility</h2>
        <p>
          At Digigo, we strive to ensure customer satisfaction with all our
          digital products. However, we understand that there may be instances
          where a refund is necessary. Please read our refund policy carefully
          to understand your rights and our obligations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. Refund Request Process
        </h2>
        <p>To request a refund, please follow these steps:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li>
            Send an email to{" "}
            <a
              href="mailto:support@digigo.studio"
              className="text-blue-600 hover:underline"
            >
              support@digigo.studio
            </a>
          </li>
          <li>
            Specify your email address or phone number used during registration
          </li>
          <li>Provide the reason for your refund request</li>
          <li>Include any relevant order information or transaction details</li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Refund Timeframe</h2>
        <p>
          A Refund Request will be deemed valid only if made within 14 days from
          the time of purchase. No refund request will be considered valid after
          14 days of purchase.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Exceptions</h2>
        <p>
          Please note that no refund is applicable for digital products with
          less than 12 months of validity.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Refund Processing</h2>
        <p>
          Once your refund request is successfully processed and approved by
          Jamroll Limited, refunds shall be made to the original payment method
          (bank, mobile financial services account, or card) used for the
          purchase. The refund process typically takes 7 to 10 days from the
          date of approval.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Confirmation</h2>
        <p>
          Upon successful processing of your refund, a confirmation email will
          be sent to the email address associated with your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Refund Policy, please
          don&apos;t hesitate to contact us at{" "}
          <a
            href="mailto:support@digigo.studio"
            className="text-blue-600 hover:underline"
          >
            support@digigo.studio
          </a>
          .
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-8">Last updated: [Current Date]</p>

      <div className="mt-8">
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms and Conditions
        </Link>{" "}
        |
        <Link href="/privacy" className="text-blue-600 hover:underline ml-4">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
