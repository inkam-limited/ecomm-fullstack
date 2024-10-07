import PaymentDetails from "./PaymentDetails";

export default function PaymentDetailsPage({
  params,
}: {
  params: { transactionId: string };
}) {
  return (
    <div>
      <PaymentDetails transactionId={params.transactionId} />
    </div>
  );
}
