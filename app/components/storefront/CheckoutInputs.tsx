import { FieldErrors, type useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PaymentFormData } from "../TransactionForm";

interface CheckoutInputsProps {
  register: ReturnType<typeof useForm>["register"];
  errors: FieldErrors<PaymentFormData>; // Correct typing for errors
}

export function CheckoutInputs({ register, errors }: CheckoutInputsProps) {
  return (
    <>
      {" "}
      <div>
        <label htmlFor="cus_name">Name</label>
        <input type="text" {...register("cus_name")} />
        {errors.cus_name && <p>{errors.cus_name.message}</p>}
      </div>
      <div>
        <label htmlFor="cus_email">Email</label>
        <input type="email" {...register("cus_email")} />
        {errors.cus_email && <p>{errors.cus_email.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <Label>Name</Label>
        <Input type="text" {...register("cus_name")} />
        <p className="text-red-500">{errors.cus_name?.message}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Email</Label>
        <Input type="email" {...register("cus_email")} />
        <p className="text-red-500">{errors.cus_email?.message}</p>
      </div>
      <div>
        <label htmlFor="cus_phone">Phone</label>
        <input type="text" {...register("cus_phone")} />
        {errors.cus_phone && <p>{errors.cus_phone.message}</p>}
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" {...register("amount")} />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <input type="text" {...register("desc")} />
        {errors.desc && <p>{errors.desc.message}</p>}
      </div>
      <div>
        <label htmlFor="currency">Currency</label>
        <select {...register("currency")}>
          <option value="BDT">BDT</option>
          <option value="USD">USD</option>
        </select>
        {errors.currency && <p>{errors.currency.message}</p>}
      </div>
    </>
  );
}
