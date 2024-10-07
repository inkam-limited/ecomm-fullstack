"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type PaymentDetailsProps = {
  transactionId: string;
};

type PaymentDetails = {
  pg_txnid: string;
  mer_txnid: string;
  risk_title: string;
  risk_level: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  cus_add1: string;
  cus_add2: string;
  cus_city: string;
  cus_state: string | null;
  cus_postcode: string | null;
  cus_country: string;
  cus_fax: string | null;
  ship_name: string | null;
  ship_add1: string | null;
  ship_add2: string | null;
  ship_city: string | null;
  ship_state: string | null;
  ship_postcode: string | null;
  ship_country: string | null;
  merchant_id: string;
  store_id: string;
  amount: string;
  amount_bdt: string;
  amount_original: string;
  pay_status: string;
  status_code: string;
  status_title: string;
  cardnumber: string;
  approval_code: string;
  payment_processor: string;
  bank_trxid: string;
  payment_type: string;
  error_code: string;
  error_title: string;
  bin_country: string;
  bin_issuer: string;
  bin_cardtype: string;
  bin_cardcategory: string;
  date: string;
  date_processed: string;
  amount_currency: string;
  rec_amount: string;
  store_amount: string;
  processing_ratio: string;
  processing_charge: string;
  ip: string;
  currency: string;
  currency_merchant: string;
  convertion_rate: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
  verify_status: string;
  call_type: string;
  email_send: string;
  doc_recived: string;
  checkout_status: string;
};

export default function PaymentDetails({ transactionId }: PaymentDetailsProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/payment/${transactionId}`);
        const data = await response.json();
        if (response.ok) {
          setPaymentDetails(data);
        } else {
          setError(data.error || "Error fetching payment details");
        }
      } catch (err) {
        setError("Failed to fetch payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [transactionId]);

  const renderDetailItem = (label: string, value: string | null) => (
    <div className="mb-2">
      <Label className="font-semibold">{label}</Label>
      <p className="text-sm">{value || "N/A"}</p>
    </div>
  );
  if (!paymentDetails) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p className="text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Details Search</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentDetails && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem(
                      "Payment Gateway Transaction ID",
                      paymentDetails.pg_txnid
                    )}
                    {renderDetailItem(
                      "Merchant Transaction ID",
                      paymentDetails.mer_txnid
                    )}
                    {renderDetailItem("Risk Title", paymentDetails.risk_title)}
                    {renderDetailItem("Risk Level", paymentDetails.risk_level)}
                    {renderDetailItem("Amount", paymentDetails.amount)}
                    {renderDetailItem(
                      "Amount (BDT)",
                      paymentDetails.amount_bdt
                    )}
                    {renderDetailItem(
                      "Original Amount",
                      paymentDetails.amount_original
                    )}
                    {renderDetailItem(
                      "Payment Status",
                      paymentDetails.pay_status
                    )}
                    {renderDetailItem(
                      "Status Code",
                      paymentDetails.status_code
                    )}
                    {renderDetailItem(
                      "Status Title",
                      paymentDetails.status_title
                    )}
                    {renderDetailItem("Date", paymentDetails.date)}
                    {renderDetailItem(
                      "Date Processed",
                      paymentDetails.date_processed
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem("Name", paymentDetails.cus_name)}
                    {renderDetailItem("Email", paymentDetails.cus_email)}
                    {renderDetailItem("Phone", paymentDetails.cus_phone)}
                    {renderDetailItem("Address 1", paymentDetails.cus_add1)}
                    {renderDetailItem("Address 2", paymentDetails.cus_add2)}
                    {renderDetailItem("City", paymentDetails.cus_city)}
                    {renderDetailItem("State", paymentDetails.cus_state)}
                    {renderDetailItem("Postcode", paymentDetails.cus_postcode)}
                    {renderDetailItem("Country", paymentDetails.cus_country)}
                    {renderDetailItem("Fax", paymentDetails.cus_fax)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem("Card Number", paymentDetails.cardnumber)}
                    {renderDetailItem(
                      "Approval Code",
                      paymentDetails.approval_code
                    )}
                    {renderDetailItem(
                      "Payment Processor",
                      paymentDetails.payment_processor
                    )}
                    {renderDetailItem(
                      "Bank Transaction ID",
                      paymentDetails.bank_trxid
                    )}
                    {renderDetailItem(
                      "Payment Type",
                      paymentDetails.payment_type
                    )}
                    {renderDetailItem("Error Code", paymentDetails.error_code)}
                    {renderDetailItem(
                      "Error Title",
                      paymentDetails.error_title
                    )}
                    {renderDetailItem(
                      "BIN Country",
                      paymentDetails.bin_country
                    )}
                    {renderDetailItem("BIN Issuer", paymentDetails.bin_issuer)}
                    {renderDetailItem(
                      "BIN Card Type",
                      paymentDetails.bin_cardtype
                    )}
                    {renderDetailItem(
                      "BIN Card Category",
                      paymentDetails.bin_cardcategory
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem(
                      "Amount Currency",
                      paymentDetails.amount_currency
                    )}
                    {renderDetailItem(
                      "Received Amount",
                      paymentDetails.rec_amount
                    )}
                    {renderDetailItem(
                      "Store Amount",
                      paymentDetails.store_amount
                    )}
                    {renderDetailItem(
                      "Processing Ratio",
                      paymentDetails.processing_ratio
                    )}
                    {renderDetailItem(
                      "Processing Charge",
                      paymentDetails.processing_charge
                    )}
                    {renderDetailItem("Currency", paymentDetails.currency)}
                    {renderDetailItem(
                      "Merchant Currency",
                      paymentDetails.currency_merchant
                    )}
                    {renderDetailItem(
                      "Conversion Rate",
                      paymentDetails.convertion_rate
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem("IP Address", paymentDetails.ip)}
                    {renderDetailItem(
                      "Verify Status",
                      paymentDetails.verify_status
                    )}
                    {renderDetailItem("Call Type", paymentDetails.call_type)}
                    {renderDetailItem("Email Sent", paymentDetails.email_send)}
                    {renderDetailItem(
                      "Document Received",
                      paymentDetails.doc_recived
                    )}
                    {renderDetailItem(
                      "Checkout Status",
                      paymentDetails.checkout_status
                    )}
                    {renderDetailItem("Option A", paymentDetails.opt_a)}
                    {renderDetailItem("Option B", paymentDetails.opt_b)}
                    {renderDetailItem("Option C", paymentDetails.opt_c)}
                    {renderDetailItem("Option D", paymentDetails.opt_d)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Merchant Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem(
                      "Merchant ID",
                      paymentDetails.merchant_id
                    )}
                    {renderDetailItem("Store ID", paymentDetails.store_id)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderDetailItem("Name", paymentDetails.ship_name)}
                    {renderDetailItem("Address 1", paymentDetails.ship_add1)}
                    {renderDetailItem("Address 2", paymentDetails.ship_add2)}
                    {renderDetailItem("City", paymentDetails.ship_city)}
                    {renderDetailItem("State", paymentDetails.ship_state)}
                    {renderDetailItem("Postcode", paymentDetails.ship_postcode)}
                    {renderDetailItem("Country", paymentDetails.ship_country)}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
