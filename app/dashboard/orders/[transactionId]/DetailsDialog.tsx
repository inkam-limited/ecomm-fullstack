import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPaymentDetails } from "./action";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
const DetailsDialog = async ({ id }: { id: string }) => {
  const { data } = await getPaymentDetails(id);

  const renderDetailItem = (label: string, value: string | null) => (
    <div className="mb-2">
      <Label className="font-semibold">{label}</Label>
      <p className="text-sm">{value || "N/A"}</p>
    </div>
  );
  console.log(data !== undefined && data);

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details Search</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {data && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Payment Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Transaction Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem(
                              "Payment Gateway Transaction ID",
                              data.pg_txnid
                            )}
                            {renderDetailItem(
                              "Merchant Transaction ID",
                              data.mer_txnid
                            )}
                            {renderDetailItem("Risk Title", data.risk_title)}
                            {renderDetailItem("Risk Level", data.risk_level)}
                            {renderDetailItem("Amount", data.amount)}
                            {renderDetailItem("Amount (BDT)", data.amount_bdt)}
                            {renderDetailItem(
                              "Original Amount",
                              data.amount_original
                            )}
                            {renderDetailItem(
                              "Payment Status",
                              data.pay_status
                            )}
                            {renderDetailItem("Status Code", data.status_code)}
                            {renderDetailItem(
                              "Status Title",
                              data.status_title
                            )}
                            {renderDetailItem("Date", data.date)}
                            {renderDetailItem(
                              "Date Processed",
                              data.date_processed
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem("Name", data.cus_name)}
                            {renderDetailItem("Email", data.cus_email)}
                            {renderDetailItem("Phone", data.cus_phone)}
                            {renderDetailItem("Address 1", data.cus_add1)}
                            {renderDetailItem("Address 2", data.cus_add2)}
                            {renderDetailItem("City", data.cus_city)}
                            {renderDetailItem("State", data.cus_state)}
                            {renderDetailItem("Postcode", data.cus_postcode)}
                            {renderDetailItem("Country", data.cus_country)}
                            {renderDetailItem("Fax", data.cus_fax)}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem("Card Number", data.cardnumber)}
                            {renderDetailItem(
                              "Approval Code",
                              data.approval_code
                            )}
                            {renderDetailItem(
                              "Payment Processor",
                              data.payment_processor
                            )}
                            {renderDetailItem(
                              "Bank Transaction ID",
                              data.bank_trxid
                            )}
                            {renderDetailItem(
                              "Payment Type",
                              data.payment_type
                            )}
                            {renderDetailItem("Error Code", data.error_code)}
                            {renderDetailItem("Error Title", data.error_title)}
                            {renderDetailItem("BIN Country", data.bin_country)}
                            {renderDetailItem("BIN Issuer", data.bin_issuer)}
                            {renderDetailItem(
                              "BIN Card Type",
                              data.bin_cardtype
                            )}
                            {renderDetailItem(
                              "BIN Card Category",
                              data.bin_cardcategory
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
                              data.amount_currency
                            )}
                            {renderDetailItem(
                              "Received Amount",
                              data.rec_amount
                            )}
                            {renderDetailItem(
                              "Store Amount",
                              data.store_amount
                            )}
                            {renderDetailItem(
                              "Processing Ratio",
                              data.processing_ratio
                            )}
                            {renderDetailItem(
                              "Processing Charge",
                              data.processing_charge
                            )}
                            {renderDetailItem("Currency", data.currency)}
                            {renderDetailItem(
                              "Merchant Currency",
                              data.currency_merchant
                            )}
                            {renderDetailItem(
                              "Conversion Rate",
                              data.convertion_rate
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem("IP Address", data.ip)}
                            {renderDetailItem(
                              "Verify Status",
                              data.verify_status
                            )}
                            {renderDetailItem("Call Type", data.call_type)}
                            {renderDetailItem("Email Sent", data.email_send)}
                            {renderDetailItem(
                              "Document Received",
                              data.doc_recived
                            )}
                            {renderDetailItem(
                              "Checkout Status",
                              data.checkout_status
                            )}
                            {renderDetailItem("Option A", data.opt_a)}
                            {renderDetailItem("Option B", data.opt_b)}
                            {renderDetailItem("Option C", data.opt_c)}
                            {renderDetailItem("Option D", data.opt_d)}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Merchant Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem("Merchant ID", data.merchant_id)}
                            {renderDetailItem("Store ID", data.store_id)}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderDetailItem("Name", data.ship_name)}
                            {renderDetailItem("Address 1", data.ship_add1)}
                            {renderDetailItem("Address 2", data.ship_add2)}
                            {renderDetailItem("City", data.ship_city)}
                            {renderDetailItem("State", data.ship_state)}
                            {renderDetailItem("Postcode", data.ship_postcode)}
                            {renderDetailItem("Country", data.ship_country)}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
